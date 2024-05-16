import { View, Text, TouchableOpacity,Image, TextInput, FlatList, } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

const ItemsList = ({ foundMeals,totalPrice,count,decrementCount,incrementCount }) => {

  return (
    <>
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
              <Text className="text-base font-bold">£{totalPrice}</Text>
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
            multiline
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
    </>
  );
};

export default ItemsList;