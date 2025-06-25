import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';

const ChatBotScreen = () => {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleInputChange = (text) => {
    setInput(text);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };

    // Enviar a pergunta para o backend e obter a resposta
    let botMessage;
    try {
      const response = await fetch('https://chatbot-elixir.onrender.com/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pergunta: input }),
      });

      const data = await response.json();

      botMessage = {
        sender: 'bot',
        text: data.resposta || 'Desculpe, não tenho uma resposta para isso no momento.',
      };
    } catch (error) {
      botMessage = {
        sender: 'bot',
        text: 'Desculpe, houve um erro ao tentar obter a resposta.',
      };
    }

    // Atualizar o log do chat
    setChatLog([...chatLog, userMessage, botMessage]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {chatLog.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.sender === 'user' ? styles.userMessage : styles.botMessage
            ]}
          >
            <Text style={styles.messageText}>
              <Text style={styles.messageSender}>
                {message.sender === 'user' ? 'Você' : 'Bot'}:
              </Text>
              {` ${message.text}`}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua pergunta..."
          value={input}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    backgroundColor: '#F4DEAA',
  },
  chatContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    maxHeight: '80%',
    marginBottom: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#BB5104',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  messageSender: {
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    height: 40,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
  },
});

export default ChatBotScreen;
