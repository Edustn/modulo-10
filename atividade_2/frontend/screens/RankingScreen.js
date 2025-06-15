import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ip_address from '../utils/ip_address';

export default function RankingScreen() {
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRanking();
    }, []);

    const fetchRanking = async () => {
        try {
            const response = await fetch(`http://${ip_address}:8000/ranking`);
            const data = await response.json();

            // Organiza no frontend também (garantia extra)
            const sortedData = data.sort((a, b) => b.pontuacao - a.pontuacao);
            setRanking(sortedData);
        } catch (error) {
            console.error('Erro ao buscar ranking:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#2563eb" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ranking</Text>

            <FlatList
                data={ranking}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.item}>
                        <Text style={styles.position}>{index + 1}º</Text>
                        <Text style={styles.name}>{item.nome}</Text>
                        <Text style={styles.points}>{item.pontuacao} pts</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 24
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 16,
        textAlign: 'center'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f3f4f6',
        padding: 16,
        borderRadius: 12,
        marginBottom: 8
    },
    position: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2563eb'
    },
    name: {
        fontSize: 16,
        color: '#1f2937'
    },
    points: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#10b981'
    }
});