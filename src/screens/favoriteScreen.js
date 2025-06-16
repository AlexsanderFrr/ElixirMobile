import React, {
    useState,
    useEffect,
    useCallback,
    useContext,
} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    ActivityIndicator,
    Alert,
    Image,
    TouchableOpacity,
} from 'react-native';
import { apiEndpoint } from '../../config/constantes';
import { AuthContext } from '../context/authContext';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Favoritos/Header';
import ProductCard from '../../components/HomeScreen/ProductCard';

export default function Favoritos() {
    const navigation = useNavigation();
    const { userToken } = useContext(AuthContext);
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFavoritos = useCallback(async () => {
        // ✅ Proteção: só faz chamada se o token existir
        if (!userToken) {
            console.warn("Token de usuário ausente. A requisição foi ignorada.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${apiEndpoint}/favoritos/all`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar favoritos: ${response.status}`);
            }

            const data = await response.json();

            // ✅ Segurança: valida se `data` está no formato esperado
            const sucos = Array.isArray(data)
                ? data.map((fav) => fav.suco).filter(Boolean)
                : [];

            setFavoritos(sucos);
            console.log(data);
        } catch (error) {
            console.error("Erro ao buscar favoritos:", error);
            Alert.alert('Erro', 'Não foi possível carregar os favoritos.');
        } finally {
            setLoading(false);
        }
    }, [userToken]);

    useEffect(() => {
        fetchFavoritos();
    }, [fetchFavoritos]);

    const handleRemover = () => {
        fetchFavoritos(); // ✅ Recarrega favoritos ao remover
    };

    return (
        <View style={styles.container}>
            <Header title="Favoritos" />

            {loading ? (
                <ActivityIndicator size="large" style={styles.loader} />
            ) : favoritos.length === 0 ? (
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
            ) : (
                <FlatList
                    data={favoritos}
                    keyExtractor={(item) => item.id?.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.juiceButtonItemVertical}
                            onPress={() => navigation.navigate('Exibicao', {
                                nome: item.suco_nome,
                                benefits: item.beneficios,
                                image: item.img1,
                                ingredients: item.ingredientes,
                                preparationSteps: item.modo_de_preparo,
                                diagnostico: item.diagnostico_nome_da_condicao,
                            })}
                        >
                            <ProductCard
                                item={item}
                                userToken={userToken}
                                screen="favoritos"
                                onRemoveFavorite={handleRemover}
                            />
                        </TouchableOpacity>
                    )}
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
    juiceButtonItemVertical: {
        marginBottom: 20,
    },
});
