import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, Alert, Image } from 'react-native';
import HeaderBar from '../../components/Pesquisar/HeaderBar';
import SearchBar from '../../components/Pesquisar/SearchBar';
import { apiEndpoint } from '../../config/constantes';

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Função de busca
    const fetchResults = async (query) => {
        setLoading(true);
        try {
            const url = query
                ? `${apiEndpoint}/suco/search/${query}`
                : `${apiEndpoint}/suco/all`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Erro ao buscar dados');
            const data = await response.json();
            console;log('Data fetched1: ', data);
            setResults(data); // Ajuste dependendo da estrutura da resposta da API
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível buscar os dados.');
            console.error('Erro ao buscar dados:', error);
        } finally {
            setLoading(false);
        }
    };
    
    // Efeito para busca automática quando a consulta muda
    useEffect(() => {
        if (searchQuery.length > 0) {
            fetchResults(searchQuery);
        } else {
            fetchResults(null); // Busca todos os itens caso a consulta esteja vazia
        }
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <HeaderBar title="Procurar" />
            <SearchBar
                placeholder="Pesquisar..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSearch={() => fetchResults(searchQuery)} // Realiza a busca manualmente
            />
            {loading ? (
                <ActivityIndicator size="large" color="#B85A25" style={styles.loader} />
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.resultItem}>{item.nome}</Text>
                    )} // Ajuste se o campo correto for diferente de `nome`
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Image
                                source={require('../../assets/Discovery-cuate1.png')} // Caminho para a imagem
                                style={styles.emptyImage}
                            />
                            <Text style={styles.emptyTitle}>Não Encontrado!</Text>
                            <Text style={styles.emptyMessage}>
                                Não foi encontrado nenhum item relacionado à sua pesquisa. Tente novamente!
                            </Text>
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
        fontWeight: 'bold', // Corrigido para um valor válido
        fontSize: 30,
    },
});