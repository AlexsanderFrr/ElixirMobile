import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'

const PerfilScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Ionicons name='arrow-back' size={24} color={"#000000"}></Ionicons>
          <Ionicons name='settings' size={24} color={"#000000"}></Ionicons>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})

export default PerfilScreen;