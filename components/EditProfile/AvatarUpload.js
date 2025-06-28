import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from '../EditProfile/styles';

const AvatarUpload = ({ image, defaultImage, onPickImage }) => (
    <View style={styles.avatarSection}>
        <TouchableOpacity onPress={onPickImage} style={styles.avatarContainer}>
            {image ? (
                <Image source={{ uri: image }} style={styles.avatar} />
            ) : defaultImage ? (
                <Image source={{ uri: defaultImage }} style={styles.avatar} />
            ) : (
                <View style={styles.avatarPlaceholder}>
                    <Ionicons name="person" size={50} color="#F24E1E" />
                </View>
            )}
            <View style={styles.cameraIcon}>
                <MaterialIcons name="photo-camera" size={20} color="white" />
            </View>
        </TouchableOpacity>
        <Text style={styles.changePhotoText}>Alterar foto</Text>
    </View>
);

export default AvatarUpload;