// components/ImagePickerScreen.js

import React, { useState } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ImagePickerScreen({ products }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  const abrirCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Permissão para acessar a câmera negada.');
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setSelectedImage(resultado.assets[0].uri);
      Alert.alert('Sucesso', 'Foto tirada com sucesso!');
    }
  };

  const abrirGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Permissão para acessar a galeria negada.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setSelectedImage(resultado.assets[0].uri);
      Alert.alert('Sucesso', 'Imagem selecionada da galeria!');
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      className="flex-1 m-2 bg-white rounded-xl p-3 items-center max-w-[46%] shadow"
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={item.image} className="w-20 h-20 mb-2" resizeMode="contain" />
      <Text className="text-sm font-bold text-center mb-1">{item.name}</Text>
      <Text className="text-green-600 font-bold text-base">{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      {selectedImage && (
        <View className="items-center my-3">
          <Image source={{ uri: selectedImage }} className="w-40 h-40 rounded-xl border border-gray-300" />
        </View>
      )}

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 140, paddingHorizontal: 8 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Botões de ação */}
      <View className="absolute bottom-5 right-5 items-center space-y-4">
        <TouchableOpacity
          className="w-14 h-14 rounded-full bg-purple-600 justify-center items-center shadow"
          onPress={abrirGaleria}
        >
          <Ionicons name="images" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          className="w-14 h-14 rounded-full bg-blue-600 justify-center items-center shadow"
          onPress={abrirCamera}
        >
          <Ionicons name="camera" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
