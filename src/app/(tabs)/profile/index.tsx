import { GrupoContext } from "@/context/groupcontext";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#1e293b",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  headerTitle: {
    color: "#f1f5f9",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  sectionTitle: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  itemText: {
    color: "#f1f5f9",
    fontSize: 16,
    fontWeight: "500",
  },
  itemCount: {
    color: "#64748b",
    fontSize: 14,
    marginTop: 4,
  },
  emptyText: {
    color: "#cbd5e1",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
});

export default function ProfileScreen() {
  const router = useRouter();
  const { grupos } = useContext(GrupoContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Visão Geral</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>Total de Grupos</Text>
          <Text style={styles.itemCount}>{grupos.length} grupos</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Total de Mensagens</Text>
          <Text style={styles.itemCount}>
            {grupos.reduce((acc, g) => acc + g.mensagens.length, 0)} mensagens
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo de Grupos</Text>
        {grupos.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum grupo criado ainda</Text>
        ) : (
          grupos.map((grupo) => (
            <TouchableOpacity
              key={grupo.id}
              style={styles.item}
              onPress={() => router.push(`/chat/${grupo.id}/info`)}
              activeOpacity={0.7}
            >
              <Text style={styles.itemText}>{grupo.nomeGrupo}</Text>
              <Text style={styles.itemCount}>
                {grupo.membrosGrupo.length} membros • {grupo.mensagens.length}{" "}
                mensagens
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
}
