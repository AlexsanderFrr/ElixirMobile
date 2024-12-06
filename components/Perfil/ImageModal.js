import React from "react";
import { View, Modal, Image, Button, StyleSheet } from "react-native";

const ImageModal = ({ visible, image, onCancel, onSave, isUploading }) => (
  <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onCancel}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Image source={{ uri: image }} style={styles.modalImage} />
        <View style={styles.modalButtons}>
          <Button title="Cancelar" onPress={onCancel} color="#f44336" />
          <Button title="Salvar" onPress={onSave} disabled={isUploading} />
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
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

export default ImageModal;