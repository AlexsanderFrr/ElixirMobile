import React, { useRef, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import MessageBubble from './MessageBubble';

const ChatList = ({ chatLog }) => {
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chatLog]);

  return (
    <ScrollView
      style={styles.chatContainer}
      contentContainerStyle={styles.chatContent}
      ref={scrollViewRef}
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
  );
};

const styles = StyleSheet.create({
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
});

export default ChatList;
