import '../global.css'
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';

const UserProfileModal = ({ visible, onClose }) => {
  const [email, setEmail] = useState('usuario@email.com');
  const [senha, setSenha] = useState('123456');

  const handleSave = () => {
    // Lógica de salvar (ex: API ou Context)
    console.log('Novo e-mail:', email);
    console.log('Nova senha:', senha);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white w-11/12 rounded-xl p-5">
          <Text className="text-lg font-bold mb-3">Meu Perfil</Text>

          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />
          {/* <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          /> */}

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="bg-green-500 px-4 py-2 rounded-lg"
              onPress={handleSave}
            >
              <Text className="text-white font-bold">Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red-500 px-4 py-2 rounded-lg"
              onPress={onClose}
            >
              <Text className="text-white font-bold">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UserProfileModal;
