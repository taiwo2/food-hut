import { View, Text, TouchableOpacity, Image, TextInput, FlatList, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useAppContext } from '~/context/appContext';
import { useNavigation } from 'expo-router';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';


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
      <Text className="text-sm text-gray-700">{item.price} €</Text>
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
      <View className="flex rounded-b-2xl bg-white px-4 py-6">
        {/* Item */}
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row">
            <Image
              source={{ uri: foundMeals.img }}
              className="w-14 h-14 mr-2"
              resizeMode="contain"
            />
            <View>
              <Text className="text-lg text-gray-800">{foundMeals.name}</Text>
              <Text className="text-base font-bold">{totalPrice} €</Text>
            </View>
          </View>

          <View className="flex flex-row justify-evenly border h-10 w-24 items-center rounded-full">
            {count > 1 ? (
              <TouchableOpacity onPress={decrementCount}>
                <Text className="text-2xl text-black">—</Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text className="text-2xl text-gray-500">—</Text>
              </View>
            )}

            <Text className="text-lg">{count}</Text>
            <TouchableOpacity onPress={incrementCount}>
              <Text className="text-2xl">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Separator */}
        <View className="border-[0.5px] border-slate-200 my-4" />

        {/* Add More */}
        <View className="flex flex-row items-center">
          <AntDesign name="pluscircle" size={24} color="#34bb78" />
          <Text className="text-[#34bb78] text-base font-semibold ml-4">Add more</Text>
        </View>

        {/* Separator */}
        <View className="border-[0.5px] border-slate-200 my-4" />

        {/* Leave Comment */}
        <View>
          <TextInput
            multiline={true}
            placeholder={'Need cutlery ? Napkins ? Other ? \nLeave a comment...'}
          />
        </View>

        {/* Separator */}
        <View className="border-[0.5px] border-slate-200 my-4" />

        {/* People also added */}
        <View>
          <Text className="text-lg font-bold mb-4">People also added</Text>
          <FlatList
            data={sauceData}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default BasketScreen;