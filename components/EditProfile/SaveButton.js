import React from 'react';
import { TouchableOpacity, View, ActivityIndicator, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../EditProfile/styles';

const SaveButton = ({ loading, onPress, text }) => (
    <TouchableOpacity
        style={[styles.saveButton, loading && styles.saveButtonDisabled]}
        onPress={onPress}
        disabled={loading}
        activeOpacity={0.8}
    >
        {loading ? (
            <ActivityIndicator color="#fff" size="small" />
        ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="save" size={20} color="white" />
                <Text style={styles.saveButtonText}>{text}</Text>
            </View>
        )}
    </TouchableOpacity>
);

export default SaveButton;