import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import MarqueeText from 'react-native-marquee';
import { slipData } from '@utils/db';
import { Icon } from 'react-native-elements';

const FlimSlip = () => {
  return (
    <View style={styles.container}>
      <MarqueeText
        style={styles.gridContainer}
        duration={14000}
        loop
        marqueeOnStart
        useNativeDriver
      >
        {slipData?.map((item, index) => (
          <View key={index} style={styles.gridItem}>
            <Text style={styles.gridText}>{item}</Text>
            <Icon
              name="star-four-points"
              type="material-community"
              color="#888"
              size={16}
              containerStyle={{ marginLeft: 6 }}
            />
          </View>
        ))}
      </MarqueeText>
    </View>
  );
};

export default FlimSlip;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  gridText: {
    fontSize: RFValue(12),
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
});
