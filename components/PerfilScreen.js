import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function PefilScreen() {
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <Ionicons name='arrow-back' size={size} color={"#000000"}></Ionicons>
            <Ionicons name='settings' size={size} color={"#000000"}></Ionicons>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});