import React, { useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/ChatBot/Header';
import ChatList from '../../components/ChatBot/ChatList';
import ChatInput from '../../components/ChatBot/ChatInput';

const ChatBotScreen = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleInputChange = text => setInput(text);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = {
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };

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
        timestamp: new Date().toLocaleTimeString(),
      };

      setChatLog(prev => [...prev, botMessage]);
    } catch {
      const errorMessage = {
        sender: 'bot',
        text: 'Desculpe, houve um erro ao tentar obter a resposta.',
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatLog(prev => [...prev, errorMessage]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <Header onBackPress={() => navigation.goBack()} />
        <ChatList chatLog={chatLog} />
        <ChatInput input={input} onChangeText={handleInputChange} onSend={handleSendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4DEAA',
  },
  container: {
    flex: 1,
  },
});

export default ChatBotScreen;
