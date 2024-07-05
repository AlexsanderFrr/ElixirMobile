import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const PerfilScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Ionicons name='arrow-back' size={40} color={"#000000"}></Ionicons>
          <Ionicons name='settings-sharp' size={40} color={"#000000"}></Ionicons>
        </View>

        <View style={{ alignSelf: "center" }}>
          <Text style={styles.textMain}>Meu Perfil</Text>
          <View style={styles.profileImage}>
            <Image source={{uri:'https://img.freepik.com/fotos-premium/imagenslegais-e-calmas-para-a-foto-do-perfil-do-whatsapp-arte-gerada-porai_873370-5052.jpg'}} style={styles.image} resizeMode='center'/>
          </View>
          <View style={styles.dm}>
            <MaterialIcons name='chat' size={18} color={"#F4DEAA"}></MaterialIcons>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textMain: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D"
  },  
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginHorizontal: 30
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden"
  },
  dm: {
    backgroundColor: "#BB5104",
    position: "absolute",
    top: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default PerfilScreen;