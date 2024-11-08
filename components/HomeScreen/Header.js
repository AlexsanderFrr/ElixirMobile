// components/Header.js
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../../components/HomeScreen/SearchBar';

export default function Header() {
    return (
        <View style={styles.header}>
            <View style={styles.firstGroup}>
                <Image
                    source={require("../../assets/logo-branco.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Ionicons name="chatbubble-ellipses-outline" size={30} color="#fff" />     
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
