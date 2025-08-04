
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navigation from '@navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from '@store/store';


const App = () => {
  return (
  <Provider store={store}>
  <Navigation/>
  </Provider>
  )
}

export default App

const styles = StyleSheet.create({})