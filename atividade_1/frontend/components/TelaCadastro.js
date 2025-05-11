import '../global.css'
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import TelaCadastro from './components/TelaCadastro';


export default function TelaCadastro() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-white px-6">
            <Text className="font-bold text-2xl mb-8"> Cadastro</Text>
            <TextInput
                placeholder="Email"
                placeholderTextColor="gray_text"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="w-full border border-gray-300 rounded-xl p-4 mb-4" />

            <TextInput
                placeholder="Senha"
                placeholderTextColor="gray_text"
                value={email}
                onChangeText={setSenha}
                secureTextEntry
                className="w-full border border-gray-300 rounded-xl p-4 mb-4" />

            <TouchableOpacity
                // onPress={handleLogin}
                className="w-full bg-blue-600 py-4 rounded-xl"
            >
                <Text className="text-white text-center font-bold text-lg">Cadastrar</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}
