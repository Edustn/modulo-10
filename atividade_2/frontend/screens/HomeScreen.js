import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();

    const [usuario, setUsuario] = useState('');

    const handleLogin = () => {

    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>User</Text>

            <TextInput
                placeholder="User"
                placeholderTextColor="#6b7280"
                value={usuario}
                onChangeText={setUsuario}
                // keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
            />



            <TouchableOpacity
                onPress={() => navigation.navigate('AnimalsScreen')}
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
    },
    linksContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
        marginTop: 8
    },
    botaoLink: {
        paddingVertical: 4,
        paddingHorizontal: 8
    },
    textoLink: {
        color: '#6b7280',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14
    }
});