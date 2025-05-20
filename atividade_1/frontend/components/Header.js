import '../global.css'
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserProfileModal from './Modal';

const UserHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="h-16 bg-blue-500 flex-row items-center justify-between px-4 pt-3">
      <Text className="text-white text-xl font-bold">Godot Store</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="person-circle-outline" size={32} color="#fff" />
      </TouchableOpacity>

      <UserProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

export default UserHeader;
