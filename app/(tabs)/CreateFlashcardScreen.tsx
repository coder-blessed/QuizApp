import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  CreateFlashcard: undefined;
  Quiz: undefined;
  Scores: undefined;
};

type CreateFlashcardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateFlashcard'>;

type Props = {
  navigation: CreateFlashcardScreenNavigationProp;
};

const CreateFlashcardScreen: React.FC<Props> = ({ navigation }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const saveFlashcard = async () => {
    if (question.trim() === '' || answer.trim() === '') {
      Alert.alert('Error', 'Please enter both question and answer');
      return;
    }

    try {
      const existingFlashcards = await AsyncStorage.getItem('flashcards');
      const flashcards = existingFlashcards ? JSON.parse(existingFlashcards) : [];
      flashcards.push({ question, answer });
      await AsyncStorage.setItem('flashcards', JSON.stringify(flashcards));
      Alert.alert('Success', 'Flashcard saved successfully');
      setQuestion('');
      setAnswer('');
    } catch (error) {
      console.error('Error saving flashcard:', error);
      Alert.alert('Error', 'Failed to save flashcard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Question:</Text>
      <TextInput
        style={styles.input}
        value={question}
        onChangeText={setQuestion}
        placeholder="Enter your question"
      />
      <Text style={styles.label}>Answer:</Text>
      <TextInput
        style={styles.input}
        value={answer}
        onChangeText={setAnswer}
        placeholder="Enter the answer"
      />
      <TouchableOpacity style={styles.button} onPress={saveFlashcard}>
        <Text style={styles.buttonText}>Save Flashcard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateFlashcardScreen;

