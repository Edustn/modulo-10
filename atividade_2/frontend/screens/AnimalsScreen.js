import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultTheme, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';



export default function Animals() {
    
    const route = useRoute();
    const { jogador } = route.params;
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.botaoPrincipal}
                onPress={() => navigation.navigate('GameScreen', { categoria: 'mamiferos', jogador })}
            >
                <Text style={styles.textoBotao}>Mamíferos</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botaoPrincipal}
                onPress={() => navigation.navigate('GameScreen', { categoria: 'insetos', jogador: jogador })}
            >
                <Text style={styles.textoBotao}>Insetos e Artrópodes</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botaoPrincipal}
                onPress={() => navigation.navigate('GameScreen', { categoria: 'vida_marinha', jogador: jogador })}
            >
                <Text style={styles.textoBotao}>Vida Marinha</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
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
