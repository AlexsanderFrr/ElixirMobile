import React from 'react'
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native'

const ShopScreen = () => {

  return (
    <KeyboardAvoidingView style={[styles.container, styles.brownbg]}>
      <View style={styles.text_header}>
        <Text>Sacola de Suco</Text>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 30,
      paddingTop: 60,
    },
    brownbg: {
      backgroundColor: "#F4DEAA",
    },
    text_header: {

    }
})


export default ShopScreen;