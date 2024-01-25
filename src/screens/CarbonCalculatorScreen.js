import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
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

  const calculateCarbonScore = () => {
    setLoading(true);
    const calculatedScore = calculateScoreFromResponses(userResponses);

    setScore(calculatedScore);
    setLoading(false);

    navigation.navigate('ResultScreen', {
      score: calculatedScore,
      recommendations: getRecommendations(),
    });
  };

  const calculateScoreFromResponses = (responses) => {
    return Object.values(responses).reduce((total, response) => total + response, 0);
  };

  const getRecommendations = () => {
    if (score === null) {
      return ['Unable to provide specific recommendations.'];
    }

    const suggestions = [];
    // Customize recommendations based on user responses
    if (userResponses.appliances === 1) {
      suggestions.push('Consider upgrading to energy-efficient appliances for a greener home.');
    }
    if (userResponses.diet === 3) {
      suggestions.push('Great job on maintaining a low meat diet! Continue making sustainable choices.');
    }
    if (userResponses.transportation === 1) {
      suggestions.push('Using public transportation or carpooling is an excellent eco-friendly choice.');
    }
    switch (true) {
      case score <= 5:
        suggestions.push('Consider carpooling or using public transportation to reduce your carbon footprint.');
        break;
      case score > 5 && score <= 8:
        suggestions.push('Try using energy-efficient appliances at home to save energy.');
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
    transportation: 'How often do you usually commute?',
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
      {question !== 'energyUsage' ? ( // Check if it's not the energyUsage question
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
      ) : (
        <Text style={styles.questionText}>No Picker for this question</Text>
      )}
    </View>
  );
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ImageBackground
        source={require('./background-image.jpg')} // Replace with your background image
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Carbon Calculator</Text>
          {Object.keys(questionIcons).map((question) => renderQuestion(question, questionIcons[question]))}
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
      </ImageBackground>
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
    backgroundColor: 'transparent', // Make background transparent
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    backgroundColor: 'rgba(255, 255, 255, 1)', // Adjust opacity as needed
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
    color: 'black', // Text color
    marginLeft: 10,
    alignSelf: 'center',
  },
  picker: {
    height: 50,
    width: 150,
    color: '#EE7214', // Text color
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
