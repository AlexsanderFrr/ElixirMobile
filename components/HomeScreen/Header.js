import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importação da função useNavigation
import SearchBar from '../../components/HomeScreen/SearchBar';

export default function Header() {
    const navigation = useNavigation(); // Uso da função useNavigation para acessar a navegação

    return (
        <View style={styles.header}>
            <View style={styles.firstGroup}>
                <Image
                    source={require("../../assets/logo-branco.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                    <Ionicons name="chatbubble-ellipses-outline" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            <SearchBar />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 191,
        backgroundColor: "#BB5104",
        paddingHorizontal: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    firstGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
    },
    logo: {
        width: 200,
        height: 30,
    },
});
