import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import AdCarousal from '../organisms/AdCarousal';
import Categories from '../organisms/Categories';

const HomeScreen = () => {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch banners
  useEffect(() => {
    fetch('https://flipkart-clone-backend-8b5e.onrender.com/api/banners')
      .then((res) => res.json())
      .then((json) => setBanners(json))
      .catch((err) => console.error('Banner fetch error:', err));
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch('https://flipkart-clone-backend-8b5e.onrender.com/api/categories')
      .then((res) => res.json())
      .then((json) => setCategories(json))
      .catch((err) => console.error('Category fetch error:', err));
  }, []);

  return (
    <ScrollView>
      <AdCarousal data={banners} />
      <Categories data={{ data: categories }} />
    </ScrollView>
  );
};

export default HomeScreen;
