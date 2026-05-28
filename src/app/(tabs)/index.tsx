import React, { useContext } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import { GrupoContext } from "@/context/groupcontext";

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
  groupItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  groupImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#6366f1",
    backgroundColor: "#334155",
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    color: "#f1f5f9",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  groupMembers: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "400",
  },
  emptyText: {
    color: "#cbd5e1",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
});

const App = () => {
  const router = useRouter();
  const { grupos } = useContext(GrupoContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>

      <FlatList
        data={grupos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.groupItem}
            onPress={() => router.push(`/chat/${item.id}`)}
            activeOpacity={0.7}
          >
            <Image
              style={styles.groupImage}
              source={{ uri: item.fotoGrupo }}
            />
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{item.nomeGrupo}</Text>
              <Text style={styles.groupMembers}>
                {item.membrosGrupo.length > 0
                  ? item.membrosGrupo.join(", ")
                  : "Sem membros"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum grupo criado ainda</Text>
        }
      />
    </View>
  );
};

export default App;
