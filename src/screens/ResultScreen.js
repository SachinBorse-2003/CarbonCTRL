import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const ResultScreen = ({ route }) => {
  const { score, recommendations } = route.params;

  if (score === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Unable to calculate carbon score. Please try again.</Text>
      </View>
    );
  }

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Carbon Score: {score}</Text>

      <Text style={styles.subtitle}>Recommendations:</Text>
      <FlatList
        data={recommendations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.suggestionText}>- {item}</Text>
        )}
      />

      <Text style={styles.subtitle}>Carbon Footprint Over Time:</Text>
      <LineChart
        data={chartData}
        width={300}
        height={200}
        yAxisLabel="CO2"
        yAxisSuffix="kg"
        fromZero
        chartConfig={{
          backgroundGradientFrom: '#F9F9F9',
          backgroundGradientTo: '#F9F9F9',
          color: (opacity = 1) => `rgba(238, 114, 20, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(182, 196, 182, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#EE7214',
          },
        }}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF0E5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B6C4B6',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#99B080',
    marginTop: 10,
  },
  suggestionText: {
    fontSize: 14,
    color: '#B6C4B6',
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  chart: {
    marginTop: 10,
    borderRadius: 16,
  },
});

export default ResultScreen;
