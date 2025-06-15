import React from "react";
import { Modal, View, Image, Button } from "react-native";
import styles from "./perfilStyles";

const ImagePickerModal = ({ visible, image, onCancel, onSave, isUploading }) => (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onCancel}>
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Image source={{ uri: image }} style={styles.modalImage} />
                <View style={styles.modalButtons}>
                    <Button title="Cancelar" onPress={onCancel} color="#f44336" />
                    <Button title="Salvar" onPress={onSave} disabled={isUploading || !image} />
                </View>
            </View>
        </View>
    </Modal>
);

export default ImagePickerModal;
