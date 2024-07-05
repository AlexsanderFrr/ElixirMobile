import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

const PerfilScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Ionicons name='arrow-back' size={40} color={"#000000"} onPress={() => navigation.goBack()}></Ionicons>
          <Ionicons name='settings-sharp' size={40} color={"#000000"}></Ionicons>
        </View>

        <View style={{ alignSelf: "center" }}>
          <Text style={styles.textMain}>Meu Perfil</Text>
          <View style={styles.profileImage}>
            <Image source={{ uri: 'https://img.freepik.com/fotos-premium/imagenslegais-e-calmas-para-a-foto-do-perfil-do-whatsapp-arte-gerada-porai_873370-5052.jpg' }} style={styles.image} resizeMode='center' />
          </View>
          <View style={styles.dm}>
            <MaterialIcons name='chat' size={18} color={"#F4DEAA"}></MaterialIcons>
          </View>
          <View style={styles.active}></View>
          <View style={styles.add}>
            <Ionicons name='add' size={38} color={"#F4DEAA"}></Ionicons>
          </View>
        </View>

        <View style={styles.infoContainer}> 
          <Text style={[styles.text, { fontWeight: "200", fontSize: 26, marginTop: 40}]}>Alexsandra Ferreira</Text>
          <View style={[styles.separator, { marginTop: 10 }]} />
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
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15
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
    borderWidth: 2,
    borderColor: "#BB5104",
    overflow: "hidden"
  },
  dm: {
    backgroundColor: "#BB5104",
    position: "absolute",
    top: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  active: {
    backgroundColor: "#34FF89",
    position: "absolute",
    bottom: 18,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  add: {
    backgroundColor: "#BB5104",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  separator: {
    height: 2,
    width: "90%",
    backgroundColor: "#000000"
  },
  infoContainer: {
    backgroundColor: "#F5F5F5",
    width: "90%",
    height: "100%",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
    
  }
});

export default PerfilScreen;