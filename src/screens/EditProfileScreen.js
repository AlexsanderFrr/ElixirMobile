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
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';
import { apiEndpoint } from '../../config/constantes';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

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
            if (formData.senha) {
                formDataToSend.append('senha', formData.senha);
            }

            // Adiciona imagem se foi selecionada
            if (image) {
                const fileType = image.split('.').pop();
                formDataToSend.append('imagem', {
                    uri: image,
                    type: `image/${fileType}`,
                    name: `profile_${userInfo.id}.${fileType}`,
                });
            }

            const response = await fetch(`${apiEndpoint}/usuario/me`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.ok) {
                // Atualiza o contexto com as novas informações
                const updatedUserInfo = await fetch(`${apiEndpoint}/usuario/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                });

                const newUserInfo = await updatedUserInfo.json();
                if (newUserInfo.imagem) {
                    newUserInfo.imagem = `${apiEndpoint}/${newUserInfo.imagem}`;
                }

                setUserInfo(newUserInfo);
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
                navigation.goBack();
            } else {
                Alert.alert('Erro', data.message || 'Erro ao atualizar perfil');
            }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao atualizar o perfil');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Header com botão de voltar e título */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#F24E1E" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Editar Perfil</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.formContainer}>
                    {/* Seção de Foto de Perfil */}
                    <TouchableOpacity
                        style={styles.imagePicker}
                        onPress={pickImage}
                    >
                        {image ? (
                            <Image
                                source={{ uri: image }}
                                style={styles.profileImage}
                            />
                        ) : userInfo?.imagem ? (
                            <Image
                                source={{ uri: userInfo.imagem }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <View style={styles.profileImagePlaceholder}>
                                <Ionicons name="person" size={40} color="#F24E1E" />
                            </View>
                        )}
                        <Text style={styles.imagePickerText}>Alterar foto</Text>
                    </TouchableOpacity>

                    {/* Campos do formulário */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nome</Text>
                        <TextInput
                            style={[styles.input, errors.nome && styles.inputError]}
                            value={formData.nome}
                            onChangeText={(text) => handleChange('nome', text)}
                            placeholder="Digite seu nome"
                        />
                        {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
                            value={formData.email}
                            onChangeText={(text) => handleChange('email', text)}
                            placeholder="Digite seu email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nova Senha (opcional)</Text>
                        <TextInput
                            style={[styles.input, errors.senha && styles.inputError]}
                            value={formData.senha}
                            onChangeText={(text) => handleChange('senha', text)}
                            placeholder="Digite uma nova senha"
                            secureTextEntry
                        />
                        {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirmar Nova Senha</Text>
                        <TextInput
                            style={[styles.input, errors.confirmarSenha && styles.inputError]}
                            value={formData.confirmarSenha}
                            onChangeText={(text) => handleChange('confirmarSenha', text)}
                            placeholder="Confirme a nova senha"
                            secureTextEntry
                        />
                        {errors.confirmarSenha && <Text style={styles.errorText}>{errors.confirmarSenha}</Text>}
                    </View>

                    {/* Botão de Salvar */}
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
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
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    formContainer: {
        marginBottom: 30,
    },
    imagePicker: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    profileImagePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    imagePickerText: {
        color: '#F24E1E',
        fontSize: 16,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    saveButton: {
        backgroundColor: '#F24E1E',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EditProfileScreen;