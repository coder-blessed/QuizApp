import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScoresScreen = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = async () => {
    try {
      const storedScores = await AsyncStorage.getItem('scores');
      if (storedScores) {
        setScores(JSON.parse(storedScores).reverse()); // Show most recent scores first
      }
    } catch (error) {
      console.error('Error loading scores:', error);
    }
  };

  const renderScoreItem = ({ item }) => (
    <View style={styles.scoreItem}>
      <Text style={styles.scoreDate}>{new Date(item.date).toLocaleDateString()}</Text>
      <Text style={styles.scoreText}>
        {item.score}/{item.total} ({((item.score / item.total) * 100).toFixed(2)}%)
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {scores.length > 0 ? (
        <FlatList
          data={scores}
          renderItem={renderScoreItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.message}>No scores available yet. Take a quiz first!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  scoreItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreDate: {
    fontSize: 16,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ScoresScreen;

