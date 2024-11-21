import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../app/(tabs)/index';
import CreateFlashcardScreen from '../app/(tabs)/CreateFlashCardScreen';
import QuizScreen from '../app/(tabs)/explore';
import ScoresScreen from '../app/(tabs)/ScoreScreen';
import WelcomeScreen from '../app/(tabs)/WelcomeScreen';


const Stack = createStackNavigator();


const App = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Flashcard Quiz App' }} />
          <Stack.Screen name="CreateFlashcard" component={CreateFlashcardScreen} options={{ title: 'Create Flashcard' }} />
          <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz' }} />
          <Stack.Screen name="Scores" component={ScoresScreen} options={{ title: 'View Scores' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  export default App;

