import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, SafeAreaView, FlatList,TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAppContext } from '~/context/appContext';
import { useEffect } from 'react';
import { Link } from 'expo-router';
import { dummyRestaurantsData } from '~/assets/data/restaurantsData';
import MarketCard from '~/components/marketCard';

const HomeScreen = () => {
  const route = useRoute();
  const { streetName, setStreet } = useAppContext();
  
  useEffect(() => {
    const address = route.params?.address || 'Your address here';
    const streetName = address.split(',')[0].trim();
    setStreet(streetName);
  }, [route.params?.address, setStreet]);

  return (
    <SafeAreaView className={styles.container}>
      <FlatList
        data={dummyRestaurantsData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <>
           <Link href="/modalAddress" AsChild>
            <TouchableOpacity className={styles.header}>
              <View className={styles.addressContainer}>
                <MaterialCommunityIcons name="map-marker-outline" size={28} color="black" />
                <Text className={styles.addressText}>{streetName}</Text>
              </View>
            </TouchableOpacity>
            
            </Link>
            <Text className={styles.cardTitle}>All Restaurants And Stores</Text>
          </>
        )}
        renderItem={({ item }) => <MarketCard restaurantData={item} />}
      />
    </SafeAreaView>
  );
};

const styles = {
  container: 'flex-1 p-4 mt-6 bg-white',
  header: 'flex-row justify-between',
  addressContainer: 'flex-row items-center',
  addressText: 'ml-2',
  cardTitle: 'mt-4 mb-2 text-lg font-bold',
  cardContainer: 'mt-4',
  cardImage: 'w-full h-200 rounded-lg',
};

export default HomeScreen;
