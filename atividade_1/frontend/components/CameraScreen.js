import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [openCamera, setOpenCamera] = useState(false);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const photoData = await cameraRef.current.takePictureAsync();
            setPhoto(photoData.uri);
            setOpenCamera(false);
        }
    };

    if (hasPermission === null) {
        return <View className="flex-1 justify-center items-center"><Text>Solicitando permissão...</Text></View>;
    }

    if (hasPermission === false) {
        return <View className="flex-1 justify-center items-center"><Text>Permissão negada.</Text></View>;
    }

    return (
        <View className="flex-1 justify-center items-center bg-white">
            {!openCamera && !photo && (
                <TouchableOpacity
                    className="bg-blue-600 px-6 py-3 rounded-lg mt-4"
                    onPress={() => setOpenCamera(true)}
                >
                    <Text className="text-white font-bold text-lg">Abrir Câmera</Text>
                </TouchableOpacity>
            )}

            {openCamera && (
                <Camera
                    className="flex-1 w-full justify-end"
                    ref={cameraRef}
                    type={CameraType.back}
                >
                    <View className="items-center mb-8">
                        <TouchableOpacity
                            className="bg-blue-600 px-6 py-3 rounded-lg"
                            onPress={takePicture}
                        >
                            <Text className="text-white font-bold text-lg">Tirar Foto</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            )}

            {photo && !openCamera && (
                <View className="items-center mt-6">
                    <Image source={{ uri: photo }} className="w-72 h-96 rounded-xl mb-4" />
                    <TouchableOpacity
                        className="bg-blue-600 px-6 py-3 rounded-lg"
                        onPress={() => setPhoto(null)}
                    >
                        <Text className="text-white font-bold text-lg">Tirar outra</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
