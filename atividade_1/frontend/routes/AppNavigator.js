import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaLogin from '../components/TelaLogin';
import TelaCadastro from '../components/TelaCadastro';
import TelaSolicacaoEmail from '../components/TelaSolicacaoEmail';
import TelaValidacao from '../components/TelaValidacao';
import TelaRedTelaRedfinirSenha from '../components/TelaRedfinirSenha';
import TelaPrincipal from '../components/TelaPrincipal';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={TelaLogin} />
                <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
                <Stack.Screen name="TelaSolicacaoEmail" component={TelaSolicacaoEmail} />
                <Stack.Screen name="TelaValidacao" component={TelaValidacao} />
                <Stack.Screen name="TelaRedTelaRedfinirSenha" component={TelaRedTelaRedfinirSenha} />
                <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
