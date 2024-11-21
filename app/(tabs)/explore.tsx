import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const QuizScreen = () => {
  const navigation = useNavigation();
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    loadFlashcards();
  }, []);

  const loadFlashcards = async () => {
    try {
      const storedFlashcards = await AsyncStorage.getItem('flashcards');
      if (storedFlashcards) {
        setFlashcards(JSON.parse(storedFlashcards));
      }
    } catch (error) {
      console.error('Error loading flashcards:', error);
      Alert.alert('Error', 'Failed to load flashcards');
    }
  };

  const handleAnswer = (correct) => {
    if (correct) {
      setScore(score + 1);
    }
    nextCard();
  };

  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    try {
      const existingScores = await AsyncStorage.getItem('scores');
      const scores = existingScores ? JSON.parse(existingScores) : [];
      scores.push({ date: new Date().toISOString(), score, total: flashcards.length });
      await AsyncStorage.setItem('scores', JSON.stringify(scores));
      Alert.alert('Quiz Finished', `Your score: ${score}/${flashcards.length}`, [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    } catch (error) {
      console.error('Error saving score:', error);
      Alert.alert('Error', 'Failed to save score');
    }
  };

  if (flashcards.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No flashcards available. Create some first!</Text>
      </View>
    );
  }

  const currentCard = flashcards[currentCardIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Card {currentCardIndex + 1} of {flashcards.length}
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          {showAnswer ? currentCard.answer : currentCard.question}
        </Text>
      </View>
      {!showAnswer ? (
        <TouchableOpacity style={styles.button} onPress={() => setShowAnswer(true)}>
          <Text style={styles.buttonText}>Show Answer</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.answerButtons}>
          <TouchableOpacity style={[styles.button, styles.incorrectButton]} onPress={() => handleAnswer(false)}>
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.correctButton]} onPress={() => handleAnswer(true)}>
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  progress: {
    fontSize: 18,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  answerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  incorrectButton: {
    backgroundColor: '#FF3B30',
  },
  correctButton: {
    backgroundColor: '#34C759',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default QuizScreen;

