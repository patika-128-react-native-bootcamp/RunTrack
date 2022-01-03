import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {LineChart, BarChart} from 'react-native-chart-kit';
import styles from './BarChart.styles';

export default function DashboardScreen({history}) {
  return (
    <View>
      <Text>Elapsed Meters in Minutes</Text>
      <BarChart
        data={{
          labels: ['1', '2', '3', '4', '5', '6'],
          datasets: [
            {
              data: history,
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={170}
        yAxisSuffix="M"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={styles.chartConfig}
        bezier
        style={styles.spaces}
      />
    </View>
  );
}
