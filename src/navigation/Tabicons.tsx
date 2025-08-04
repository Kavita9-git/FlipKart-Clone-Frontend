import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface TabIconProps {
  focused: boolean;
  size: number;
  color: string;
}

export const HomeIcon: React.FC<TabIconProps> = ({ focused, size, color }) => (
  <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
);

export const CategoriesIcon: React.FC<TabIconProps> = ({ focused, size, color }) => (
  <Ionicons name={focused ? 'grid' : 'grid-outline'} size={size} color={color} />
);

export const AccountIcon: React.FC<TabIconProps> = ({ focused, size, color }) => (
  <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
);

export const CartIcon: React.FC<TabIconProps> = ({ focused, size, color }) => (
  <MaterialCommunityIcons name={focused ? 'cart' : 'cart-outline'} size={size} color={color} />
);
