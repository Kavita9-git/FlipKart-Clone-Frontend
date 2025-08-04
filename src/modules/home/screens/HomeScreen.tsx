import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import AdCarousal from '../organisms/AdCarousal';

const HomeScreen = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/admin/resources/Banner') // use your actual IP on real device
      .then((res) => res.json())
      .then((json) => {
        const parsedBanners = json.records.map((record) => ({
          _id: record.id,
          image_uri: record.params.image_uri,
          alt_text: record.params.alt_text,
        }));

        setBanners(parsedBanners);
      })
      .catch((err) => console.error('Banner fetch error:', err));
  }, []);

  return (
    <View>
      <AdCarousal data={banners} />
    </View>
  );
};

export default HomeScreen;
