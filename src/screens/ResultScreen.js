import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const ResultScreen = ({ route }) => {
  // Get the calculated score and recommendations from the route params
  const { score, recommendations } = route.params;

  // Placeholder data for the LineChart (replace with your actual data)
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

      <View style={styles.recommendationsContainer}>
        <Text style={styles.subtitle}>Recommendations:</Text>
        <FlatList
          data={recommendations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.suggestionText}>- {item}</Text>
          )}
        />
      </View>

      <View style={styles.chartContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF0E5', // Background color
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B6C4B6', // Text color
    marginBottom: 20,
  },
  recommendationsContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  chartContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#99B080', // Text color
    marginBottom: 10,
  },
  suggestionText: {
    fontSize: 14,
    color: '#B6C4B6', // Text color
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  chart: {
    marginTop: 10,
    borderRadius: 16,
  },
});

export default ResultScreen;
