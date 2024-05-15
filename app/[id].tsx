import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

import { dummyRestaurantsData } from '~/assets/data/restaurantsData';
import RestaurantDetails from '~/app/restaurantDetails';

const RestaurantDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  //console.log(id)

  const post = dummyRestaurantsData.find((r) => r.id === id);

  if (!post) {
    return <Text>Not Found</Text>;
  }

  return <RestaurantDetails post={post} />;
};

export default RestaurantDetailsScreen;
