import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, FlatList, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

import { ptBR } from '../../config/localeCalendarConfig';

// Configuração de idioma
LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

const PlanningScreen = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState("");
  const navigation = useNavigation();

  const handleAddEvent = () => {
    if (!newEvent.trim()) {
      Alert.alert('Erro', 'Descrição do evento não pode ser vazia.');
      return;
    }

    const date = selectedDay.dateString;
    setEvents(prevEvents => {
      const updatedEvents = { ...prevEvents };
      if (!updatedEvents[date]) {
        updatedEvents[date] = [];
      }
      updatedEvents[date].push({ id: Date.now().toString(), description: newEvent });
      return updatedEvents;
    });
    setNewEvent("");
    setModalVisible(false);
  };

  const handleDeleteEvent = (date, id) => {
    setEvents(prevEvents => {
      const updatedEvents = { ...prevEvents };
      updatedEvents[date] = updatedEvents[date].filter(event => event.id !== id);
      if (updatedEvents[date].length === 0) {
        delete updatedEvents[date];
      }
      return updatedEvents;
    });
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventText}>{item.description}</Text>
      <TouchableOpacity onPress={() => handleDeleteEvent(selectedDay.dateString, item.id)}>
        <Feather name="trash" size={20} color="#F06543" />
      </TouchableOpacity>
    </View>
  );

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
        onDayPress={(day) => {
          setSelectedDay(day);
          setModalVisible(true);
        }}
        markedDates={{
          ...Object.keys(events).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: "#F06543" };
            return acc;
          }, {}),
          ...(selectedDay ? { [selectedDay.dateString]: { selected: true, marked: true, dotColor: "#F06543" } } : {}),
        }}
      />
      
      <Text style={styles.selectedDate}>
        Data Selecionada: {selectedDay ? selectedDay.dateString : 'Nenhuma data selecionada'}
      </Text>

      {selectedDay && events[selectedDay.dateString] && (
        <FlatList
          data={events[selectedDay.dateString]}
          renderItem={renderEventItem}
          keyExtractor={item => item.id}
          style={styles.eventList}
        />
      )}
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SomeOtherScreen')}>
        <Text style={styles.buttonText}>Ir para outra tela</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Descrição do Evento"
              placeholderTextColor="#717171"
              value={newEvent}
              onChangeText={setNewEvent}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={handleAddEvent}>
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 30,
    justifyContent: 'center',
  },
  calendar: {
    backgroundColor: 'transparent',
  },
  selectedDate: {
    color: "#fff",
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  eventList: {
    marginTop: 20,
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1c1c1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#F06543',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#E8E8E8',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1c1c1e',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#2c2c2e',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#34FF89',
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#F06543',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PlanningScreen;
