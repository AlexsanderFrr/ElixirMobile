import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
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
    backgroundColor: '#BB5104',
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
});

export default MessageBubble;
