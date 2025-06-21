import { StyleSheet, Text, View, ScrollView, Image,TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <Text>Mohali</Text>
        </View>
      ),
      headerRight: () => (
        <HeaderRight />
      ),
    });
  });
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <View style={styles.container}>
        <FitnessGoalCard />
        <GameAvailableSection />
        <CorouselSection/>
      </View>
      
    </ScrollView>
  );
};
const HeaderRight = () => (
  <View style={{ marginRight: 10, flexDirection: 'row', gap: 10 }}>
    <Ionicons name="chatbox-outline" size={24} color="black" />
    <Ionicons name="notifications-outline" size={24} color="black" />
    <Pressable>
    <Image
      source={{
        uri: 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png',
      }}
      style={{ width: 24, height: 24, borderRadius: 15 }}
    />
    </Pressable>
  </View>
);
const FitnessGoalCard = () => (
  <View style={styles.rowContainer}>
    <Image
      source={{ uri: 'https://cdn-icons-png.flaticon.com/128/785/785116.png' }}
      style={styles.icon}
    />
    <View style={styles.columnContainer}>
      <Text style={styles.textHeading}>Set Your Weekly Fit Goal</Text>
      <Text style={styles.subText}>KEEP YOURSELF FIT</Text>
    </View>
  </View>
);
const GameAvailableSection = () => (
  <View style={styles.columnContainer}>
    <Text style={styles.textGreyBackground}>GEAR UP FOR YOUR GAME</Text>
    <View style={styles.rowContainer}>
      <Text style={styles.boldText}>Badminton Activity</Text>
      <TouchableOpacity style={styles.viewButton} onPress={() => console.log('View All')}>
        <Text style={styles.text}>View</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.greyText}>You have not games today</Text>
        <Text style={styles.underLineText}>View My Calendar</Text>
  </View>
);

const CorouselSection = () => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
  {/* Card 1 - Play */}
  <Pressable style={{ width: 180 }}>
    <View style={{ borderRadius: 10, overflow: 'hidden' }}>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=800',
        }}
        style={styles.corouselImage}
        resizeMode="cover"
      />
    </View>
    <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 10 }}>
      <Text style={{ fontWeight: 'bold' }}>Play</Text>
      <Text>Find Players and join their activities</Text>
    </View>
  </Pressable>

  {/* Card 2 - Book */}
  <Pressable style={{ width: 180 }}>
    <View style={{ borderRadius: 10, overflow: 'hidden' }}>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/2529383/pexels-photo-2529383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop&dpr=2',
        }}
        style={styles.corouselImage}
        resizeMode="cover"
      />
    </View>
    <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 10 }}>
      <Text style={{ fontWeight: 'bold' }}>Book</Text>
      <Text>Book your slots in nearby venues</Text>
    </View>
  </Pressable>
</View>

);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'left',
    height: '100%',
    alignItems: 'left',
    backgroundColor: '#F8F8F8',
    padding: 15,
  },
  rowContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  columnContainer: {
    justifyContent: 'center',
    alignItems: 'left',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10
  },
  icon: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginLeft: 10
  },
  textHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5
  },
  textGreyBackground:{
    fontSize: 12,
    color: '#000',
    backgroundColor: '#dddddd',
    paddingLeft: 10,
    width:'50%',
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    marginTop: 10
  },
  boldText: {
  fontSize: 15,
  color: '#000',
  fontWeight: 'bold',
  lineHeight: 20,
  marginTop: 4,
  marginBottom: 1
},
greyText: {
  fontSize: 13,
  color: '#666',
  fontWeight: 'normal',
  marginTop: -5
},
corouselImage: {
  width: '100%',
  height: 120,
  borderRadius: 10
},
  viewButton:{
        backgroundColor: '#ffffff',
        paddingTop: 8,
        paddingRight: 15,
        paddingBottom: 8,
        paddingLeft: 15,
        borderRadius: 5,
        marginLeft: 'auto',
        shadowColor: '#000',
        marginRight: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
  },
  underLineText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    paddingBottom: 10,
    color: '#000',
    textAlign: 'center'
  },
    corouselImage: {
    width: 180,
    height: 140,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
});
export default HomeScreen;
