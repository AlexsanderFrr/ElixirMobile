import React, { useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, Image, TouchableOpacity, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

const ShopScreen = () => {

  useEffect(() => {
    (
      async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
          const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
          console.log('Here are all your calendars:');
          console.log({ calendars });
        }
      })();
  }, []);

  return (


    <KeyboardAvoidingView style={[styles.container, styles.brownbg]}>
      <View style={styles.text_header}>
        <Text style={styles.textJuice}>Planejamento</Text>
        <Text style={styles.textPiece}>Por um dia saúdavel</Text>
      </View>

      <View>
        <Text>Calendário</Text>
        <Button title='Criar um novo Calendario' onPress={createCalendar} />
      </View>
    </KeyboardAvoidingView>
  )

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  async function createCalendar() {
    const defaultCalendarSource = Platform.OS === 'android' ? await getDefaultCalendarSource() : { isLocalAccount: true, name: 'Expo Calendar' };
    const newCalendarID = await Calendar.createCalendarAsync
  }

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