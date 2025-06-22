import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import ProductCard from '../HomeScreen/ProductCard';
import { useNavigation } from '@react-navigation/native';

export default function FavoriteList({ favoritos, userToken, setFavoritos }) {
    const navigation = useNavigation();
    const [sucosFavoritos, setSucosFavoritos] = useState(favoritos);

    useEffect(() => {
        setSucosFavoritos(favoritos); // atualiza quando favoritos da prop mudam
    }, [favoritos]);

    const handleRemoveFavorite = (idToRemove) => {
        const updatedList = sucosFavoritos.filter(item => item.id !== idToRemove);
        setSucosFavoritos(updatedList);
        setFavoritos(updatedList);
    };

    return (
        <FlatList
            data={sucosFavoritos}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.juiceButtonItemVertical}
                    onPress={() => navigation.navigate('Exibicao', {
                        item,                    // ✅ passa o objeto completo
                        userToken,               // ✅ necessário para favoritos
                        favoritos,
                        setFavoritos
                    })}
                >
                    <ProductCard
                        item={item}
                        userToken={userToken}
                        onRemoveFavorite={handleRemoveFavorite}
                        favoritos={favoritos}
                        setFavoritos={setFavoritos}
                    />
                </TouchableOpacity>
            )}
        />
    );
}

const styles = StyleSheet.create({
    juiceButtonItemVertical: {
        marginBottom: 20,
    },
});
