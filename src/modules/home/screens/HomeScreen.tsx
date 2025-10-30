import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import AdCarousal from '../organisms/AdCarousal';
import Categories from '../organisms/Categories';

const HomeScreen = () => {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);

  // 🟢 Fetch banners
  useEffect(() => {
    fetch('https://flipkart-clone-backend-8b5e.onrender.com/api/banners')
      .then((res) => res.json())
      .then((data) => setBanners(data))
      .catch((err) => console.error('Banner fetch error:', err));
  }, []);

  // 🟢 Fetch categories
  useEffect(() => {
    fetch('https://flipkart-clone-backend-8b5e.onrender.com/category')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.categories);
        } else {
          console.error('Categories fetch failed:', data);
        }
      })
      .catch((err) => console.error('Failed to load categories:', err));
  }, []);

  return (
    <ScrollView>
      <AdCarousal data={banners} />
      <Categories data={{ data: categories }} />
    </ScrollView>
  );
};

export default HomeScreen;
