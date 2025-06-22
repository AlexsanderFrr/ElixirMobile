import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    ActivityIndicator,
    Alert,
    Image,
} from 'react-native';
import HeaderBar from '../../components/Pesquisar/HeaderBar';
import SearchBar from '../../components/Pesquisar/SearchBar';
import { apiEndpoint } from '../../config/constantes';

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchResults = async (query) => {
        setLoading(true);
        try {
            const url = query
                ? `${apiEndpoint}/suco/title/${encodeURIComponent(query)}`
                : `${apiEndpoint}/suco/all`; // Busca todos se não houver query
            const response = await fetch(url);
            if (!response.ok) throw new Error('Erro ao buscar dados');
            const data = await response.json();
            setResults(data);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível buscar os dados.');
            console.error('Erro ao buscar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults(searchQuery.length > 0 ? searchQuery : null);
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <HeaderBar title="Procurar" />
            <SearchBar
                placeholder="Pesquisar..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSearch={() => fetchResults(searchQuery)}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#B85A25" style={styles.loader} />
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.resultItem}>{item.suco_nome || item.nome}</Text>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Image
                                source={require('../../assets/Discovery-cuate.png')}
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
        resizeMode: 'contain',
        width: 200,
        height: 200,
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
        fontWeight: 'bold',
        fontSize: 30,
    },
});
