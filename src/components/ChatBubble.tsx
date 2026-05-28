import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  containerMensagem: {
    marginVertical: 6,
    marginHorizontal: 8,
  },
  bolaMensagem: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: "80%",
  },
  minhasMensagens: {
    alignSelf: "flex-end",
    backgroundColor: "#6366f1",
  },
  mensagensOutros: {
    alignSelf: "flex-start",
    backgroundColor: "#334155",
  },
  estiloMensagem: {
    color: "#f1f5f9",
    fontSize: 15,
    fontWeight: "500",
  },
  horario: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "400",
  },
  containerHorario: {
    alignItems: "flex-end",
  },
});

type PropsBalaMensagem = {
  texto: string;
  enviadoPorMim: boolean;
  horario: number;
};

const formatarHora = (horario: number): string => {
  const data = new Date(horario);
  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");
  return `${horas}:${minutos}`;
};

const BalaMensagem = ({ texto, enviadoPorMim, horario }: PropsBalaMensagem) => {
  return (
    <View
      style={[
        styles.containerMensagem,
        enviadoPorMim
          ? { alignItems: "flex-end" }
          : { alignItems: "flex-start" },
      ]}
    >
      <View
        style={[
          styles.bolaMensagem,
          enviadoPorMim ? styles.minhasMensagens : styles.mensagensOutros,
        ]}
      >
        <Text style={styles.estiloMensagem}>{texto}</Text>
      </View>
      <Text style={styles.horario}>{formatarHora(horario)}</Text>
    </View>
  );
};

export default BalaMensagem;
