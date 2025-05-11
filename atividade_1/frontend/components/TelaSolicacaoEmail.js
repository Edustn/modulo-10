// EsqueciSenha.js
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EsqueciSenha({ navigation }) {
  const [email, setEmail] = useState('');

  const handleEnviarOTP = async () => {
    try {
      // Envia e-mail para o backend
      const response = await fetch('http://192.168.0.255:8000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        Alert.alert('Código enviado!', 'Verifique seu e-mail.');
        navigation.navigate('VerificarOTP', { email });
      } else {
        Alert.alert('Erro', 'Não foi possível enviar o código.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha na comunicação com o servidor.');
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-6">Recuperar senha</Text>
      <TextInput
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        className="w-full border border-gray-300 rounded-xl p-4 mb-4"
      />
      <TouchableOpacity
        onPress={handleEnviarOTP}
        className="w-full bg-blue-600 py-4 rounded-xl"
      >
        <Text className="text-white text-center font-bold text-lg">Enviar código</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
