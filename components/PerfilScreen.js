import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../src/context/authContext';
import React, { useState } from 'react';

import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const PerfilScreen = () => {
  const {sair} = useContext(AuthContext);
  const navigation = useNavigation();

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if(!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("../assets/fundoPerfil.png")} resizeMode="cover" style={styles.imageBG}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='arrow-back' size={40} color={"#fff"}></Ionicons>
            </TouchableOpacity>
            <Ionicons name='settings-sharp' size={40} color={"#fff"}></Ionicons>
          </View>

          <View style={{ alignSelf: "center" }}>
            <Text style={styles.textMain}>Meu Perfil</Text>
            <View style={styles.profileImage}>
              {image && <Image source={{ uri: image }} style={styles.image} resizeMode='center' /> }
            </View>
            <View style={styles.dm}>
              <MaterialIcons name='chat' size={18} color={"#F4DEAA"}></MaterialIcons>
            </View>
            <View style={styles.active}></View>
            <TouchableOpacity onPress={pickImage}>
              <View style={styles.add}>
                <Ionicons name='add' size={38} color={"#F4DEAA"}></Ionicons>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "600", fontSize: 26, marginTop: 30, fontFamily: "HelveticaNeue", }]}>Alexsandra Ferreira</Text>
            <View style={[styles.separator, { marginTop: 10, width: "90%" }]} />

            <View style={styles.groupOption}>
              <TouchableOpacity>
                <View style={[styles.option, { marginTop: 40 }]}>
                  <Image source={require("../assets/iconDiag.png")}></Image>
                  <Text style={[styles.text, { fontSize: 16, fontWeight: "600", marginLeft: 10 }]}>Meus Diagnósticos</Text>
                </View>
              </TouchableOpacity>
              <View style={[styles.separator, { opacity: 0.1 }]} />
              <TouchableOpacity>
                <View style={[styles.option, { marginTop: 10 }]}>
                  <Image source={require("../assets/iconCora.png")}></Image>
                  <Text style={[styles.text, { fontSize: 16, fontWeight: "600", marginLeft: 10 }]}>Favoritos</Text>
                </View>
              </TouchableOpacity>
              <View style={[styles.separator, { opacity: 0.1 }]} />
              <TouchableOpacity onPress={() => {sair()}}>
                <View style={[styles.option, { marginTop: 10 }]}>
                  <Image source={require("../assets/iconLogOut.png")}></Image>
                  <Text style={[styles.text, { fontSize: 16, fontWeight: "600", marginLeft: 10 }]}>Sair</Text>
                </View>
              </TouchableOpacity>
              <View style={[styles.separator, { opacity: 0.1 }]} />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBG: {
    flex: 1,
    justifyContent: 'center'
  },
  textMain: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15
  },
  text: {
    color: "#000000"
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
    borderColor: "#000000",
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
    width: "100%",
    backgroundColor: "#000000"
  },
  infoContainer: {
    backgroundColor: "#fff",
    width: "90%",
    height: 550,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 15,
    borderRadius: 15
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  groupOption: {
    alignItems: "flex-start",
    width: "90%"
  }
});

export default PerfilScreen;