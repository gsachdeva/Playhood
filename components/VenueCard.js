import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const VenueCard = ({ item }) => {
  const allPrices = item.sportsAvailable.map(sport => sport.price);
  const minPrice = Math.min(...allPrices);
    const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <Pressable onPress={() => navigation.navigate('VenueInfoScreen', { item })}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View
          style={{
            flexDirection: 'row',   
            alignItems: 'left',
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.name}>
            {item.name.length > 35 ? item.name.slice(0, 35) + '...' : item.name}
          </Text>
          <View
            style={{
              marginLeft: 'auto',
              flexDirection: 'row',
              alignItems: 'center',
              color: 'green',
              padding: 5,
              borderRadius: 5,
              backgroundColor: 'green',
            }}
          >
            <AntDesign name="star" size={20} color="white"></AntDesign>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              {item.rating}
            </Text>
          </View>
        </View>
        <Text style={styles.address}>{item.address}</Text>
        <View style={{height:1,backgroundColor:'gray',width:'auto',margin:10}}></View>
        <View style={{ flexDirection: 'row', gap: 5 ,justifyContent: 'space-between', alignItems: 'center'}}>
            <Text
                style={{
                paddingLeft: 10,
                paddingRight: 10,
                color: '#666',
                fontSize: 13
                }}
            >
             <Text style={{ marginTop: 6, color: 'green' }}>Starting at ₹{minPrice}</Text>
          
            </Text>
            <Text
                style={{
                paddingLeft: 10,
                paddingRight: 10,
                color: '#666',
                fontSize: 13
                }}
            >
                {item.timings}
            </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15
  },
  address: {
    color: '#666',
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
});

export default VenueCard;
