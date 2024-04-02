import React, { useEffect } from 'react';
import { View, ImageBackground, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        // Simule um tempo de carregamento
        const timer = setTimeout(() => {
            navigation.replace('Home');
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={{ 
            flex:1,
            flexDirection: 'column',
            }}>
            <ImageBackground
                source={require('../assets/backgroundsuco.png')}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={require('../assets/logo.png')}
                    style={{
                        width: 292,
                        height: 47,
                    }}
                />
            </ImageBackground>
        </View>
    );
};
export default SplashScreen;