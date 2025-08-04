import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/reduxHook';
import { getCategories } from './api/action';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { FONTS } from '@utils/Constants';
import { navigate } from '@navigation/NavigationUtil';

const Categories: FC = () => {
  const dispatch = useAppDispatch();

  // Safe fallback to avoid runtime crash
  const categoriesState = useAppSelector((state) => state.categories); // not state.categoriesReducer
  const { data = [], loading, error } = useAppSelector((state) => state.categories);

  console.log("data :", data);
  console.log("categoriesState :", categoriesState);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categories = data?.data?.categories || [];



  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <SafeAreaView />
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>Explore our wide range of categories</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="small" color="black" />
      ) : error !== null ? (
        <Text style={styles.errorText}>Failed to load categories.</Text>
      ) : (
        <FlatList
          data={categories}
          numColumns={2}
          keyExtractor={(item) => item?.id?.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity  style={styles.itemContainer}
            onPress={() => navigate('Products',{
              id: item._id,
              name: item.name
            })}
              accessibilityRole="button"
              
            >
              <Image source={{ uri: item?.image_uri }} style={styles.image} />
              <Text style={styles.name}>{item?.name}</Text>
            </TouchableOpacity>
          )}
          ListFooterComponent={<>
          {error &&
            <Text style={styles.subtitle}>There was an error</Text>
          }
          </>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        />


      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F9EC',
  },
  contentContainer: {
    padding: 10,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: RFValue(18),
    fontFamily: FONTS.heading,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: RFValue(13),
    color: '#666',
    marginTop: 5,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 8,
  },
  name: {
    fontSize: RFValue(12),
    fontWeight: '500',
    color: '#333',
  },
});

export default Categories;
