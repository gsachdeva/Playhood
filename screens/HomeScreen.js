import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import React, { useLayoutEffect,useContext,useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';
import data from '../api/Constants/Data';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {token,setToken } = useContext(AuthContext);
  const {userId, setUserId} = useContext(AuthContext);
  const [user, setUser] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <Text>Mohali</Text>
        </View>
      ),
      headerRight: () => <HeaderRight handleLogout={handleLogout} />,
    });
  }, [navigation]);


 useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
    console.log('user', userId);

     const fetchUser = async () => {
    try {
      console.log('userID', userId);
      const response = await axios.get(`http://localhost:8000/user/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
 

  const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    console.log('🔓 Token cleared');
    setToken(null);
    navigation.navigate('Login');
  } catch (error) {
    console.error('Failed to clear token:', error);
  }
};



  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <View style={styles.container}>
        <FitnessGoalCard />
        <GameAvailableSection />
        <CorouselSection />
        <BottomSection />
        <SpotlightSection />
      </View>
    </ScrollView>
  );
};

const HeaderRight = ({handleLogout}) => (
  <View style={{ marginRight: 10, flexDirection: 'row', gap: 10 }}>
    <Ionicons name="chatbox-outline" size={24} color="black" />
    <Ionicons name="notifications-outline" size={24} color="black" />
    <Pressable onPress={handleLogout}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png'
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
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 ,marginTop: 10}}>
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

const BottomSection = () => (
  <View style={[styles.bottomColumnContainer,{marginTop: 10,marginRight: 20}]}>
  <View style={styles.bottomRowContainer}>
    <View style={styles.iconCircle}>
    <AntDesign name="addusergroup" size={24} color="green" />
    </View>
    <View style={styles.bottomColumnContainer}>
      <Text style={[styles.boldText, { marginLeft: 10 }]}>Groups</Text>
      <Text style={[styles.subText, { marginLeft: 10 }]}>Connect, Compete and Discuss</Text>
    </View>
  </View>

  <View style={styles.bottomRowContainer}>
    <View style={styles.iconCircle2}>
     <Ionicons name="tennisball-outline" size={24} color="black" />
    </View>
    <View flexDirection="column" style={styles.bottomColumnContainer}>
      <Text style={[styles.boldText, { marginLeft: 10 }]}>Game Time Activities</Text>
      <Text style={[styles.subText, { marginLeft: 10 }]}>355 Playwood Hosted Games</Text>
    </View>
  </View>
  </View>
);

const SpotlightSection =() => (
  <View style={{padding:1}}>
  <View style={{padding:10,backgroundColor:"white",borderRadius:10}}>
  <Text style={{fontSize:16,fontWeight:"500",color:"#000",marginTop:10}}>Spotlight</Text>
</View>
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
   {data.map((item) => (
  <Pressable key={item.id} style={{ marginBottom: 10 }}>
    <Image
      source={{ uri: item.image }}
      style={styles.corouselImage}
      resizeMode="cover"
    />
    <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{item.text}</Text>
    <Text>{item.description}</Text>
  </Pressable>
))}

  </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    height: '100%',
    alignItems: 'flex-start',
    backgroundColor: '#F8F8F8',
    padding: 15,
  },
 rowContainer: {
  width: '100%',               
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  flexDirection: 'row',
  justifyContent: 'space-between', 
  alignItems: 'center',            
  marginBottom: 10,
  paddingHorizontal: 10,          
  paddingVertical: 6,             
},
  bottomRowContainer: {
  width: '100%',
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  flexDirection: 'row',
  justifyContent: 'space-between', 
  alignItems: 'center',
  marginHorizontal: 10,
  marginVertical: 10,
},
  columnContainer: {
  flex: 1,                  
  width: '100%',            
  justifyContent: 'center',
  alignItems: 'flex-start',  
  backgroundColor: '#FFFFFF',
  padding: 10,
  borderRadius: 10,
},
   bottomColumnContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10
  },
  icon: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginLeft: 10,
  },
  textHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  textGreyBackground: {
    fontSize: 12,
    color: '#000',
    backgroundColor: '#dddddd',
    paddingLeft: 10,
    width: '50%',
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  boldText: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    lineHeight: 20,
    marginTop: 4,
    marginBottom: 1,
  },
  greyText: {
    fontSize: 13,
    color: '#666',
    fontWeight: 'normal',
    marginTop: -5,
  },
  corouselImage: {
    width: 180,
    height: 140,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  viewButton: {
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
    shadowRadius: 3.84,
  },
  underLineText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    paddingBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  iconCircle: {
  width: 50,
  height: 50,
  borderRadius: 20,             
  backgroundColor: '#D4EDDA',  
  justifyContent: 'center',
  alignItems: 'center',
},
iconCircle2: {
  width: 50,
  height: 50,
  borderRadius: 20,             
  backgroundColor: 'yellow',  
  justifyContent: 'center',
  alignItems: 'center',
}
});

export default HomeScreen;