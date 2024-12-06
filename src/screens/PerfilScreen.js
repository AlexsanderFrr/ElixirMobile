import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Button,
} from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import { apiEndpoint } from "../../config/constantes";
import * as ImagePicker from "expo-image-picker";

const PerfilScreen = () => {
  const { sair, userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Função para selecionar a imagem da galeria
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setModalVisible(true); // Abre o modal para confirmação da imagem
    }
  };

  // Função para enviar a imagem para o backend
  const updateProfileImage = async () => {
    if (!userInfo?.token) {
      alert("Token de autenticação ausente. Faça login novamente.");
      return;
    }
  
    setIsUploading(true);
  
    const fileType = image.split(".").pop();
    const formData = new FormData();
    formData.append("imagem", {
      uri: image,
      type: `image/${fileType}`,
      name: `profile_${userInfo.id}.${fileType}`,
    });
  
    try {
      const response = await fetch(`${apiEndpoint}/usuario/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: formData,
      });
  
      const data = await response.json();
      console.log("userInfo:", userInfo);
  
      if (response.ok) {
        alert("Foto de perfil atualizada com sucesso!");
        setModalVisible(false); // Fecha o modal após salvar
      } else {
        // Logando a resposta de erro no console para depuração
        console.error("Erro na resposta do servidor:", data);
        alert(data.message || "Erro ao atualizar foto de perfil");
      }
    } catch (error) {
      // Logando detalhes completos do erro para depuração
      console.error("Erro ao atualizar foto de perfil:", error);
      alert("Erro ao atualizar foto de perfil. Detalhes no console.");
    } finally {
      setIsUploading(false);
    }
  };
  
  

  const cancelImage = () => {
    setModalVisible(false); // Fecha o modal sem salvar a imagem
    setImage(null); // Reseta a imagem selecionada
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/fundoPerfil.png")}
        resizeMode="cover"
        style={styles.imageBG}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={40} color={"#fff"} />
            </TouchableOpacity>
            <Ionicons name="settings-sharp" size={40} color={"#fff"} />
          </View>

          <View style={{ alignSelf: "center" }}>
            <Text style={styles.textMain}>Meu Perfil</Text>
            <View style={styles.profileImage}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={styles.image}
                  resizeMode="center"
                />
              ) : userInfo?.imagem ? (
                <Image
                  source={{ uri: userInfo.imagem }}
                  style={styles.image}
                  resizeMode="contain"
                />
              ) : null}
            </View>
            <View style={styles.dm}>
              <MaterialIcons name="chat" size={18} color={"#F4DEAA"} />
            </View>
            <View style={styles.active}></View>
            <TouchableOpacity onPress={pickImage}>
              <View style={styles.add}>
                <Ionicons name="add" size={38} color={"#F4DEAA"} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: '600',
                  fontSize: 26,
                  marginTop: 30,
                  fontFamily: "HelveticaNeue",
                },
              ]}
            >
              {userInfo ? userInfo.nome || userInfo.name : "Nome do Usuário"}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "HelveticaNeue",
                color: "#8a8a8a",
              }}
            >
              {userInfo
                ? userInfo.email || userInfo.email
                : "email@dominio.com"}
            </Text>
            <View style={[styles.separator, { marginTop: 10, width: "90%" }]} />

            <View style={[styles.groupOption]}>
              <TouchableOpacity>
                <View style={[styles.option, { marginTop: 40 }]}>
                  <Image source={require("../../assets/iconDiag.png")} />
                  <Text
                    style={[
                      styles.text,
                      { fontSize: 16, fontWeight: "600", marginLeft: 10 },
                    ]}
                  >
                    Meus Diagnósticos
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={[styles.separator, { opacity: 0.1 }]} />
              <TouchableOpacity>
                <View style={[styles.option, { marginTop: 10 }]}>
                  <Image source={require("../../assets/iconCora.png")} />
                  <Text
                    style={[
                      styles.text,
                      { fontSize: 16, fontWeight: "600", marginLeft: 10 },
                    ]}
                  >
                    Favoritos
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={[styles.separator, { opacity: 0.1 }]} />
              <TouchableOpacity
                onPress={() => {
                  sair();
                }}
              >
                <View style={[styles.option, { marginTop: 10 }]}>
                  <Image source={require("../../assets/iconLogOut.png")} />
                  <Text
                    style={[
                      styles.text,
                      { fontSize: 16, fontWeight: "600", marginLeft: 10 },
                    ]}
                  >
                    Sair
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={[styles.separator, { opacity: 0.1 }]} />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Modal para visualização da foto e confirmação */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={cancelImage}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: image }} style={styles.modalImage} />
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={cancelImage} color="#f44336" />
              <Button
                title="Salvar"
                onPress={updateProfileImage}
                disabled={isUploading || !image}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBG: {
    flex: 1,
    justifyContent: "center",
  },
  textMain: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },
  text: {
    color: "#000000",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginHorizontal: 30,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#000000",
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#BB5104",
    position: "absolute",
    top: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FF89",
    position: "absolute",
    bottom: 18,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
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
    justifyContent: "center",
  },
  separator: {
    height: 2,
    width: "100%",
    backgroundColor: "#000000",
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  groupOption: {
    paddingVertical: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default PerfilScreen;
