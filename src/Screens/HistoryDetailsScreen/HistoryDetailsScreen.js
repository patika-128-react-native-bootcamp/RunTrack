import React from 'react';
import {View, Text} from 'react-native';
import MapComponent from '../../components/Map/MapComponent';
import styles from './HistoryDetailsScreen.styles';

export default function HistoryDetailsScreen({route}) {
  const dbValue = route.params;
  let historyDetails =
    dbValue.detail.item[1][Object.keys(dbValue.detail.item[1])[0]];
  return (
    <View style={styles.container}>
      <MapComponent
        initCoords={historyDetails.posHistory[0]}
        location={
          historyDetails.posHistory[historyDetails.posHistory.length - 1]
        }
        posHistory={historyDetails.posHistory}
      />

      <Text style={styles.text}>DENEME</Text>
    </View>
  );
}
