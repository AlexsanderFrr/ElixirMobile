import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function EmptyState() {
    return (
        <View style={styles.emptyContainer}>
            <Image
                source={require('../../assets/bebidaNotFound.png')}
                style={styles.emptyImage}
                resizeMode='contain'
            />
            <Text style={styles.emptyTitle}>Nenhum favorito</Text>
            <Text style={styles.emptyMessage}>
                Você ainda não marcou nenhum suco como favorito.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
    },
    emptyImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    emptyTitle: {
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold',
        fontSize: 30,
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        color: '#838181',
        fontSize: 18,
    },
});
