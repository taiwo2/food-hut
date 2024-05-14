import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [streetName, setStreetName] = useState('');

  const setStreet = (street) => {
    setStreetName(street);
  };



  return (
    <AppContext.Provider
      value={{
        streetName,
        setStreet,
        totalPrice,
        setTotalPrice,
        restaurantById,
        setRestaurantById,
        meals,
        setMeals,
        foundMeals,
        setFoundMeals,
        count,
        setCount,
        setFoodData,
        coordinates,
        setCoordinates: setCoordinatesData,
      }}>
      {children}
    </AppContext.Provider>
  );
};