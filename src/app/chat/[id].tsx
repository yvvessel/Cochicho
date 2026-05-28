import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useRef, useState, useEffect } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    StyleSheet,
    View,
} from "react-native";

import BalaMensagem from "@/components/ChatBubble";
import EntradaChat from "@/components/ChatInput";
import GroupHeader from "@/components/GroupHeader";
import { GrupoContext, Mensagem } from "@/context/groupcontext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  containerMensagens: {
    flex: 1,
    justifyContent: "flex-end",
  },
  containerVazio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textoVazio: {
    color: "#cbd5e1",
    fontSize: 16,
  },
});

const TIMESTAMP_MENSAGEM_VAZIA = 0;

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { obterGrupo, adicionarMensagem } = useContext(GrupoContext);
  const refListaMensagens = useRef<FlatList>(null);

  const [mensagem, setMensagem] = useState("");
  const grupo = obterGrupo(id!);

  useEffect(() => {
    // Scroll to end using scrollToIndex for more reliable scrolling
    if (grupo && grupo.mensagens.length > 0) {
      const lastIndex = grupo.mensagens.length - 1;
      const timer = setTimeout(() => {
        refListaMensagens.current?.scrollToIndex({
          index: lastIndex,
          animated: false,
          viewPosition: 1,
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [grupo?.mensagens.length, grupo]);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (grupo && grupo.mensagens.length > 0) {
      const lastIndex = grupo.mensagens.length - 1;
      refListaMensagens.current?.scrollToIndex({
        index: lastIndex,
        animated: true,
        viewPosition: 1,
      });
    }
  }, [grupo?.mensagens, grupo]);

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

  const handleEnviarMensagem = () => {
    if (mensagem.trim().length === 0) return;

    const novaMensagem: Mensagem = {
      id: Date.now(),
      texto: mensagem,
      enviadoPorMim: true,
      timestamp: Date.now(),
    };

    adicionarMensagem(grupo.id, novaMensagem);
    setMensagem("");
  };

  const renderizarMensagem = ({ item }: { item: Mensagem }) => (
    <BalaMensagem
      texto={item.texto}
      enviadoPorMim={item.enviadoPorMim}
      horario={item.timestamp}
    />
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
    >
      <GroupHeader
        nomeGrupo={grupo.nomeGrupo}
        fotoGrupo={grupo.fotoGrupo}
        membrosGrupo={grupo.membrosGrupo}
        onPress={() => router.push(`/chat/${id}/info`)}
      />

      <View style={styles.containerMensagens}>
        {grupo.mensagens.length === 0 ? (
          <View style={styles.containerVazio}>
            <BalaMensagem
              texto="Nenhuma mensagem ainda. Comece a conversar! 👋"
              enviadoPorMim={false}
              horario={TIMESTAMP_MENSAGEM_VAZIA}
            />
          </View>
        ) : (
          <FlatList
            ref={refListaMensagens}
            data={grupo.mensagens}
            renderItem={renderizarMensagem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={true}
            contentContainerStyle={{ paddingBottom: 8 }}
            keyboardDismissMode="on-drag"
            onEndReachedThreshold={0.1}
            onScrollToIndexFailed={(error) => {
              // Fallback to scrollToEnd if scrollToIndex fails
              refListaMensagens.current?.scrollToEnd({ animated: false });
            }}
          />
        )}
      </View>

      <EntradaChat
        mensagem={mensagem}
        onChangeText={setMensagem}
        onSend={handleEnviarMensagem}
      />
    </KeyboardAvoidingView>
  );
}
