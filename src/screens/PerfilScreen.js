import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import { apiEndpoint } from "../../config/constantes";
import * as ImagePicker from "expo-image-picker";

import HeaderBar from "../../components/Perfil/HeaderBar";
import ProfileImageSection from "../../components/Perfil/ProfileImageSection";
import UserInfo from "../../components/Perfil/UserInfo";
import OptionList from "../../components/Perfil/OptionList";
import ImagePickerModal from "../../components/Perfil/ImagePickerModal";
import styles from "../../components/Perfil/perfilStyles";

const PerfilScreen = () => {
  const { sair, setUserInfo, userToken, userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(userInfo?.imagem || null);

  useEffect(() => {
    if (userInfo?.imagem) {
      setFotoPerfil(userInfo.imagem);
    }
  }, [userInfo]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setModalVisible(true);
    }
  };

  const updateProfileImage = async () => {
    if (!userToken) return alert("Token ausente.");

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
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setModalVisible(false);
        setImage(null); // limpa o estado para voltar a usar userInfo.imagem
        alert("Foto atualizada!");

        // Recarrega o userInfo com a nova imagem
        const updatedUserInfo = await fetch(`${apiEndpoint}/usuario/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const newUserInfo = await updatedUserInfo.json();
        const novaImagem = `${apiEndpoint}/${newUserInfo.imagem}`;
        setUserInfo({ ...newUserInfo, imagem: novaImagem });
        setFotoPerfil(novaImagem); // <-- força o update da imagem na UI// <-- Atualiza o contexto
      } else {
        console.error("Erro:", data);
        alert(data.message || "Erro ao atualizar.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar imagem.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/fundoPerfil.png")}
        style={styles.imageBG}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderBar onBack={() => navigation.goBack()} />
          <ProfileImageSection image={fotoPerfil} userInfo={userInfo} onPickImage={pickImage} />
          <View style={styles.infoContainer}>
            <UserInfo userInfo={userInfo} />
            <View style={[styles.separator, { marginTop: 10, marginBottom: 10, width: "100%" }]} />
            <OptionList
              onNavigateDiagnosticos={() => { }}
              onNavigateFavoritos={() => navigation.navigate("Favoritos")}
              onLogout={sair}
            />
          </View>
        </ScrollView>
      </ImageBackground>

      <ImagePickerModal
        visible={modalVisible}
        image={image}
        onCancel={() => {
          setModalVisible(false);
          setImage(null);
        }}
        onSave={updateProfileImage}
        isUploading={isUploading}
      />
    </SafeAreaView>
  );
};

export default PerfilScreen;