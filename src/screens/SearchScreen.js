import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    ActivityIndicator,
    Image,
} from 'react-native';
import HeaderBar from '../../components/Pesquisar/HeaderBar';
import SearchBar from '../../components/Pesquisar/SearchBar';
import { apiEndpoint } from '../../config/constantes';
import { Ionicons } from '@expo/vector-icons';

let debounceTimer;

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchSubmitted, setSearchSubmitted] = useState(false); // ✅ novo estado

    const fetchResults = async (query) => {
        if (!query || query.trim() === '') {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const url = `${apiEndpoint}/suco/title/${encodeURIComponent(query)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Erro ao buscar dados');
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    // Efeito para busca automática enquanto digita
    useEffect(() => {
        clearTimeout(debounceTimer);

        if (searchQuery.trim().length === 0) {
            setResults([]);
            setSearchSubmitted(false); // reseta o envio se o campo for apagado
            return;
        }

        debounceTimer = setTimeout(() => {
            fetchResults(searchQuery);
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    // Envio manual da busca
    const handleManualSearch = () => {
        if (searchQuery.trim().length > 0) {
            setSearchSubmitted(true); // ✅ ativa o modo "busca enviada"
            fetchResults(searchQuery);
        } else {
            setResults([]);
            setSearchSubmitted(false);
        }
    };

    return (
        <View style={styles.container}>
            <HeaderBar title="Procurar" />
            <SearchBar
                placeholder="Pesquisar..."
                value={searchQuery}
                onChangeText={(text) => {
                    setSearchQuery(text);
                    setSearchSubmitted(false); // ✅ evita mostrar "não encontrado" enquanto digita
                }}
                onSearch={handleManualSearch}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#B85A25" style={styles.loader} />
            ) : searchQuery.trim().length > 0 ? (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
                    renderItem={({ item }) => (
                        <View style={styles.resultItem}>
                            <Ionicons name="timer-outline" size={22} color="#B85A25" style={styles.icon} />
                            <Text style={styles.resultText}>{item.suco_nome || item.nome}</Text>
                        </View>
                    )}
                    ListEmptyComponent={
                        // ✅ Só mostra se o usuário tiver enviado a busca e não encontrou nada
                        searchSubmitted && results.length === 0 ? (
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
                        ) : null
                    }
                />
            ) : null}
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
    icon: {
        marginLeft: 5,
    },
    resultItem: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#FFF',
        padding: 5,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 2,
    },
    resultText: {
        color: '#000',
        fontWeight: 'bold',
        marginLeft: 5,
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
