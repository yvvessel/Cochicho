import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 80,
    backgroundColor: "#1e293b",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  imagem: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#6366f1",
    backgroundColor: "#334155",
  },
  headerContainer: {
    flex: 1,
    marginLeft: 12,
  },
  titulo: {
    color: "#f1f5f9",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  membros: {
    color: "#cbd5e1",
    fontSize: 13,
    marginTop: 3,
    fontWeight: "400",
  },
});

type GroupHeaderProps = {
  nomeGrupo: string;
  fotoGrupo: string;
  membrosGrupo: string[];
  onPress: () => void;
};

const GroupHeader = ({
  nomeGrupo,
  fotoGrupo,
  membrosGrupo,
  onPress,
}: GroupHeaderProps) => {
  return (
    <TouchableOpacity
      style={styles.header}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        style={styles.imagem}
        source={{
          uri: fotoGrupo,
        }}
      />

      <View style={styles.headerContainer}>
        <Text style={styles.titulo}>{nomeGrupo}</Text>
        <Text style={styles.membros}>{membrosGrupo.join(", ")}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GroupHeader;
