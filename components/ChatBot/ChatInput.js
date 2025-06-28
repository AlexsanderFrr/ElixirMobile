import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ChatInput = ({ input, onChangeText, onSend }) => (
  <View style={styles.inputArea}>
    <TextInput
      style={styles.input}
      placeholder="Digite sua mensagem..."
      placeholderTextColor="#999"
      value={input}
      onChangeText={onChangeText}
      multiline
    />
    <TouchableOpacity
      style={styles.sendButton}
      onPress={onSend}
      disabled={input.trim() === ''}
    >
      <Text style={styles.sendIcon}>➤</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
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

export default ChatInput;
