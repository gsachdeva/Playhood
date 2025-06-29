import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  StatusBar,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ameneties from '../components/Ameneties'; 
import { useNavigation } from '@react-navigation/native';

const VenueInfoScreen = () => {
  const route = useRoute();
  const venue = route.params?.item; // ✅ Get the whole venue object
  const navigation = useNavigation();
  // Now you can safely extract values
  const venueName = venue?.name;
  const venueImage = venue?.image;
  const location = venue?.location; // Assuming location is a string or an object
  const rating = venue?.rating; // Assuming rating is a number

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800',
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View
          style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10 }}
        >
          <Text style={styles.title}>{venueName || 'Venue Name'}</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Ionicons
              style={{ marginLeft: 10 }}
              name="time-outline"
              size={16}
              color="#000000"
            ></Ionicons>
            <Text style={{ fontSize: 14, color: '#000000', marginLeft: 5 }}>
              {venue?.timings || '5 AM - 10 PM'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10 }}>
            <Ionicons
              name="location-outline"
              size={16}
              color="#000000"
            ></Ionicons>
            <Text style={{ fontSize: 14, color: '#000000', marginLeft: 5 }}>
              {location || 'Location not available'}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
            {[0, 0, 0, 0, 0].map((en, i) => (
              <FontAwesome
                style={{ paddingHorizontal: 3 }}
                name={i < Math.floor(rating) ? 'star' : 'star-o'}
                size={15}
                color="#FFD700"
              />
            ))}
            <Text>{rating} (9 ratings)</Text>
            <Text style={{ textAlign: 'center', marginLeft: 15 }}>
              100 total Activities{' '}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-around',
              marginRight: 10,
            }}
          >
            <Pressable
              style={{
                marginTop: 6,
                width: 160,
                borderColor: '#686868',
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}
            >
              <Text>Rate Venue</Text>
            </Pressable>

            <Pressable
              style={{
                marginTop: 6,
                width: 160,
                borderColor: '#686868',
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}
            >
              <Text>1 Upcoming</Text>
            </Pressable>
          </View>
          <View>
            <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>
              Sports Available
            </Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {venue.sportsAvailable.map((item, index) => (
              <View
                style={{
                  borderColor: '#686868',
                  margin: 10,
                  padding: 20,
                  width: 120,
                  height: 90,
                  borderWidth: 1,
                  borderRadius: 5,
                }}
              >
                <MaterialCommunityIcons
                  style={{ textAlign: 'center' }}
                  name={item.icon}
                  size={24}
                  color="gray"
                />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 10,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            ))}
          </ScrollView>
         <Ameneties />
        </View>
      </View>
        <Pressable
        onPress={() =>
          navigation.navigate('Slot', {
            place: venue.name,
            sports: venue.sportsAvailable,
            bookings:venue.bookings
          })
        }
        style={{
          backgroundColor: 'green',
          padding: 8,
          marginBottom: 30,
          borderRadius: 3,
          marginHorizontal: 15,
        }}>
        <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
          Book Now
        </Text>
      </Pressable>
    </SafeAreaView>
    
  );
};

export default VenueInfoScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#ffffff',
  },
  container: {
    paddingTop: 16,
    alignItems: 'left',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
    color: '#000000',
    textAlign: 'left',
  },
});
