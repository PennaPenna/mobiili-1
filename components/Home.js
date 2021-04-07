import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, StatusBar, Dimensions, FlatList } from 'react-native';
//import firebase from './firebase';


export default function Home({navigation}) {
 
   return (
    <View  style={styles.container}>
 <Text style={{fontWeight:'bold'}}>SHOPPING LIST</Text>
     <Button title="clothes" onPress={() => navigation.navigate('Clothes')}/>
     <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop:80,
  backgroundColor:'#F5F5F5',
 },
 listcontainer: { 
  flexDirection:'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop:5,
},
});
