import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ip_address from '../utils/ip_address';

import { categorias } from '../data/animalsList';

function shuffleArray(array) {
  return array
    .concat(array) // duplica os pares
    .sort(() => Math.random() - 0.5) // embaralha
    .map((item, index) => ({
      id: index,
      content: item,
      isFlipped: false,
      isMatched: false
    }));
}

export default function GameScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  // Recebe categoria e jogador (jogador é um objeto {id, nome, pontuacao})
  const { categoria, jogador } = route.params;

  const emojis = categorias[categoria];

  const [cards, setCards] = useState(shuffleArray(emojis));
  const [flippedCards, setFlippedCards] = useState([]);
  const [pontuacao, setPontuacao] = useState(0);

  // Verificar combinação de cartas
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      if (first.content === second.content) {
        // Acertou o par
        setCards(prev =>
          prev.map(card =>
            card.id === first.id || card.id === second.id
              ? { ...card, isMatched: true }
              : card
          )
        );
        setPontuacao(prev => prev + 10); // Acerto +10
      } else {
        setPontuacao(prev => (prev > 0 ? prev - 1 : 0)); // Erro -1 (não deixa negativo)
      }

      setTimeout(() => {
        setCards(prev =>
          prev.map(card =>
            card.id === first.id || card.id === second.id
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards]);

  // Verificar fim do jogo
  useEffect(() => {
    if (cards.every(card => card.isMatched)) {
      atualizarPontuacaoNoBackend();
    }
  }, [cards]);

  // Flip da carta
  const handlePress = (card) => {
    if (card.isFlipped || card.isMatched || flippedCards.length === 2) return;

    const flipped = { ...card, isFlipped: true };
    setCards(prev =>
      prev.map(c => (c.id === card.id ? flipped : c))
    );
    setFlippedCards(prev => [...prev, flipped]);
  };

  // Atualizar pontuação no backend
  const atualizarPontuacaoNoBackend = async () => {
    try {
      await fetch(`http://${ip_address}:8000/atualizar_pontuacao`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: jogador.nome,
          pontuacao: pontuacao
        })
      });

      Alert.alert(
        "Jogo Finalizado",
        `Parabéns ${jogador.nome}, sua pontuação foi ${pontuacao} pontos!`,
        [
          { text: "Ver Ranking", onPress: () => navigation.navigate('RankingScreen') },
          { text: "Voltar ao Início", onPress: () => navigation.navigate('HomeScreen') }
        ]
      );

    } catch (error) {
      console.error('Erro ao atualizar pontuação:', error);
      Alert.alert("Erro", "Não foi possível atualizar sua pontuação.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Jogo da Memória</Text>
      <Text style={styles.subtitle}>Jogador: {jogador.nome}</Text>
      <Text style={styles.score}>Pontuação: {pontuacao}</Text>

      <View style={styles.centeredContent}>
        <FlatList
          data={cards}
          numColumns={4}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                item.isMatched && styles.matchedCard
              ]}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.cardText}>
                {item.isFlipped || item.isMatched ? item.content : '❓'}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfada',
    alignItems: 'center',
    justifyContent: 'flex-start', // deixa espaço para o título no topo
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#444',
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 70,
    height: 70,
    margin: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 5,
  },
  matchedCard: {
    backgroundColor: '#a8e6cf',
  },
  cardText: {
    fontSize: 32,
    color: 'red',
  },
});