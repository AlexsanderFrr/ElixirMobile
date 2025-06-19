import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import ProductCard from '../HomeScreen/ProductCard';
import { useNavigation } from '@react-navigation/native';

export default function FavoriteList({ favoritos, userToken, }) {
    const navigation = useNavigation();
    const [sucosFavoritos, setSucosFavoritos] = useState(favoritos);

    useEffect(() => {
        setSucosFavoritos(favoritos); // atualiza quando favoritos da prop mudam
    }, [favoritos]);

    const handleRemoveFavorite = (idToRemove) => {
        const updatedList = sucosFavoritos.filter(item => item.id !== idToRemove);
        setSucosFavoritos(updatedList);
    };

    return (
        <FlatList
            data={sucosFavoritos}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.juiceButtonItemVertical}
                    onPress={() => navigation.navigate('Exibicao', {
                        name: item.nome,
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
                        onRemoveFavorite={handleRemoveFavorite} // ✅ passa callback
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
