// App.js
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Header from '../../components/HomeScreen/Header';

import Categories from '../../components/HomeScreen/Categories';
import RecommendedSection from '../../components/HomeScreen/RecommendedSection';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Categories />
      <RecommendedSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4DEAA',
  },
});
