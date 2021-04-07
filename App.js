import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, Image, StatusBar } from 'react-native';
import { Picker } from '@react-native-community/picker';


export default function App() {
  const apiKey='2f528c98b2bd4b826df35a6f1c97e7d1';
  const [rates, setRates] = useState([]);
  const [currency, setCurrency] = useState('unknown');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [conversion, setConversion] = useState('');
  

  const getRates = () => {
    const url = 'http://data.fixer.io/api/latest?access_key='+apiKey;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      setRates(responseJson.rates);
      console.log(rates);
   })
   .catch((error) => {
    Alert.alert('Error' , error);
  });
   return rates;
 };
 useEffect(() => {
  getRates();
}, []);

  const getConversion =  () => {
    setToAmount(Number(fromAmount)*Number(conversion).toFixed(2));
    //console.log(result)
  }

  return (
    <View  style={styles.container}>
      <Image
          style={styles.thumbnail}
          source={{uri: 'https://cdn0.iconfinder.com/data/icons/business-management-line-2/24/cash-512.png'}}
      />
<Text>{fromAmount} EUR =&gt; {toAmount} {currency}</Text>
      <TextInput
        style={{fontSize: 14, width: 150, margin:10, borderWidth:1, padding:5, backgroundColor:'white'}}
        value={fromAmount}
        placeholder="EUR"
        onChangeText={(fromAmount) => setFromAmount(fromAmount)}
      />

 <Picker
        selectedValue={currency}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => {
          if (itemIndex != 0) {
            setCurrency(itemValue)
            setConversion((Object.values(rates))[itemIndex-1])
            console.log(conversion)
          }
        }}>
          <Picker.Item style={styles.picker} label='Currency'/>
{(Object.keys(rates)).map(rate => (<Picker.Item label={rate} value={rate} key={rate} />))}
       </Picker>
    
     <Button title="Convert" onPress={getConversion} />
     <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  margin:20,
  backgroundColor:'#F5F5F5',
 },
 thumbnail: {
  width: 60,
  height: 60,
  margin:10,
 
},
picker: {
  height: 40, width: 150, marginBottom:10, backgroundColor:'white'
}
});
