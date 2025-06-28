import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Alert, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';
import { apiEndpoint } from '../../config/constantes';
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from '../../components/EditProfile/styles';
import ProfileHeader from '../../components/EditProfile/ProfileHeader';
import AvatarUpload from '../../components/EditProfile/AvatarUpload';
import FormInput from '../../components/EditProfile/FormInput';
import SaveButton from '../../components/EditProfile/SaveButton';

const EditProfileScreen = () => {
        const { userInfo, userToken, setUserInfo } = useContext(AuthContext);
    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (userInfo) {
            setFormData({
                nome: userInfo.nome || '',
                email: userInfo.email || '',
                senha: '',
                confirmarSenha: ''
            });
        }
    }, [userInfo]);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nome.trim()) {
            newErrors.nome = 'Nome é obrigatório';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (formData.senha && formData.senha.length < 6) {
            newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
        }

        if (formData.senha !== formData.confirmarSenha) {
            newErrors.confirmarSenha = 'Senhas não coincidem';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const formDataToSend = new FormData();

            formDataToSend.append('nome', formData.nome);
            formDataToSend.append('email', formData.email);

            if (formData.senha && formData.senha.trim() !== '') {
                formDataToSend.append('senha', formData.senha);
            }

            if (image) {
                const fileType = image.split('.').pop();
                const fileName = image.split('/').pop();

                formDataToSend.append('imagem', {
                    uri: image,
                    type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`,
                    name: fileName || `profile_${userInfo.id}.${fileType}`,
                });
            }

            console.log('Enviando dados:', {
                nome: formData.nome,
                email: formData.email,
                temSenha: !!formData.senha,
                temImagem: !!image
            });

            const response = await fetch(`${apiEndpoint}/usuario/me`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
                body: formDataToSend,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Erro ao atualizar perfil');
            }

            const updatedData = await response.json();

            const updatedUser = {
                ...userInfo,
                nome: updatedData.nome || userInfo.nome,
                email: updatedData.email || userInfo.email,
                imagem: updatedData.imagem
                    ? `${apiEndpoint}/${updatedData.imagem}`
                    : userInfo.imagem
            };

            setUserInfo(updatedUser);

            const refreshResponse = await fetch(`${apiEndpoint}/usuario/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Cache-Control': 'no-cache'
                },
            });

            if (refreshResponse.ok) {
                const refreshedData = await refreshResponse.json();
                setUserInfo({
                    ...refreshedData,
                    imagem: refreshedData.imagem
                        ? `${apiEndpoint}/${refreshedData.imagem}`
                        : null
                });
            }

            Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
            navigation.goBack();
        } catch (error) {
            console.error('Erro detalhado:', error);
            Alert.alert('Erro', error.message || 'Ocorreu um erro ao atualizar o perfil');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <ProfileHeader 
                    title="Editar Perfil" 
                    onBack={() => navigation.goBack()} 
                />
                
                <View style={styles.formCard}>
                    <AvatarUpload 
                        image={image} 
                        defaultImage={userInfo?.imagem} 
                        onPickImage={pickImage} 
                    />
                    
                    <FormInput
                        icon="user"
                        iconLib={FontAwesome}
                        placeholder="Nome completo"
                        value={formData.nome}
                        onChangeText={(text) => handleChange('nome', text)}
                        error={errors.nome}
                    />
                    
                    <FormInput
                        icon="email"
                        iconLib={MaterialIcons}
                        placeholder="E-mail"
                        value={formData.email}
                        onChangeText={(text) => handleChange('email', text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        error={errors.email}
                    />
                    
                    <FormInput
                        icon="lock"
                        iconLib={Feather}
                        placeholder="Nova senha (opcional)"
                        value={formData.senha}
                        onChangeText={(text) => handleChange('senha', text)}
                        secureTextEntry
                        error={errors.senha}
                    />
                    
                    <FormInput
                        icon="lock"
                        iconLib={Feather}
                        placeholder="Confirmar nova senha"
                        value={formData.confirmarSenha}
                        onChangeText={(text) => handleChange('confirmarSenha', text)}
                        secureTextEntry
                        error={errors.confirmarSenha}
                    />
                    
                    <SaveButton 
                        loading={isLoading} 
                        onPress={handleSubmit} 
                        text="SALVAR ALTERAÇÕES" 
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfileScreen;