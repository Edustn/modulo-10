import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import TelaLogin from '../components/TelaLogin';
// import TelaCadastro from '../components/TelaCadastro';
// import TelaSolicacaoEmail from '../components/TelaSolicacaoEmail';
// import TelaValidacao from '../components/TelaValidacao';
// import TelaRedTelaRedfinirSenha from '../components/TelaRedfinirSenha';
// import TelaPrincipal from '../components/TelaPrincipal';
// import ImagePickerScreen from '../components/CameraScreen';


import HomeScreen from '../screens/HomeScreen'
import RankingScreen from '../screens/RankingScreen'
import AnimalsScreen from '../screens/AnimalsScreen'
import GameScreen from '../screens/GameScreen'

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="RankingScreen" component={RankingScreen} />
                <Stack.Screen name="AnimalsScreen" component={AnimalsScreen} />
                <Stack.Screen name="GameScreen" component={GameScreen} />
              
            </Stack.Navigator>
        </NavigationContainer>
    );
}
