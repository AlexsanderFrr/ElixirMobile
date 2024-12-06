import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, Alert, Image } from 'react-native';
import Header from "../../components/Favoritos/Header";

export default function Favoritos() {

    return (
        <View style={styles.container}>
            <Header title="Favoritos" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4DEAA',
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    loader: {
        marginTop: 20,
    },
    resultItem: {
        backgroundColor: '#FFF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 2,
        color: '#000',
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyImage: {
        marginBottom: 20,
        resizeMode: 'contain', // Ajusta a imagem para caber no espaço
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        color: '#838181',
        fontSize: 18,
    },
    emptyTitle: {
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold', // Corrigido para um valor válido
        fontSize: 30,
    },
});