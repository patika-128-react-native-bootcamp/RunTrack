import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import database from '@react-native-firebase/database';

export default function LeaderBoardScreen() {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    handleDb();
  }, []);
  function handleDb() {
    database()
      .ref('/total_data')
      .limitToLast(50)
      .orderByChild('total_meters')
      .once('value', function (snapshot) {
        let newArray = [];
        snapshot.forEach(function (childSnapshot) {
          newArray.push(childSnapshot.val());
        });
        setUserList(newArray.reverse());
      });
  }
  function renderItem(item) {
    return (
      <View>
        <Text>
          {item.item['username'] ? item.item['username'] : 'username'}-----
          {item.item['total_meters']}
        </Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList data={userList} renderItem={renderItem} />
    </View>
  );
}
