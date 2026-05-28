import { GrupoContext } from "@/context/groupcontext";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 32,
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 12,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#6366f1",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  backButtonText: {
    color: "#f1f5f9",
    fontSize: 14,
    fontWeight: "600",
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 24,
    marginTop: 8,
    borderWidth: 3,
    borderColor: "#6366f1",
    backgroundColor: "#334155",
  },
  groupTitle: {
    color: "#f1f5f9",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 14,
    marginBottom: 24,
    fontWeight: "500",
  },
  section: {
    width: "100%",
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#f1f5f9",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
    borderBottomWidth: 2,
    borderBottomColor: "#6366f1",
    paddingBottom: 10,
    letterSpacing: 0.3,
  },
  memberName: {
    color: "#e2e8f0",
    fontSize: 16,
    marginVertical: 8,
    fontWeight: "500",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    gap: 8,
  },
  editButton: {
    padding: 8,
    backgroundColor: "#6366f1",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  editButtonText: {
    color: "#f1f5f9",
    fontSize: 16,
  },
  editInput: {
    color: "#f1f5f9",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 0.2,
    borderBottomWidth: 2,
    borderBottomColor: "#6366f1",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});

export default function GroupInfoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { obterGrupo, atualizarGrupo } = useContext(GrupoContext);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nomeEditando, setNomeEditando] = useState("");

  const grupo = obterGrupo(id!);

  if (!grupo) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.groupTitle}>Grupo não encontrado</Text>
      </View>
    );
  }

  const handleImagePick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permissão negada para acessar a galeria!");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled && resultado.assets[0]?.uri) {
      atualizarGrupo(id!, { fotoGrupo: resultado.assets[0].uri });
    }
  };

  const handleEditarNomeAbrir = () => {
    setNomeEditando(grupo.nomeGrupo);
    setIsEditingName(true);
  };

  const handleSalvarNome = () => {
    if (nomeEditando.trim()) {
      atualizarGrupo(id!, { nomeGrupo: nomeEditando });
    }
    setIsEditingName(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleImagePick} activeOpacity={0.7}>
            <Image
              style={styles.avatar}
              source={{
                uri: grupo.fotoGrupo,
              }}
            />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            {isEditingName ? (
              <>
                <TextInput
                  onChangeText={setNomeEditando}
                  value={nomeEditando}
                  style={styles.editInput}
                  placeholder="Nome do grupo"
                  placeholderTextColor="#64748b"
                  autoFocus
                />
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleSalvarNome}
                  activeOpacity={0.7}
                >
                  <Text style={styles.editButtonText}>✓</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.groupTitle}>{grupo.nomeGrupo}</Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleEditarNomeAbrir}
                  activeOpacity={0.7}
                >
                  <Text style={styles.editButtonText}>✎</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <Text style={styles.subtitle}>
            {grupo.membrosGrupo.length} membros
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Membros do Grupo</Text>
          {grupo.membrosGrupo.length === 0 ? (
            <Text style={styles.memberName}>Nenhum membro adicionado</Text>
          ) : (
            grupo.membrosGrupo.map((membro, index) => (
              <Text key={index} style={styles.memberName}>
                • {membro}
              </Text>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
