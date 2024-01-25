import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const CarbonCalculatorScreen = () => {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userResponses, setUserResponses] = useState({
    transportation: 2,
    appliances: 3,
    diet: 1,
    shopping: 2,
    energyUsage: 1,
    wasteManagement: 3,
    waterUsage: 2,
  });

  const navigation = useNavigation();

  const calculateCarbonScore = async () => {
    setLoading(true);
    const calculatedScore = calculateScoreFromResponses(userResponses);

    // Simulate storing the calculated score locally
    setScore(calculatedScore);
    setLoading(false);

    // Navigate to the ResultScreen with the calculated score and recommendations
    navigation.navigate('ResultScreen', {
      score: calculatedScore,
      recommendations: getRecommendations(),
    });
  };

  const fetchUserResponses = async () => {
    // Simulate fetching user responses from questions
    // Replace this with your actual logic to get user responses
    return userResponses;
  };

  const calculateScoreFromResponses = (responses) => {
    // Sample logic to calculate the score based on user responses
    // Replace this with your actual logic
    return Object.values(responses).reduce((total, response) => total + response, 0);
  };

  const getRecommendations = () => {
    // Sample logic to get recommendations based on the calculated score
    // Replace this with your actual logic
    const suggestions = [];
    switch (true) {
      case score <= 5:
        suggestions.push('Consider carpooling or using public transportation.');
        break;
      case score > 5 && score <= 8:
        suggestions.push('Try using energy-efficient appliances at home.');
        break;
      case score > 8 && score <= 15:
        suggestions.push('Consider reducing meat consumption for a lower carbon footprint.');
        suggestions.push('Switch to eco-friendly shopping habits.');
        break;
      // Add more cases as needed
      default:
        suggestions.push('Unable to provide specific recommendations.');
    }
    return suggestions;
  };

  const questionIcons = {
    transportation: 'car',
    appliances: 'tv',
    diet: 'cutlery',
    shopping: 'shopping-bag',
    energyUsage: 'lightbulb',
    wasteManagement: 'recycle',
    waterUsage: 'tint',
  };

  const questionTexts = {
    transportation: 'How do you usually commute?',
    appliances: 'How energy-efficient are your home appliances?',
    diet: 'How often do you include meat in your diet?',
    shopping: 'How often do you shop for new items?',
    energyUsage: 'How conscious are you about energy usage at home?',
    wasteManagement: 'How well do you manage waste?',
    waterUsage: 'How mindful are you about water usage?',
  };

  const renderQuestion = (question, icon) => (
    <View key={question} style={styles.questionContainer}>
      <Icon name={icon} size={24} color="#EE7214" />
      <Text style={styles.questionText}>{questionTexts[question]}</Text>
      <Picker
        selectedValue={userResponses[question]}
        style={styles.picker}
        onValueChange={(value) => setUserResponses({ ...userResponses, [question]: value })}
        itemStyle={{ color: '#EE7214' }}
      >
        <Picker.Item label="Low" value={1} />
        <Picker.Item label="Medium" value={2} />
        <Picker.Item label="High" value={3} />
      </Picker>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} horizontal>
      <ScrollView contentContainerStyle={styles.container} vertical>
        <Text style={styles.title}>Carbon Calculator</Text>
        {Object.keys(questionIcons).map((question) => renderQuestion(question, questionIcons[question].icon))}
        {loading ? (
          <ActivityIndicator style={styles.loading} size="large" color="#EE7214" />
        ) : (
          <View>
            <TouchableOpacity style={styles.button} onPress={calculateCarbonScore}>
              <Text style={styles.buttonText}>Calculate Carbon Score</Text>
            </TouchableOpacity>
            {score !== null && (
              <View>
                <Text style={styles.resultText}>Your Carbon Score: {score}</Text>
                <Text style={styles.recommendationText}>Recommendations:</Text>
                {getRecommendations().map((suggestion, index) => (
                  <Text key={index} style={styles.suggestionText}>
                    - {suggestion}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    backgroundColor: '#EEF0E5', // Background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B6C4B6', // Text color
    marginBottom: 20,
    alignSelf: 'center',
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    marginLeft: 20,
  },
  questionText: {
    fontSize: 18,
    color: '#99B080', // Text color
    marginLeft: 10,
    alignSelf: 'center',
  },
  picker: {
    height: 50,
    width: 150,
    color: '#99B080', // Text color
  },
  button: {
    backgroundColor: '#EE7214', // Button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EEF0E5', // Text color
  },
  loading: {
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B6C4B6', // Text color
    marginTop: 10,
    alignSelf: 'center',
  },
  recommendationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B6C4B6', // Text color
    marginTop: 10,
    alignSelf: 'center',
  },
  suggestionText: {
    fontSize: 14,
    color: '#B6C4B6', // Text color
    marginLeft: 20,
    alignSelf: 'center',
  },
});

export default CarbonCalculatorScreen;
