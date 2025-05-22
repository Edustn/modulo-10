import '../global.css'
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


export default function TelaLogin() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = () => {
        console.log('Email:', email);
        console.log('Senha:', senha);
        if (email == "teste@gmail.com" && senha == '1234') {
            navigation.navigate('TelaPrincipal')
        }
        else {
            Alert.alert('Login ou senha incorretos');
            
        }
        // Alert.alert('Login enviado', `Email: ${email}\nSenha: ${senha}`);
        // Aqui você pode fazer uma requisição para o back-end
    };

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-white px-6">
            <Text className="text-2xl font-bold mb-8">Login</Text>

            <TextInput
                placeholder="Email"
                placeholderTextColor="gray_text"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="w-full border border-gray-300 rounded-xl p-4 mb-4"
            />

            <TextInput
                placeholder="Senha"
                placeholderTextColor="gray_text"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                className="w-full border border-gray-300 rounded-xl p-4 mb-6"
            />

            <TouchableOpacity
                onPress={handleLogin}
                className="w-full bg-blue-600 py-4 rounded-xl"
            >
                <Text className="text-white text-center font-bold text-lg">Entrar</Text>
            </TouchableOpacity>

            <View className="w-full flex-row justify-end space-x-2">
                <TouchableOpacity
                    onPress={() => navigation.navigate('TelaCadastro')}
                    className="py-1 px-2 rounded-xl mb-1 "
                >
                    <Text className="text-gray_text text-center font-bold text-sm">Cadastro</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('TelaSolicacaoEmail')}
                    className="py-1 px-2 rounded-xl mb-1"
                >
                    <Text className="text-gray_text text-center font-bold text-sm">Esqueci a senha</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}
