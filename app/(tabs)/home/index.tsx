import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAppContext } from '~/context/appContext';
import { useEffect } from 'react';
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
           <Link href="/modalAddress" asChild>
            <View className={styles.header}>
              <View className={styles.addressContainer}>
                <MaterialCommunityIcons name="map-marker-outline" size={28} color="black" />
                <Text className={styles.addressText}>Your Address Here</Text>
              </View>
            </View>
            <Text className={styles.cardTitle}>All Restaurants And Stores</Text>
            </Link>
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
};

export default HomeScreen;
