import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const VenueInfoScreen = ({route}) => {
    const { item } = route.params;
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  )
}

export default VenueInfoScreen

const styles = StyleSheet.create({})