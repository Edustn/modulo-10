// NovaSenha.js
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ip_address from '../utils/ip_address';


export default function NovaSenha({ route }) {
  const [senha, setSenha] = useState('');
  const email = route.params.email;

  const handleRedefinir = async () => {
    // const ip = ip_address
    const response = await fetch(`http://${ip_address}:8000/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
      Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
    } else {
      Alert.alert('Erro', 'Não foi possível redefinir a senha.');
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-6">Nova Senha</Text>
      <TextInput
        placeholder="Digite a nova senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        className="w-full border border-gray-300 rounded-xl p-4 mb-4"
      />
      <TouchableOpacity
        onPress={handleRedefinir}
        className="w-full bg-blue-600 py-4 rounded-xl"
      >
        <Text className="text-white text-center font-bold text-lg">Redefinir senha</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
