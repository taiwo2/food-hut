import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, ScrollView } from 'react-native';

import { useAppContext } from '~/context/appContext';
import ItemsList from '~/components/ItemsList';
import Checkbox from 'expo-checkbox';


const sauceData = [
  {
    id: '1',
    imageUri:
      'https://images.bolt.eu/store/2023/2023-01-18/ceb12673-e2cb-4f24-a65d-ba900aeac3b1.jpeg',
    title: 'Garlic sauce',
    price: 0.5,
  },
  {
    id: '2',
    imageUri:
      'https://images.bolt.eu/store/2023/2023-01-18/60b40de0-f5a3-41d7-ad5c-91208b9f0ff4.jpeg',
    title: 'Barbeque sauce',
    price: 0.5,
  },
  {
    id: '3',
    imageUri:
      'https://images.bolt.eu/store/2023/2023-01-18/241c707d-d9cc-4b95-8941-47b9743b5f44.jpeg',
    title: 'Pitta sauce',
    price: 0.5,
  },
];

const renderItem = ({ item }) => (
  <View>
    <View>
      <Image
        source={{ uri: item.imageUri }}
        className="w-32 h-32 rounded-lg mr-2"
        resizeMode="contain"
      />
      <AntDesign
        name="pluscircle"
        size={34}
        color="white"
        style={{ position: 'absolute', right: 14, bottom: 6 }}
      />
    </View>

    <View>
      <Text className="text-sm text-gray-700">£{item.price}</Text>
      <Text className="text-sm text-gray-700">{item.title}</Text>
    </View>
  </View>
);

const BasketScreen = () => {
  const {
    restaurantById,
    count,
    setCount,
    totalPrice,
    setTotalPrice,
    foundMeals,
    streetName,
    coordinates,
  } = useAppContext();

  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();

  const { latitude, longitude } = coordinates || {};

  // console.log('latitdue: ', latitude);
  // console.log('longitude: ', longitude);

  useLayoutEffect(() => {
    if (restaurantById && restaurantById.name) {
      navigation.setOptions({
        headerTitle: restaurantById.name,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleTrashPress}>
            <Ionicons name="trash-outline" size={24} color="black" />
          </TouchableOpacity>
        ),
      });
    }
  }, [restaurantById]);

  const handleTrashPress = () => {
    setCount(0);
    setTotalPrice(0);
    navigation.goBack();
  };

  // Items count
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <ScrollView className="flex flex-1 bg-[#ecedef]">
      {/* Item List View */}
      <View className="flex rounded-b-2xl bg-white px-4 py-6">
      <ItemsList decrementCount={decrementCount}foundMeals={foundMeals}totalPrice={totalPrice}
      count={count} incrementCount={incrementCount} />
      </View>

      {/* Delivery or Pickup */}
      <View className="flex rounded-2xl bg-white px-4 py-6 mt-2" >
        <DeliveryOptions restaurantById={restaurantById} />
      </View>
      {/* Pricing Component */}
      <View className="flex rounded-2xl bg-white px-4 py-6 mt-2" >
      <PricingComponent totalPrice={totalPrice} />
      </View>
      {/* Map View */}
      <View className="flex rounded-2xl bg-white px-4 py-6 mt-2 flex-1">
      <MapViewComponent streetName={streetName} latitude={latitude} longitude={longitude} />
      </View>
      {/* Place Order */}
      <View className="flex rounded-2xl bg-white py-6 mt-2 flex-1">
        {/* Total */}
        <View className="flex flex-row items-center justify-between mb-2 px-4">
          <View className="flex flex-row items-center">
            <Text className="text-lg mr-1 font-bold">Total</Text>
          </View>
          <Text className="text-lg font-bold">£{totalPrice}</Text>
        </View>

        {/* Cash row */}
        <View className="flex flex-row items-center justify-between mb-2 px-4 mt-2">
          <View className="flex flex-row items-center">
            <FontAwesome5 name="money-bill-wave-alt" size={24} color="#34BB78" />
            <View className="flex flex-col ml-2">
              <Text className="text-base">Cash</Text>
              <Text className="text-base text-[#34BB78]">Change</Text>
            </View>
          </View>
          <Text className="text-base">£{totalPrice}</Text>
        </View>

        {/* Cash warning */}
        <View className="flex flex-row items-center mb-2 px-4 mt-2">
        <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#34BB78' : undefined}
          />
          <Text className="ml-2 text-base">
            <Text>Cash order</Text>
            <FontAwesome5 name="exclamation-triangle" size={18} color="#fcb001" />
            <Text>I accept that courier may not have change</Text>
            <FontAwesome5 name="exclamation-triangle" size={18} color="#fcb001" />
          </Text>
        </View>

        {/* Separator */}
        <View className="border-[0.5px] border-slate-200 my-4" />
      </View>
    </ScrollView>
  );
};

export default BasketScreen;
