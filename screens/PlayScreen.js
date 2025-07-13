import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PlayScreen = () => {
  const [option, setOption] = useState('My Sports');
  const [sports, setSports] = useState('Badminton');
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#ffffff',
      }}
    >
      <View
        style={{
          backgroundColor: '#223536',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={{ color: '#ffffff', fontSize: 17 }}>Mohali</Text>
            <Ionicons name="chevron-down" size={18} color="white" />
          </View>
          <View style={{ marginRight: 10, flexDirection: 'row', gap: 10 }}>
            <Ionicons name="chatbox-outline" size={24} color="white" />
            <Ionicons name="notifications-outline" size={24} color="white" />
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginLeft: 10,
            marginTop: 5,
          }}
        >
          <Pressable onPress={() => setOption('Calendar')}>
            <Text
              style={{
                color: option === 'Calendar' ? '#12e04c' : '#ffffff',
                fontSize: 14,
                fontWeight: 'bold',
              }}
            >
              Calendar
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption('My Sports')}>
            <Text
              style={{
                color: option === 'My Sports' ? '#12e04c' : '#ffffff',
                fontSize: 14,
                fontWeight: 'bold',
              }}
            >
              My Sports
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption('Other Sports')}>
            <Text
              style={{
                color: option === 'Other Sports' ? '#12e04c' : '#ffffff',
                fontSize: 14,
                fontWeight: 'bold',
              }}
            >
              Other Sports
            </Text>
          </Pressable>
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
              onPress={() => setSports('Badminton')}
              style={{
                padding: 10,
                borderWidth: sports == 'Badminton' ? 0 : 1, // 🔥 This makes the border visible
                marginRight: 10,
                backgroundColor:
                  sports == 'Badminton' ? '#1dbf22' : 'transparent', // 🔥 This sets the background color
                borderRadius: 8,
                borderColor: 'white',
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 15 }}>
                Badminton
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSports('Cricket')}
              style={{
                padding: 10,
                borderWidth: sports == 'Cricket' ? 0 : 1, // 🔥 Conditional border width
                marginRight: 10,
                backgroundColor:
                  sports == 'Cricket' ? '#1dbf22' : 'transparent', // 🔥 Conditional background color
                borderRadius: 8,
                borderColor: 'white',
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 15 }}>
                Cricket
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSports('Cycling')}
              style={{
                padding: 10,
                borderWidth: sports == 'Cycling' ? 0 : 1,
                marginRight: 10,
                backgroundColor:
                  sports == 'Cycling' ? '#1dbf22' : 'transparent', // 🔥 Conditional background color
                borderRadius: 8,
                borderColor: 'white',
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 15 }}>
                Cycling
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSports('Running')}
              style={{
                padding: 10,
                borderWidth: sports == 'Running' ? 0 : 1,
                marginRight: 10,
                backgroundColor:
                  sports == 'Running' ? '#1dbf22' : 'transparent', // 🔥 Conditional background color
                borderRadius: 8,
                borderColor: 'white',
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 15 }}>
                Running
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Pressable onPress={() => navigation.navigate("Create")}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000000' }}>
            Create Game
          </Text>
        </Pressable>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Pressable>
            <Text
              style={{ fontSize: 14, fontWeight: 'bold', color: '#000000' }}
            >
              Filter
            </Text>
          </Pressable>
          <Pressable>
            <Text
              style={{ fontSize: 14, color: '#000000', fontWeight: 'bold' }}
            >
              Sort
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({});
