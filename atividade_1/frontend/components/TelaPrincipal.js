import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserHeader from './Header';
import CameraScreen from './CameraScreen';

const PAGE_SIZE = 100;

const App = () => {
  const navigation = useNavigation();

  const [items, setItems] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`);
      const json = await res.json();

      if (json.products.length > 0) {
        setItems(prev => [...prev, ...json.products]);
        setSkip(prev => prev + PAGE_SIZE);
        if (json.products.length < PAGE_SIZE) setHasMore(false); // Chegou no final
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchItems(); // Primeira carga
  }, []);

  return (
    <View style={styles.container}>
      <UserHeader> </UserHeader>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text>{item.description}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        )}
        onEndReached={fetchItems}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="large" /> : null}
      />

      <TouchableOpacity
        className="bg-blue-600 px-6 py-3 rounded-lg"
        onPress={() => navigation.navigate('CameraScreen')}
      >
        <Text className="text-white font-bold text-lg">Abrir Câmera</Text>
      </TouchableOpacity>

    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, backgroundColor: '#f5f5f5' },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  image: { width: '100%', height: 200, borderRadius: 6, marginBottom: 10 },
  price: { fontWeight: 'bold', marginTop: 6, color: '#2b8a3e' },
});
