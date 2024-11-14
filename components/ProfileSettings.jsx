import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
import SwitchSettings from './SwitchSettings';

const ProfileSettings = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Profile Settings</Text>
        <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 10,
              marginTop:10
            }}
          />
          <SwitchSettings/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20
    },
    heading:{
        fontSize:20
    }
  });
  

export default ProfileSettings
