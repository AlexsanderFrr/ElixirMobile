import React from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ShopScreen = () => {

  return (
    <KeyboardAvoidingView style={[styles.container, styles.brownbg]}>
      <View style={styles.text_header}>
        <Text style={styles.textJuice}>Sacola de Suco</Text>
        <Text style={styles.textPiece}>Um total de 3 produtos</Text>
      </View>
      <View style={styles.list_item}>
        <View style={styles.itemCard}>
          <Image
            source={require("../assets/garrafa-suco2.png")}
            style={styles.img_card}
            resizeMode="contain"
          />
          <View style={styles.infoAlign}>
            <Text style={styles.nameItem}>Suco de Laranja</Text>
            <Text style={styles.functionItem}>Aumenta a imunidade</Text>
            <Text style={styles.priceItem}>R$5,00</Text>
          </View>
        </View>

        <View style={styles.itemCard}>
          <Image
            source={require("../assets/garrafa-suco4.png")}
            style={styles.img_card}
            resizeMode="contain"
          />
          <View style={styles.infoAlign}>
            <Text style={styles.nameItem}>Suco de Abacaxi</Text>
            <Text style={styles.functionItem}>Aumenta a imunidade</Text>
            <Text style={styles.priceItem}>R$6,00</Text>
          </View>
        </View>
        <View style={styles.itemCard}>
          <Image
            source={require("../assets/garrafa-suco5.png")}
            style={styles.img_card}
            resizeMode="contain"
          />
          <View style={styles.infoAlign}>
            <Text style={styles.nameItem}>Suco de Morango</Text>
            <Text style={styles.functionItem}>Aumenta a imunidade</Text>
            <Text style={styles.priceItem}>R$8,00</Text>
          </View>
        </View>
      </View>
      <View style={styles.findBuy}>
        <View style={styles.textLine_total}>
          <Text style={styles.textTotal}>Total:</Text>
          <Text style={styles.textVTotal}>R$19,00</Text>
        </View>
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
    paddingBottom: 90,
  },
  brownbg: {
    backgroundColor: "#F4DEAA",
  },
  text_header: {
    //flex: 1,
    justifyContent: "flex-start",
    marginBottom: 20
  },
  findBuy: {
    //flex: 1,
    justifyContent: "flex-end",
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
  textTotal: {
    fontSize: 24,
    fontWeight: "500",
   
  },
  textVTotal: {
    fontSize: 24,
    fontWeight: "500",
    color: "#BB5104",
    //marginLeft: 180
  },
  textLine_total: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  textButton: {
    color: "#F5F5F5",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
  list_item: {
    flex: 1,
    justifyContent: "center"
    //marginBottom: 180,
  },
  itemCard: {
    flexDirection: 'row',
    marginBottom: 30
  },
  img_card: {
    width: 120,
    height: 140
  },
  nameItem: {
    fontSize: 20,
    fontWeight: "500"
  },
  functionItem: {
    fontSize: 16,
    color: "#838181",
    marginTop: 5,
  },
  priceItem: {
    fontSize: 20,
    fontWeight: "500",
    color: "#BB5104",
    marginTop: 40
  }
})


export default ShopScreen;