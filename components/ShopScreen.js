import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons'; 

import { ptBR } from '../config/localeCalendarConfig';

// Configuração de idioma
LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

const ShopScreen = () => {
  const [day, setDay] = useState(null);

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        renderArrow={(direction) => (<Feather size={24} color={"#E8E8E8"} name={`chevron-${direction}`} />)}
        headerStyle={{
          borderBottomWidth: 0.5,
          borderBottomColor: "#E8E8E8",
          paddingBottom: 10,
          marginBottom: 10
        }}
        theme={{
          textMonthFontSize: 18,
          monthTextColor: "#E8E8E8",
          todayTextColor: "#F06543",
          selectedDayBackgroundColor: "#F06543",
          selectedDayTextColor: "#E8E8E8",
          arrowColor: "#E8E8E8",
          calendarBackground: "transparent",
          textDayStyle: { color: "#E8E8E8" },
          textDisabledColor: "#717171",
          arrowStyle: {
            margin: 0,
            padding: 0,
          },
        }}
        minDate={new Date().toISOString().split('T')[0]}
        hideExtraDays
        onDayPress={setDay}
        markedDates={day && {
          [day.dateString]: { selected: true },
        }}
      />

      <Text style={styles.selected}>Data Selecionada: {day?.dateString}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 30
  },
  calendar: {
    backgroundColor: 'transparent',
  },
  selected: {
    color: "#fff",
    fontSize: 16,
    marginTop: 42,
  },
});

export default ShopScreen;
