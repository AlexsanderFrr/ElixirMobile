import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { apiEndpoint } from '../../config/constantes';
import { AuthContext } from '../context/authContext';

import Header from '../../components/Favoritos/Header';
import EmptyState from '../../components/Favoritos/EmptyState';
import FavoriteList from '../../components/Favoritos/FavoriteList';

export default function Favoritos() {
    const { userToken } = useContext(AuthContext);
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFavoritos = useCallback(async () => {
        if (!userToken) {
            console.warn("Token de usuário ausente. A requisição foi ignorada.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${apiEndpoint}/favoritos/all`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                },
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar favoritos: ${response.status}`);
            }

            const data = await response.json();
            const sucos = Array.isArray(data)
                ? data.map((fav) => fav.suco).filter(Boolean)
                : [];

            setFavoritos(sucos);
        } catch (error) {
            console.error("Erro ao buscar favoritos:", error);
            Alert.alert('Erro', 'Não foi possível carregar os favoritos.');
        } finally {
            setLoading(false);
        }
    }, [userToken]);

    useEffect(() => {
        fetchFavoritos();
    }, []);

    return (
        <View style={styles.container}>
            <Header title="Favoritos" />
            {loading ? (
                <ActivityIndicator size="large" style={styles.loader} />
            ) : favoritos.length === 0 ? (
                <EmptyState />
            ) : (
                <FavoriteList
                    favoritos={favoritos}
                    userToken={userToken}
                    setFavoritos={setFavoritos}
                    onRefresh={fetchFavoritos}
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
});
