import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 6,
    marginHorizontal: 8,
  },
  balaoMensagem: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: "80%",
  },
  euMensagem: {
    alignSelf: "flex-end",
    backgroundColor: "#6366f1",
  },
  outroMensagem: {
    alignSelf: "flex-start",
    backgroundColor: "#334155",
  },
  estiloMensagem: {
    color: "#f1f5f9",
    fontSize: 15,
    fontWeight: "500",
  },
  timestamp: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "400",
  },
  timestampContainer: {
    alignItems: "flex-end",
  },
});

type ChatBubbleProps = {
  texto: string;
  enviadoPorMim: boolean;
  timestamp: number;
};

const formatarHora = (timestamp: number): string => {
  const data = new Date(timestamp);
  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");
  return `${horas}:${minutos}`;
};

const ChatBubble = ({ texto, enviadoPorMim, timestamp }: ChatBubbleProps) => {
  return (
    <View
      style={[
        styles.messageContainer,
        enviadoPorMim ? { alignItems: "flex-end" } : { alignItems: "flex-start" },
      ]}
    >
      <View
        style={[
          styles.balaoMensagem,
          enviadoPorMim ? styles.euMensagem : styles.outroMensagem,
        ]}
      >
        <Text style={styles.estiloMensagem}>{texto}</Text>
      </View>
      <Text style={styles.timestamp}>{formatarHora(timestamp)}</Text>
    </View>
  );
};

export default ChatBubble;
