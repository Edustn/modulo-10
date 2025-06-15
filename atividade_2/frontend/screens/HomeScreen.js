import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ip_address from '../utils/ip_address';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [usuario, setUsuario] = useState('');

    const handleLogin = async () => {
        if (!usuario.trim()) {
            Alert.alert('Erro', 'Por favor, insira um nome de usuário.');
            return;
        }

        try {
            const response = await fetch(`http://${ip_address}:8000/jogador`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: usuario })
            });

            const data = await response.json();

            if (response.ok) {
                // Navega para a tela de seleção de animais
                navigation.navigate('AnimalsScreen', { jogador: data });
            } else {
                Alert.alert('Erro', data.detail || 'Erro ao criar jogador.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>User</Text>

            <TextInput
                placeholder="User"
                placeholderTextColor="#6b7280"
                value={usuario}
                onChangeText={setUsuario}
                autoCapitalize="none"
                style={styles.input}
            />

            <TouchableOpacity
                onPress={handleLogin}
                style={styles.botaoPrincipal}
            >
                <Text style={styles.textoBotao}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('RankingScreen')}
                style={styles.botaoRanking}
            >
                <Text style={styles.textoBotao}>Ranking</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 24
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 32,
        color: '#1f2937'
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        fontSize: 16
    },

    botaoRanking: {
        width: '100%',
        backgroundColor: '#ffa500',
        padding: 16,
        borderRadius: 12,
        marginTop: 8
    },
    botaoPrincipal: {
        width: '100%',
        backgroundColor: '#2563eb',
        padding: 16,
        borderRadius: 12,
        marginTop: 8
    },
    textoBotao: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    }
});
