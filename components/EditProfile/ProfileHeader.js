import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../EditProfile/styles';

const ProfileHeader = ({ title, onBack }) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="#F24E1E" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={{ width: 28 }} />
    </View>
);

export default ProfileHeader;