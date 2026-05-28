import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
} from "react-native";

import ChatBubble from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import GroupHeader from "@/components/GroupHeader";
import { GrupoContext, Mensagem } from "@/context/groupcontext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  messagesContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#cbd5e1",
    fontSize: 16,
  },
});

const EMPTY_MESSAGE_TIMESTAMP = 0;

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { obterGrupo, adicionarMensagem } = useContext(GrupoContext);

  const [mensagem, setMensagem] = useState("");
  const grupo = obterGrupo(id!);

  if (!grupo) {
    return (
      <View style={styles.container}>
        <GroupHeader
          nomeGrupo="Grupo não encontrado"
          fotoGrupo="https://digest.med.br/wp-content/uploads/2024/07/no-image.jpg"
          membrosGrupo={[]}
          onPress={() => router.back()}
        />
      </View>
    );
  }

  const handleSendMessage = () => {
    if (mensagem.trim().length === 0) return;

    const newMessage: Mensagem = {
      id: Date.now(),
      texto: mensagem,
      enviadoPorMim: true,
      timestamp: Date.now(),
    };

    adicionarMensagem(grupo.id, newMessage);
    setMensagem("");
  };

  const renderMessage = ({ item }: { item: Mensagem }) => (
    <ChatBubble
      texto={item.texto}
      enviadoPorMim={item.enviadoPorMim}
      timestamp={item.timestamp}
    />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <GroupHeader
        nomeGrupo={grupo.nomeGrupo}
        fotoGrupo={grupo.fotoGrupo}
        membrosGrupo={grupo.membrosGrupo}
        onPress={() => router.push(`/chat/${id}/info`)}
      />

      <View style={styles.messagesContainer}>
        {grupo.mensagens.length === 0 ? (
          <View style={styles.emptyContainer}>
            <ChatBubble
              texto="Nenhuma mensagem ainda. Comece a conversar! 👋"
              enviadoPorMim={false}
              timestamp={EMPTY_MESSAGE_TIMESTAMP}
            />
          </View>
        ) : (
          <FlatList
            data={grupo.mensagens}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={true}
            contentContainerStyle={{ paddingBottom: 8 }}
          />
        )}
      </View>

      <ChatInput
        mensagem={mensagem}
        onChangeText={setMensagem}
        onSend={handleSendMessage}
      />
    </KeyboardAvoidingView>
  );
}
