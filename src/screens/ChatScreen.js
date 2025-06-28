import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';

const ChatBotScreen = () => {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleInputChange = (text) => setInput(text);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input, timestamp: new Date().toLocaleTimeString() };
    
    // Add user message immediately for better UX
    setChatLog(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('https://chatbot-elixir.onrender.com/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: input }),
      });

      const data = await response.json();
      
      const botMessage = {
        sender: 'bot',
        text: data.resposta || 'Desculpe, não tenho uma resposta para isso no momento.',
        timestamp: new Date().toLocaleTimeString()
      };

      setChatLog(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: 'bot',
        text: 'Desculpe, houve um erro ao tentar obter a resposta.',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatLog(prev => [...prev, errorMessage]);
    }
  };

  const MessageBubble = ({ message }) => (
    <View style={[
      styles.messageBubble,
      message.sender === 'user' ? styles.userBubble : styles.botBubble
    ]}>
      <View style={styles.messageHeader}>
        <Text style={[
          styles.senderName,
          message.sender === 'user' ? styles.userName : styles.botName
        ]}>
          {message.sender === 'user' ? 'Você' : 'Assistente'}
        </Text>
        <Text style={styles.timestamp}>{message.timestamp}</Text>
      </View>
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ChatBot Assistente</Text>
        </View>

        {/* Chat Area */}
        <ScrollView 
          style={styles.chatContainer}
          ref={ref => this.scrollView = ref}
          onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
          contentContainerStyle={styles.chatContent}
        >
          {chatLog.length === 0 ? (
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Como posso te ajudar hoje?</Text>
            </View>
          ) : (
            chatLog.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#999"
            value={input}
            onChangeText={handleInputChange}
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={handleSendMessage}
            disabled={input.trim() === ''}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chatContent: {
    paddingVertical: 16,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  welcomeText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  botBubble: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#4a8cff',
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  senderName: {
    fontWeight: '600',
    fontSize: 14,
  },
  botName: {
    color: '#555',
  },
  userName: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  botMessageText: {
    color: '#333',
  },
  userMessageText: {
    color: '#fff',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingBottom: 24,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 120,
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4a8cff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ChatBotScreen;