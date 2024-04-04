import React from 'react'
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ShopScreen = () => {

  return (
    <KeyboardAvoidingView style={[styles.container, styles.brownbg]}>
      <View style={styles.text_header}>
        <Text style={styles.textJuice}>Sacola de Suco</Text>
        <Text style={styles.textPiece}>Um total de 3 produtos</Text>
      </View>
      <View style={styles.list_item}>
        <View>
          
        </View>
      </View>
      <View style={styles.findBuy}>
        <Text style={styles.textTotal}>Total:</Text>
        <TouchableOpacity style={styles.shop_button}>
          <Text style={styles.textButton}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 120,
  },
  brownbg: {
    backgroundColor: "#F4DEAA",
  },
  text_header: {
    flex: 1,
    justifyContent: "flex-start"
  },
  findBuy: {
    flex: 1,
    justifyContent: "flex-end"
  },
  textJuice: {
    fontSize: 30,
    fontWeight: '700',
  },
  textPiece: {
    fontSize: 18,
    color: "#838181"
  },
  shop_button: {
    width: "100%",
    backgroundColor: "#69AC48",
    padding: 10,
    height: 60,
    borderRadius: 20,
  },
  textTotal:{
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 15,
  },
  textButton: {
    color: "#F5F5F5",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  }
})


export default ShopScreen;