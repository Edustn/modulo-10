import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';

// Cartas base (você pode usar emojis ou imagens)
const baseCards = ['🐶', '🐱', '🦊', '🐼', '🐸', '🦁', '🐵', '🐷'];

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

export default function App() {
  const [cards, setCards] = useState(shuffleArray(baseCards));
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      if (first.content === second.content) {
        setCards(prev =>
          prev.map(card =>
            card.id === first.id || card.id === second.id
              ? { ...card, isMatched: true }
              : card
          )
        );
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

  useEffect(() => {
    if (cards.every(card => card.isMatched)) {
      Alert.alert("Parabéns!", "Você encontrou todos os pares!");
    }
  }, [cards]);

  const handlePress = (card) => {
    if (card.isFlipped || card.isMatched || flippedCards.length === 2) return;

    const flipped = { ...card, isFlipped: true };
    setCards(prev =>
      prev.map(c => (c.id === card.id ? flipped : c))
    );
    setFlippedCards(prev => [...prev, flipped]);
  };

  return (
    <View style={styles.container}>


      <Text style={styles.title}>🧠 Jogo da Memória</Text>
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
