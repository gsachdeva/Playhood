import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import Modal from 'react-native-modal';
import moment from 'moment';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
 import { useSelector, useDispatch } from 'react-redux';
  import {
  setSport,
  setArea,
  setDate,
  setTimeInterval,
  setNoOfPlayers,
} from '../components/activitySlice';

const CreateActivity = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(['Public']);
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();

  const [taggedVenue, setTaggedVenue] = useState(null);
  const { userId } = useContext(AuthContext);

 

const dispatch = useDispatch();
const { sport, area, date, timeInterval, noOfPlayers } = useSelector(
  (state) => state.activity
);
  console.log('userID', userId);
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, 'days');
      let displayDate;
      if (i === 0) {
        displayDate = 'Today';
      } else if (i === 1) {
        displayDate = 'Tomorrow';
      } else if (i === 2) {
        displayDate = 'Day after';
      } else {
        displayDate = date.format('Do MMMM');
      }
      dates.push({
        id: i.toString(),
        displayDate,
        dayOfWeek: date.format('dddd'),
        actualDate: date.format('Do MMMM'),
      });
    }
    return dates;
  };
  const dates = generateDates();

  console.log('Dates', dates);

  const selectDate = date => {
    setModalVisible(false);
    setDate(date);
  };

  console.log(route.params);


  useEffect(() => {
    if (route.params?.timeInterval) {
      dispatch(setTimeInterval(route.params.timeInterval));
    }
  }, [route.params]);

  console.log(timeInterval);


 useEffect(() => {
  if (route.params?.taggedVenue) {
    setTaggedVenue(route.params.taggedVenue);
    if (!area) setArea(route.params.taggedVenue); // Only set if area is empty
  }
}, [route.params?.taggedVenue]);

  console.log('taggedVenue', taggedVenue);
  const createGame = async () => {
    if (!sport.trim()) {
      Alert.alert('Validation Error', 'Please enter a sport');
      return;
    }
    if (!area.trim()) {
      Alert.alert('Validation Error', 'Please enter an area or venue');
      return;
    }
    if (!date) {
      Alert.alert('Validation Error', 'Please select a date');
      return;
    }
    if (!timeInterval) {
      Alert.alert('Validation Error', 'Please select a time');
      return;
    }
    if (!noOfPlayers || isNaN(noOfPlayers)) {
      Alert.alert('Validation Error', 'Please enter a valid number of players');
      return;
    }
    try {
      const admin = userId;
      const time = timeInterval;
      const gameData = {
        sport,
        area: taggedVenue ? taggedVenue : area,
        date,
        timeInterval,
        admin,
        totalPlayers: noOfPlayers,
      };
      console.log('Game Data:', gameData);

      const response = await axios.post(
        'http://localhost:8000/creategame',
        gameData,
      );
      console.log('Game created:', response.data);
      if (response.status == 200) {
        Alert.alert('Success!', 'Game created Succesfully', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
      // Handle success or navigate to another screen
    } catch (error) {
      console.error('Failed to create game:', error);
      // Handle error
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: Platform.OS === 'android' ? 35 : 0,
        }}
      >
        <ScrollView>
          <View style={{ marginHorizontal: 10 }}>
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={24}
              color="black"
            />
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
              Create Activity
            </Text>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 15,
                marginVertical: 10,
              }}
            >
              <MaterialCommunityIcons name="whistle" size={24} color="gray" />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 17, fontWeight: '500' }}>Sport</Text>
                <TextInput
                  value={sport}
                  onChangeText={(text) => dispatch(setSport(text))}
                  style={{ marginTop: 7, fontSize: 15 }}
                  placeholderTextColor="gray"
                  placeholder={'Eg Badminton / Footbal / Cricket'}
                />
              </View>
              <AntDesign name="arrowright" size={24} color="gray" />
            </Pressable>

            <Text
              style={{ borderColor: '#E0E0E0', borderWidth: 0.7, height: 1 }}
            />

            <Pressable
              onPress={() => navigation.navigate('TagVenue')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 10,
                marginVertical: 10,
              }}
            >
              <Entypo name="location" size={24} color="gray" />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 17, fontWeight: '500' }}>Area</Text>
                <TextInput
                   value={area}
                    onChangeText={(text) => dispatch(setArea(text))}

                  placeholderTextColor="gray"
                  style={{ marginTop: 7, fontSize: 15, color: 'black' }}
                  placeholder={'Locality or venue name'}
                />
              </View>
              <AntDesign name="arrowright" size={24} color="gray" />
            </Pressable>

            <Text
              style={{ borderColor: '#E0E0E0', borderWidth: 0.7, height: 1 }}
            />

            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 10,
                marginVertical: 10,
              }}
            >
              <Feather name="calendar" size={24} color="gray" />
              <Pressable style={{ flex: 1 }}>
                <Text style={{ fontSize: 17, fontWeight: '500' }}>Date</Text>
                <TextInput
                  editable={false}
                  placeholderTextColor={date ? 'black' : 'gray'}
                  style={{ marginTop: 7, fontSize: 15 }}
                  placeholder={date ? date : 'Pick a Day'}
                />
              </Pressable>
              <AntDesign name="arrowright" size={24} color="gray" />
            </Pressable>

            <Text
              style={{ borderColor: '#E0E0E0', borderWidth: 0.7, height: 1 }}
            />

            <Pressable
              onPress={() => navigation.navigate('Time')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 7,
                marginVertical: 10,
              }}
            >
              <AntDesign name="clockcircleo" size={24} color="gray" />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 17, fontWeight: '500' }}>Time</Text>
                <TextInput
                  placeholderTextColor={timeInterval ? 'black' : 'gray'}
                  style={{ marginTop: 7, fontSize: 15 }}
                  placeholder={timeInterval ? timeInterval : 'Pick Exact Time'}
                />
              </View>
              <AntDesign name="arrowright" size={24} color="gray" />
            </Pressable>

            <Text
              style={{ borderColor: '#E0E0E0', borderWidth: 0.7, height: 1 }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 7,
                marginVertical: 10,
              }}
            >
              <Feather name="activity" size={24} color="black" />

              <View>
                <Text
                  style={{ marginBottom: 10, fontSize: 15, fontWeight: '500' }}
                >
                  Activity Access
                </Text>

                <Pressable
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <Pressable
                    onPress={() => setSelected('Public')}
                    style={
                      selected.includes('Public')
                        ? {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            backgroundColor: '#07bc0c',
                            width: 140,
                            justifyContent: 'center',
                            borderRadius: 3,
                            padding: 10,
                          }
                        : {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            backgroundColor: 'white',
                            width: 140,
                            justifyContent: 'center',
                            borderRadius: 3,
                            padding: 10,
                          }
                    }
                  >
                    <Ionicons
                      name="earth"
                      size={24}
                      color={selected.includes('Public') ? 'white' : 'black'}
                    />
                    <Text
                      style={
                        selected.includes('Public')
                          ? { color: 'white', fontWeight: 'bold', fontSize: 15 }
                          : { color: 'black', fontWeight: 'bold', fontSize: 15 }
                      }
                    >
                      Public
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setSelected('invite only')}
                    style={
                      selected.includes('invite only')
                        ? {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            backgroundColor: '#07bc0c',
                            width: 140,
                            justifyContent: 'center',
                            borderRadius: 3,
                            padding: 10,
                          }
                        : {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            backgroundColor: 'white',
                            width: 140,
                            justifyContent: 'center',
                            borderRadius: 3,
                            padding: 10,
                          }
                    }
                  >
                    <AntDesign
                      name="lock1"
                      size={24}
                      color={
                        selected.includes('invite only') ? 'white' : 'black'
                      }
                    />
                    <Text
                      style={
                        selected.includes('invite only')
                          ? { color: 'white', fontWeight: 'bold', fontSize: 15 }
                          : { color: 'black', fontWeight: 'bold', fontSize: 15 }
                      }
                    >
                      Invite Only
                    </Text>
                  </Pressable>
                </Pressable>
              </View>
            </View>
            <Text
              style={{
                borderColor: '#E0E0E0',
                borderWidth: 0.7,
                height: 1,
                marginTop: 7,
              }}
            />

            <Text style={{ marginTop: 20, fontSize: 16 }}>Total Players</Text>

            <View
              style={{
                padding: 10,
                backgroundColor: '#F0F0F0',
                marginTop: 10,
                borderRadius: 6,
              }}
            >
              <View style={{ marginVertical: 5 }}>
                <View>
                  <TextInput
                    value={noOfPlayers}
                    onChangeText={(text) => dispatch(setNoOfPlayers(text))}
                    style={{
                      padding: 10,
                      backgroundColor: 'white',
                      borderColor: '#D0D0D0',
                      borderWidth: 1,
                    }}
                    placeholder="Total Players (including you)"
                  />
                </View>
              </View>
            </View>
            <Text
              style={{
                borderColor: '#E0E0E0',
                borderWidth: 0.7,
                height: 1,
                marginTop: 12,
              }}
            />

            <Text style={{ marginTop: 20, fontSize: 16 }}>
              Add Instructions
            </Text>

            <View
              style={{
                padding: 10,
                backgroundColor: '#F0F0F0',
                marginTop: 10,
                borderRadius: 6,
              }}
            >
              <View
                style={{
                  marginVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Ionicons name="bag-check" size={24} color="red" />

                <Text style={{ flex: 1, fontStyle: 15, fontWeight: '500' }}>
                  Bring your own equipment
                </Text>

                <FontAwesome name="check-square" size={24} color="green" />
              </View>

              <View
                style={{
                  marginVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <MaterialCommunityIcons
                  name="directions-fork"
                  size={24}
                  color="#FEBE10"
                />

                <Text style={{ flex: 1, fontStyle: 15, fontWeight: '500' }}>
                  Cost Shared
                </Text>

                <FontAwesome name="check-square" size={24} color="green" />
              </View>

              <View
                style={{
                  marginVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <FontAwesome5 name="syringe" size={24} color="green" />

                <Text style={{ flex: 1, fontStyle: 15, fontWeight: '500' }}>
                  Covid Vaccinated players preferred
                </Text>

                <FontAwesome name="check-square" size={24} color="green" />
              </View>

              <TextInput
                style={{
                  padding: 10,
                  backgroundColor: 'white',
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  marginVertical: 8,
                  borderRadius: 6,
                }}
                placeholder="Add Additional Instructions"
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 15,
                marginVertical: 10,
              }}
            >
              <AntDesign name="setting" size={24} color="black" />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 17, fontWeight: '500' }}>
                  Advanced Settings
                </Text>
              </View>
              <AntDesign name="arrowright" size={24} color="gray" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Pressable
        onPress={createGame}
        style={{
          backgroundColor: '#07bc0c',
          marginTop: 'auto',
          marginBottom: 30,
          padding: 12,
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
          Create Activity
        </Text>
      </Pressable>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        swipeDirection={['up', 'down']}
        style={{ justifyContent: 'flex-end', margin: 0 }} // Bottom modal style
      >
        <View
          style={{
            height: 400,
            backgroundColor: 'white',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            padding: 16,
          }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}
          >
            Choose date/ time to rehost
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
              flexWrap: 'wrap',
              marginVertical: 20,
            }}
          >
            {dates?.map((item, index) => (
              <Pressable
                key={item?.actualDate || index}
                onPress={() => selectDate(item?.actualDate)}
                style={{
                  padding: 10,
                  borderRadius: 10,
                  borderColor: '#E0E0E0',
                  borderWidth: 1,
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text>{item?.displayDate}</Text>
                <Text style={{ color: 'gray', marginTop: 8 }}>
                  {item?.dayOfWeek}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CreateActivity;

const styles = StyleSheet.create({});
