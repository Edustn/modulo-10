// VerificarOTP.js
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerificarOTP({ navigation, route }) {
  const [otp, setOtp] = useState('');
  const email = route.params.email;

  const handleVerificar = async () => {
    const response = await fetch('http://SEU_BACKEND/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    if (response.ok) {
      navigation.navigate('NovaSenha', { email });
    } else {
      Alert.alert('Erro', 'Código inválido.');
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-6">Código OTP</Text>
      <TextInput
        placeholder="Digite o código recebido"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        className="w-full border border-gray-300 rounded-xl p-4 mb-4"
      />
      <TouchableOpacity
        onPress={handleVerificar}
        className="w-full bg-blue-600 py-4 rounded-xl"
      >
        <Text className="text-white text-center font-bold text-lg">Verificar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
