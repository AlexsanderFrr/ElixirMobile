import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, Alert, Image, } from 'react-native';
import HeaderBar from '../../components/Pesquisar/HeaderBar';
import SearchBar from '../../components/Pesquisar/SearchBar';
import { apiEndpoint } from '../../config/constantes';

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            Alert.alert('Erro', 'Digite algo para pesquisar.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${apiEndpoint}/suco/title/li`);
            if (!response.ok) throw new Error('Erro ao buscar dados');
            const data = await response.json();
            setResults(data.results || []); // Supondo que os resultados vêm em `data.results`
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível buscar os dados.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <HeaderBar title="Procurar" />
            <SearchBar
                placeholder="Pesquisar..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSearch={handleSearch}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#B85A25" style={styles.loader} />
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <Text style={styles.resultItem}>{item.nome}</Text>} // Supondo que o item tem um campo `name`
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Image
                                source={require('../../assets/Discovery-cuate 1.png')} // Caminho para a imagem
                                style={styles.emptyImage}
                            />
                            <Text style={styles.emptyTitle}>Não Encontrado!</Text>
                            <Text style={styles.emptyMessage}>Não foi encontrado nenhum item relacionado a sua pesquisa. Tente novamente!</Text>
                        </View>
                    }
                />
            )}
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
        fontWeight: 650,
        fontSize: 30,
    }
});
