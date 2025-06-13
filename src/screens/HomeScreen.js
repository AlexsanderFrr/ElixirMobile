import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../components/HomeScreen/Header';
import Categories from '../../components/HomeScreen/Categories';
import RecommendedSection from '../../components/HomeScreen/RecommendedSection';

export default function HomeScreen() {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    };

    fetchToken();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Categories />
      {userToken && <RecommendedSection userToken={userToken} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4DEAA',
  },
});
