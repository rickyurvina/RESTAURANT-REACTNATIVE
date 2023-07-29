import { StyleSheet, View, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import {
  VStack,
  Box,
  Text,
  HStack,
  Center,
  Pressable
} from 'native-base';
import globalStyles from '../assets/styles/global'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';
import OrdersContext from '../context/orders/ordersContext'

const FormPlate = () => {

  const { plate, confirmOrderPlate } = useContext(OrdersContext)
  const { name, image, description, price } = plate
  const navigation = useNavigation()


  const [cant, setCant] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    totalOrder()
  }, [cant])

  const decrease = () => {
    if (cant > 0) {
      setCant(cant - 1)
    }
  }

  const increase = () => {
    if (cant < 10) {
      setCant(cant + 1)
    }
  }

  const totalOrder = () => {
    setTotal(cant * price)
  }

  const confirmOrder = () => {
    Alert.alert(
      'Do you want to confirm your order?',
      'A confirmed order can no longer be modified',
      [
        {
          text: 'Confirm',
          onPress: () => {
            const order = {
              ...plate,
              cant,
              total
            }
            confirmOrderPlate(order)
            navigation.navigate('OrderResume')
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    )
  }


  return (
    <Box border="1" borderRadius="md" flex={1} width="100%" >
      <VStack
        space={1}
        alignItems="center"
        mb={4}
        mt={4}>
        <Text
          color="black"
          fontSize="20"
          fontWeight="bold"
          alignContent="center"
          alignItems="center">
          Cant
        </Text>
      </VStack>
      <HStack
        space={4}
        alignItems="flex-start"
        flex={1}
        justifyContent="space-between"
        direction="row"
        width="100%">
        <Center _text={{
          color: "white"
        }} flex={2}>
          <Icon.Button
            name="minus"
            backgroundColor="#000"
            color='#FFF'
            solid
            onPress={() => { decrease() }}
            style={{ width: 100, height: 40, textAlign: 'center' }}
          >
          </Icon.Button>
        </Center>
        <Center
          _text={{
            color: "white"
          }} flex={1} display="block">
          <Text fontSize="sm" bold>
            {cant}
          </Text>
        </Center>
        <Center _text={{
          color: "white"
        }} flex={2}>
          <Icon.Button
            name="plus"
            backgroundColor="#000"
            color='#FFF'
            solid
            onPress={() => { increase() }}
            style={{ width: 100, height: 40, textAlign: 'center' }}
          >
          </Icon.Button>
        </Center>
      </HStack>
      <VStack space={1}
        alignItems="center"
        flex={1}
        >
        <Text fontSize="2xl" bold>
          Total: ${total}
        </Text>

      </VStack>
      <HStack bg="gray.400" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable
          cursor="pointer"
          py="3"
          flex={1}
          style={globalStyles.button}
          onPress={() => confirmOrder()}
        >
          <Center>
            <Text color="white" fontSize="12" style={globalStyles.buttonText}>
              Checkout
            </Text>
          </Center>
        </Pressable>
      </HStack>
      
    </Box>
  )
}

export default FormPlate

const styles = StyleSheet.create({})