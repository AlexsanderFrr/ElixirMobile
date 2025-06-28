import React, { useContext, useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
    StyleSheet,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';
import { apiEndpoint } from '../../config/constantes';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

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

        // Clear error when user types
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

            // Adiciona campos do formulário
            formDataToSend.append('nome', formData.nome);
            formDataToSend.append('email', formData.email);

            // Só envia a senha se foi alterada
            if (formData.senha && formData.senha.trim() !== '') {
                formDataToSend.append('senha', formData.senha);
            }

            // Adiciona imagem se foi selecionada
            if (image) {
                const fileType = image.split('.').pop();
                const fileName = image.split('/').pop();

                formDataToSend.append('imagem', {
                    uri: image,
                    type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`,
                    name: fileName || `profile_${userInfo.id}.${fileType}`,
                });
            }

            // Debug: Mostra o que está sendo enviado
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

            // Verifica se a resposta foi bem sucedida
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Erro ao atualizar perfil');
            }

            // Processa a resposta da API
            const updatedData = await response.json();

            // Atualiza o contexto com as novas informações
            const updatedUser = {
                ...userInfo,
                nome: updatedData.nome || userInfo.nome,
                email: updatedData.email || userInfo.email,
                // Mantém a imagem existente se não foi atualizada
                imagem: updatedData.imagem
                    ? `${apiEndpoint}/${updatedData.imagem}`
                    : userInfo.imagem
            };

            setUserInfo(updatedUser);

            // Força uma nova requisição para garantir os dados mais recentes
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
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={28} color="#F24E1E" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Editar Perfil</Text>
                    <View style={{ width: 28 }} /> {/* Espaçamento para alinhamento */}
                </View>

                {/* Formulário */}
                <View style={styles.formCard}>
                    {/* Seção de Foto */}
                    <View style={styles.avatarSection}>
                        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.avatar} />
                            ) : userInfo?.imagem ? (
                                <Image source={{ uri: userInfo.imagem }} style={styles.avatar} />
                            ) : (
                                <View style={styles.avatarPlaceholder}>
                                    <Ionicons name="person" size={50} color="#F24E1E" />
                                </View>
                            )}
                            <View style={styles.cameraIcon}>
                                <MaterialIcons name="photo-camera" size={20} color="white" />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.changePhotoText}>Alterar foto</Text>
                    </View>

                    {/* Campos do Formulário */}
                    <View style={styles.formGroup}>
                        <View style={styles.inputContainer}>
                            <FontAwesome name="user" size={18} color="#F24E1E" style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, errors.nome && styles.inputError]}
                                value={formData.nome}
                                onChangeText={(text) => handleChange('nome', text)}
                                placeholder="Nome completo"
                                placeholderTextColor="#999"
                            />
                        </View>
                        {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
                    </View>

                    <View style={styles.formGroup}>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="email" size={18} color="#F24E1E" style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, errors.email && styles.inputError]}
                                value={formData.email}
                                onChangeText={(text) => handleChange('email', text)}
                                placeholder="E-mail"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>

                    <View style={styles.formGroup}>
                        <View style={styles.inputContainer}>
                            <Feather name="lock" size={18} color="#F24E1E" style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, errors.senha && styles.inputError]}
                                value={formData.senha}
                                onChangeText={(text) => handleChange('senha', text)}
                                placeholder="Nova senha (opcional)"
                                placeholderTextColor="#999"
                                secureTextEntry
                            />
                        </View>
                        {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}
                    </View>

                    <View style={styles.formGroup}>
                        <View style={styles.inputContainer}>
                            <Feather name="lock" size={18} color="#F24E1E" style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, errors.confirmarSenha && styles.inputError]}
                                value={formData.confirmarSenha}
                                onChangeText={(text) => handleChange('confirmarSenha', text)}
                                placeholder="Confirmar nova senha"
                                placeholderTextColor="#999"
                                secureTextEntry
                            />
                        </View>
                        {errors.confirmarSenha && <Text style={styles.errorText}>{errors.confirmarSenha}</Text>}
                    </View>

                    {/* Botão de Salvar */}
                    <TouchableOpacity
                        style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={isLoading}
                        activeOpacity={0.8}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons name="save" size={20} color="white" />
                                <Text style={styles.saveButtonText}>SALVAR ALTERAÇÕES</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    scrollContainer: {
        paddingBottom: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingTop: 20,
        paddingBottom: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        flex: 1,
    },
    formCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginHorizontal: 20,
        marginTop: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 10,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#F24E1E',
    },
    avatarPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#F24E1E',
    },
    cameraIcon: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        backgroundColor: '#F24E1E',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    changePhotoText: {
        color: '#F24E1E',
        fontSize: 16,
        fontWeight: '500',
    },
    formGroup: {
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 13,
        marginTop: 5,
        marginLeft: 10,
    },
    saveButton: {
        backgroundColor: '#F24E1E',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        flexDirection: 'row',
    },
    saveButtonDisabled: {
        backgroundColor: '#F24E1Eaa',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10, // Aumentei a margem para melhor espaçamento
    },
});

export default EditProfileScreen;