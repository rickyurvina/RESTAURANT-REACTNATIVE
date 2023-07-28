import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Container, Button, Text } from "native-base";
import globalStyles from '../assets/styles/global';
import { useNavigation } from '@react-navigation/native';

const NewOrder = () => {

  const navigation = useNavigation();
  return (
    <Container style={globalStyles.container}>
      <View style={[globalStyles.content, styles.content]}>
        <Button
          style={[globalStyles.button, styles.button]}
          borderRadius={20}
          block={true}
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={globalStyles.buttonText}>New Order</Text>
        </Button>
      </View>
    </Container>
  )
}

export default NewOrder

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

})