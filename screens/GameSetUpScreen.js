import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const GameSetUpScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log('route', route.params);
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState('');
  const { userId } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  const [venue, setVenue] = useState(null);
  const [matchFull, setMatchFull] = useState(false);
  const [venues, setVenues] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRequested, setUserRequested] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [players, setPlayers] = useState([]);
  console.log('userId', userId);
  useEffect(() => {
    console.log('Admin', route?.params?.item?.isUserAdmin);
    if (route?.params?.item?.isUserAdmin) {
      setIsAdmin(true);
    }
  }, [route?.params?.item, userId]);

  const sendJoinRequest = async gameId => {
    try {
      const response = await axios.post(
        `http://localhost:8000/games/${gameId}/request`,
        {
          userId,
          comment
        },
      );

      if (response.status == 200) {
        Alert.alert('Request Sent', 'please wait for the host to accept!', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => setModalVisible(false) },
        ]);
      }
      console.log('Request sent successfully:', response.data);
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  };

  const [requests, setRequests] = useState([]);

  const gameId = route?.params?.item?._id;
  const currentUserId = userId;


  useEffect(() => {
  if (route?.params?.item?._id) {
    console.log('🎯 Setting gameId from params:', route.params.item._id);
    fetchRequests();
  } else {
    console.warn('⚠️ gameId not found in route params');
  }
}, [route?.params?.item?._id]);


  const fetchRequests = async () => {

    try {
      console.log('Fetching requests for gameId:', gameId);
      setLoadingRequests(true);
      const response = await axios.get(
        `http://localhost:8000/games/${gameId}/requests`,
      );
      setRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoadingRequests(false);
    }
  };


  useEffect(() => {
     fetchPlayers();
  }, [gameId]);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/games/${gameId}/players`,
      );
      setPlayers(response.data);
    } catch (error) {
      console.error('Failed to fetch players:', error);
    }
  };

  useEffect(() => {
    const fetchAndFindVenue = async () => {
      try {
        const response = await axios.get('http://localhost:8000/venues');
        console.log('✅ Venues:', response.data);

        const fetchedVenues = response.data;
        setVenues(fetchedVenues);

        const area = route?.params?.item?.area;

        if (area) {
          const foundVenue = fetchedVenues.find(
            v => v?.name?.trim().toLowerCase() === area.trim().toLowerCase(),
          );
          console.log('🎯 Found venue:', foundVenue);
          setVenue(foundVenue);
        } else {
          console.warn('⚠️ Area not found in params');
        }
      } catch (error) {
        console.error('❌ Failed to fetch venues:', error);
      }
    };

    fetchAndFindVenue();
  }, [route?.params?.item?.area]);

  const [startTime, endTime] = route?.params?.item?.time
    ?.split(' - ')
    .map(time => time.trim());

  console.log('comment', route?.params?.item?.matchFull);

  const toggleMatchFullStatus = async gameId => {
    try {
      // Call the backend endpoint to toggle the matchFull status
      const response = await axios.post(
        'http://localhost:8000/toggle-match-full',
        { gameId },
      );

      if (response.status === 200) {
        // Display a success message
        Alert.alert('Success', `Match full status updated`);

        setMatchFull(!matchFull);
        // Optionally, refresh game data or update UI accordingly
      }
    } catch (error) {
      console.error('Failed to update match full status:', error);
      Alert.alert('Error', 'Failed to update match full status');
    }
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              padding: 10,
              backgroundColor: '#294461',
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color="white"
                onPress={() => navigation.goBack()}
              />

              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
              >
                <Entypo name="share" size={24} color="white" />
                <Entypo name="dots-three-vertical" size={24} color="white" />
              </View>
            </View>

            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <Text
                style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
              >
                Badminton
              </Text>

              <View
                style={{
                  padding: 7,

                  backgroundColor: 'white',
                  borderRadius: 7,
                  alignSelf: 'flex-start',
                }}
              >
                <Text>Mixed Doubles</Text>
              </View>

              <View
                style={{
                  marginLeft: 'auto',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: '500', color: 'white' }}
                >
                  Match Full
                </Text>
                <FontAwesome
                  onPress={() =>
                    toggleMatchFullStatus(route?.params?.item?._id)
                  }
                  name={
                    matchFull || route?.params?.item?.matchFull == true
                      ? 'toggle-on'
                      : 'toggle-off'
                  }
                  size={24}
                  color="white"
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 15, color: 'white', fontWeight: '600' }}>
                {route?.params?.item?.time} • {route?.params?.item?.date}
              </Text>
            </View>

            <Pressable
              onPress={() =>
                navigation.navigate('Slot', {
                  place: route?.params?.item?.area, // Pass the selected venue object
                  sports: venue?.sportsAvailable || [], // Pass the sports available at the venue
                  date: route?.params?.item?.date,
                  slot: route?.params?.item?.time,
                  startTime: startTime,
                  endTime: endTime,
                  gameId: route?.params?.item?._id,
                  bookings: venue?.bookings,
                })
              }
              style={{
                backgroundColor: '#28c752',
                paddingHorizontal: 10,
                paddingVertical: 6,
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                width: '90%',
                justifyContent: 'center',
                borderRadius: 8,
              }}
            >
              <Entypo name="location" size={24} color="white" />

              <View>
                <Text style={{ color: 'white' }}>
                  {route?.params?.item?.area}
                </Text>
              </View>
            </Pressable>
          </View>

          <View
            style={{
              marginVertical: 20,
              marginHorizontal: 15,
              backgroundColor: 'white',
              padding: 10,
              flexDirection: 'row',

              gap: 10,
            }}
          >
            <MaterialCommunityIcons
              name="directions-fork"
              size={24}
              color="#adcf17"
            />

            <View>
              <Text style={{ fontSize: 15 }}>Add Expense</Text>

              <View
                style={{
                  marginTop: 6,
                  flexDirection: 'row',

                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ width: '80%', color: 'gray' }}>
                  Start adding your expenses to split cost among players
                </Text>

                <Entypo name="chevron-small-right" size={24} color="gray" />
              </View>
            </View>
          </View>

          <View style={{ marginHorizontal: 15 }}>
            <Image
              style={{
                width: '100%',
                height: 220,
                borderRadius: 10,
                resizeMode: 'cover',
              }}
              source={{
                uri: 'https://playo.gumlet.io/OFFERS/PlayplusSpecialBadmintonOfferlzw64ucover1614258751575.png',
              }}
            />
          </View>

          <View
            style={{
              marginVertical: 20,
              marginHorizontal: 15,
              backgroundColor: 'white',
              padding: 12,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600' }}>
                Players (2)
              </Text>

              <Ionicons name="earth" size={24} color="gray" />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: '500' }}>
                ❤️ You are not covered 🙂
              </Text>

              <Text style={{ fontWeight: '500' }}>Learn More</Text>
            </View>

            <View style={{ marginVertical: 12, flexDirection: 'row', gap: 10 }}>
              <View>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                  source={{ uri: route?.params?.item?.adminUrl }}
                />
              </View>

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <Text>{route?.params?.item?.adminName}</Text>
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      backgroundColor: '#E0E0E0',
                      borderRadius: 8,
                    }}
                  >
                    <Text>HOST</Text>
                  </View>
                </View>

                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 10,
                    borderRadius: 20,
                    borderColor: 'orange',
                    borderWidth: 1,
                    alignSelf: 'flex-start',
                  }}
                >
                  <Text>INTERMEDIATE</Text>
                </View>
              </View>
            </View>

            {isAdmin ? (
              <View>
                <View
                  style={{
                    height: 1,
                    borderWidth: 0.5,
                    borderColor: '#E0E0E0',
                    marginVertical: 12,
                  }}
                />
                <Pressable
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderWidth: 1,
                      borderColor: '#E0E0E0',
                      borderRadius: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      style={{ width: 30, height: 30, resizeMode: 'contain' }}
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/343/343303.png',
                      }}
                    />
                  </View>

                  <Text style={{ fontSize: 15, fontWeight: '500', flex: 1 }}>
                    Add Co-Host
                  </Text>

                  <MaterialCommunityIcons
                    style={{ textAlign: 'center' }}
                    name="chevron-right"
                    size={24}
                    color="black"
                  />
                </Pressable>

                <View
                  style={{
                    height: 1,
                    borderWidth: 0.5,
                    borderColor: '#E0E0E0',
                    marginVertical: 12,
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Pressable>
                    <Pressable
                      style={{
                        width: 60,
                        height: 60,
                        borderWidth: 1,
                        borderColor: '#E0E0E0',
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        style={{ width: 30, height: 30, resizeMode: 'contain' }}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/128/1474/1474545.png',
                        }}
                      />
                    </Pressable>
                    <Text
                      style={{
                        marginTop: 8,
                        fontWeight: '500',
                        textAlign: 'center',
                      }}
                    >
                      Add
                    </Text>
                  </Pressable>

                  <Pressable>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('Manage', {
                          userId: userId,
                          gameId: route?.params?.item?._id,
                        })
                      }
                      style={{
                        width: 60,
                        height: 60,
                        borderWidth: 1,
                        borderColor: '#E0E0E0',
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: 'contain',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/128/7928/7928637.png',
                        }}
                      />
                    </Pressable>
                    <Text
                      style={{
                        marginTop: 8,
                        fontWeight: '500',
                        textAlign: 'center',
                      }}
                    >
                      Manage ({requests?.length})
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() =>
                      navigation.navigate('Players', {
                        players: players,
                      })
                    }
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        padding: 10,
                        borderColor: '#E0E0E0',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 12,
                      }}
                    >
                      <MaterialCommunityIcons
                        style={{ textAlign: 'center' }}
                        name="chevron-right"
                        size={24}
                        color="black"
                      />
                    </View>

                    <Text
                      style={{
                        marginBottom: 12,
                        fontWeight: '600',
                        textAlign: 'center',
                      }}
                    >
                      All Players
                    </Text>
                  </Pressable>
                </View>

                <View
                  style={{
                    height: 1,
                    borderWidth: 0.5,
                    borderColor: '#E0E0E0',
                    marginVertical: 12,
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15,
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderWidth: 1,
                      borderColor: '#E0E0E0',
                      borderRadius: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      style={{ width: 30, height: 30, resizeMode: 'contain' }}
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/1511/1511847.png',
                      }}
                    />
                  </View>

                  <View>
                    <Text>Not on Playo? Invite</Text>
                    <Text style={{ marginTop: 6, color: 'gray', width: '80%' }}>
                      Earn 100 Karma points by referring your friend
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <Pressable
                onPress={() =>
                  navigation.navigate('Players', {
                    players: players,
                  })
                }
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopColor: '#E0E0E0',
                  borderTopWidth: 1,
                  borderBottomColor: '#E0E0E0',
                  borderBottomWidth: 1,
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    padding: 10,
                    borderColor: '#E0E0E0',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 12,
                  }}
                >
                  <MaterialCommunityIcons
                    style={{ textAlign: 'center' }}
                    name="chevron-right"
                    size={24}
                    color="black"
                  />
                </View>

                <Text style={{ marginBottom: 12, fontWeight: '600' }}>
                  All Players
                </Text>
              </Pressable>
            )}
          </View>

          <View
            style={{
              marginHorizontal: 15,
              backgroundColor: 'white',
              padding: 12,
              borderRadius: 6,
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>
                Queries (0)
              </Text>

              <View style={{ marginVertical: 12 }}>
                <Text
                  style={{ color: 'gray', fontSize: 15, textAlign: 'center' }}
                >
                  There are no queries yet! Queries sent by players will be
                  shown here
                </Text>
              </View>
            </View>
          </View>

          {isAdmin ? (
            <Pressable
              style={{
                backgroundColor: '#07bc0c',
                marginTop: 'auto',
                marginBottom: 30,
                padding: 15,
                marginHorizontal: 10,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '500',
                }}
              >
                GAME CHAT
              </Text>
            </Pressable>
          ) : userRequested ? (
            <Pressable
              style={{
                backgroundColor: 'red',
                marginTop: 'auto',
                marginBottom: 30,
                padding: 15,
                marginHorizontal: 10,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '500',
                }}
              >
                CANCEL REQUEST
              </Text>
            </Pressable>
          ) : (
            <View
              style={{
                marginTop: 'auto',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                backgroundColor: '#E8E8E8',
              }}
            >
              <Pressable
                style={{
                  backgroundColor: 'white',
                  marginTop: 'auto',
                  marginBottom: 30,
                  padding: 15,
                  marginHorizontal: 10,
                  borderRadius: 4,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: '500',
                  }}
                >
                  SEND QUERY
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setModalVisible(true)}
                style={{
                  backgroundColor: '#07bc0c',
                  marginTop: 'auto',
                  marginBottom: 30,
                  padding: 15,
                  marginHorizontal: 10,
                  borderRadius: 4,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 15,
                    fontWeight: '500',
                  }}
                >
                  JOIN GAME
                </Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
        {/* route?.params?.item?.isUserAdmin == true */}
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.modalContainer}>
                <Text style={styles.title}>Join Game</Text>

                <Text style={styles.description}>
                  {route?.params?.item?.adminName} has been putting efforts to
                  organize this game. Please send the request if you are quite
                  sure to attend.
                </Text>

                <TextInput
                  value={comment}
                  onChangeText={text => setComment(text)}
                  style={styles.input}
                  placeholder="Send a message to the host along with your request!"
                  placeholderTextColor="gray"
                />

                <Pressable
                  onPress={() => sendJoinRequest(route?.params?.item?._id)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Send Request</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default GameSetUpScreen;
 const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal:-20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: { 
    
    height: screenHeight * 0.5,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
  },
  description: {
    marginTop: 15,
    fontSize: 14,
    color: 'black',
  },
  input: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    fontSize: 15,
    color: 'black',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
  },
});
