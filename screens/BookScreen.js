import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { data } from '../jsonfiles/venuedata';
import VenueCard from '../components/VenueCard';

const BookScreen = () => {
  const [topsection, setTopSection] = React.useState('');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#ffffff',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: 10,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text
              style={{ color: '#000000', fontSize: '15', fontWeight: 'bold' }}
            >
              Mohali
            </Text>
            <Ionicons name="chevron-down" size={16} color="#000000" />
          </View>
          <View style={{ marginRight: 5, flexDirection: 'row', gap: 5 }}>
            <Ionicons name="chatbox-outline" size={24} color="#000000" />
            <Ionicons name="notifications-outline" size={24} color="#000000" />
            <Pressable>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png',
                }}
                style={{ width: 24, height: 24, borderRadius: 15 }}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.container}>
          <TextInput
            placeholder="Search for venues"
            style={styles.input}
            placeholderTextColor="#888"
          />
          <Ionicons
            name="search"
            size={20}
            color="#888888"
            style={styles.icon}
          />
        </View>

        <View
          style={{
            marginVertical: 15,
            paddingHorizontal: 10,
            paddingBottom: 7,
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              onPress={() => setTopSection('Sports & Availability')}
              style={{
                padding: 10,
                marginRight: 10,
                borderWidth: 1, // 🔥 This sets the border width
                backgroundColor: 'transparent', // 🔥 This sets the background color
                borderRadius: 8,
                borderColor: 'lightgray',
              }}
            >
              <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>
                Badminton
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setTopSection('Favorites')}
              style={{
                padding: 10,
                borderWidth: 1,
                marginRight: 10,
                backgroundColor: 'transparent',
                borderRadius: 8,
                borderColor: 'lightgray',
              }}
            >
              <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>
                Favorites
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setTopSection('Offers')}
              style={{
                padding: 10,
                borderWidth: 1,
                marginRight: 10,
                backgroundColor: 'transparent', // 🔥 Conditional background color
                borderRadius: 8,
                borderColor: 'lightgray',
              }}
            >
              <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>
                Cycling
              </Text>
            </Pressable>
          </ScrollView>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => <VenueCard item={item} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '90%',
    height: 45,
    margin: 10,
    alignSelf: 'center',
  },
  input: {
    height: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 40, // enough space for icon
    fontSize: 16,
    color: '#000',
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -10 }], // center vertically (20px icon)
  },
});

export default BookScreen;
