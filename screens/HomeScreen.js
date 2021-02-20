import React, {useState, useEffect} from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import '../App'
import { Input, Button, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function homeScreen(props) {

  const [pseudo, setPseudo] = useState('');
  const [pseudoAdd, setPseudoAdd] = useState(false);
   console.log(pseudoAdd)

  useEffect(() => {
    AsyncStorage.getItem('pseudo', (error, value) => {        
      if(value){
        console.log('valeur', value);
        setPseudo(value)
        setPseudoAdd(true)
      } 
        
      
      
    });
    
  }, []);

 


    
 var changeAffich;
if(pseudoAdd === true){
   changeAffich = ( <Text h3 style={{marginBottom: 25, color: '#ffffff'}} >Welcome Back {pseudo}</Text> );

} else {
  
   changeAffich = ( <Input
     containerStyle = {{marginBottom: 25, width: '70%'}}
     inputStyle={{marginLeft: 10}}
      placeholder='Doe'
     leftIcon={
       <Icon
       name='user'
       size={24}
       color="#eb4d4b"
       />
    } 
   onChangeText={(e) => setPseudo(e)}
   /> );
  
}



  




  return (
    <ImageBackground source={require('../assets/home.jpg')} style={styles.container}>

      {changeAffich}
     

    <Button
       icon={
          <Icon
            name="arrow-right"
            size={20}
            color="#eb4d4b"
          />
        }

      title="Go to Map"
      type="solid"
      onPress={() => {props.onSubmitPseudo(pseudo); AsyncStorage.setItem("pseudo", pseudo); props.navigation.navigate('BottomNavigator', { screen: 'Map' }); setPseudoAdd(true)}}

    />

  </ImageBackground>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitPseudo: function(pseudo) {
        dispatch( {type: 'savePseudo', pseudo: pseudo} )
    }
  }
 }

 export default connect(
  null,
  mapDispatchToProps
)(homeScreen);