import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#1e293b",
    borderTopWidth: 1,
    borderTopColor: "#334155",
    gap: 10,
  },
  campoMensagem: {
    color: "#f1f5f9",
    backgroundColor: "#1e293b",
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#334155",
    fontSize: 15,
  },
  botaoMensagem: {
    alignItems: "center",
    backgroundColor: "#6366f1",
    borderRadius: 24,
    justifyContent: "center",
    width: 44,
    height: 44,
    flexShrink: 0,
  },
});

type ChatInputProps = {
  mensagem: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
};

const ChatInput = ({ mensagem, onChangeText, onSend }: ChatInputProps) => {
  const temMensagem = mensagem.trim().length > 0;

  return (
    <View style={styles.footer}>
      <TextInput
        style={styles.campoMensagem}
        onChangeText={onChangeText}
        value={mensagem}
        placeholder="Mensagem..."
        placeholderTextColor="#64748b"
      />

      {temMensagem && (
        <TouchableOpacity
          style={styles.botaoMensagem}
          onPress={onSend}
          activeOpacity={0.8}
        >
          <Image
            style={{ width: 24, height: 24 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/9841/9841454.png",
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChatInput;
