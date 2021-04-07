import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, StatusBar, Dimensions } from 'react-native';
import { Header, Button, Input, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import firebase from '../firebase';


export default function Clothes({navigation, route}) {
  const category = 'clothes';
  const[item, setItem] = useState('');
  const[clothes, setClothes] = useState([]);

  useEffect(() => {
    firebase.database().ref(category+'/').on('value', snapshot => {
      const data = snapshot.val();
      const items = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
      setClothes(items);
    });
  }, []); 

  const doneItem = (key) => {
    firebase.database().ref(category+'/'+key).update(
      { 'status': 'done' }
    );
};
const statusCheck = (status) => {
  if (status=='done') {
    return(1);
    
  }
  else {
    return(0);
  }
};

  const saveItem = () => {
    firebase.database().ref(category+'/').push(
      { 'item': item, 'status': 'undone' },
      () => {
      setItem('');
      }
    )
}

  const deleteItem = (key) => {
    firebase.database().ref(category+'/' + key).remove()
  };

   return (
    <View  style={styles.container}>
 <Text style={{fontWeight:'bold', textTransform:'uppercase'}}>{category}</Text>
       <View style={styles.listcontainer}>
  {
    clothes.map((l, i) => (
      <ListItem 
        key={i} 
        bottomDivider
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        >
        <ListItem.Content style={styles.listItem}>
          <ListItem.CheckBox checked={statusCheck(l.status)}
            onPress={()  =>  doneItem(l.key)  }/>
          <ListItem.Title>{l.item}</ListItem.Title>
          <ListItem.Subtitle>{l.status}</ListItem.Subtitle>
        </ListItem.Content>
        <Button type="clear" 
                titleStyle={{fontSize: 10, color:'#bababa'}}
                icon={{ type:"material", name: "delete", size: 20, color:'#bababa' }} 
                title="Remove"
                onPress={()  =>  deleteItem(l.key)  }/>
      </ListItem>
    ))
  }
</View>
<View style={styles.inputRow}>
   <TextInput
        style={{fontSize: 14, width: '70%', margin:10, borderBottomWidth:1, padding:5}}
        value={item}
        placeholder="More"
        onChangeText={(item) => setItem(item)}
      />
    <View style={styles.button}>
       <Button type="clear" 
        titleStyle={{fontSize: 10, color:'#bababa'}}
        icon={{ type:"material", name: "add", size: 20, color:'#bababa' }} 
        title="Add" 
        onPress={saveItem}/>
       </View>
       </View>
     <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: 'center',
  //justifyContent: 'center',
  paddingTop:20,
  backgroundColor:'#F5F5F5',
 },
 button: {
  width: '20%',
  margin:10,
  },
  listcontainer: { 
   width:'100%',
   marginTop:5,
   backgroundColor:'#546545',
 },
 inputRow: { 
  backgroundColor:'#FFFFFF',
  flexDirection: 'row',
},
listItem: { 
  //backgroundColor:'#546545',
  flexDirection: 'row',
  justifyContent: 'space-between',
},
});
