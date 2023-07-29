import { StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { VStack, Box, AspectRatio, Heading, Center, Stack, Text, HStack, Image, Button, Pressable } from 'native-base'
import OrdersContext from '../context/orders/ordersContext'
import { useNavigation } from '@react-navigation/native'
import globalStyles
  from '../assets/styles/global'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../firebase'
import { ref, set } from "firebase/database";
import { generateId } from '../helpers'

const OrderResume = () => {

  const {
    order,
    confirmOrderPlate,
    total,
    showTotalToPay,
    deletePlate,
    orderPlaced
  } = useContext(OrdersContext)

  const navigation = useNavigation()


  useEffect(() => {
    calculateTotal()

  }, [order])

  const calculateTotal = () => {
    let newTotal = 0
    newTotal = order.reduce((newTotal, plate) => newTotal + plate.total, 0)
    showTotalToPay(newTotal)
  }

  const confirmOrder = () => {
    Alert.alert(
      'Confirm order',
      'Are you sure you want to place this order?',
      [
        {
          text: 'Confirm',
          onPress: async () => {
            const id = generateId()

            const orderObj = {
              id: id,
              order: order,
              total: Number(total),
              status: 'pending',
              time: 0,
              created_at: Date.now()
            }
            try {
              await set(ref(firebase.db, 'orders/' + orderObj.id), orderObj);
              orderPlaced(orderObj.id)
              navigation.navigate('OrderProgress')
            } catch (error) {
              console.log(error)
            }
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    )
  }

  const confirmDelete = (id) => {
    Alert.alert(
      'Do you want to delete this plate?',
      'A deleted plate can not be recovered',
      [
        {
          text: 'Confirm',
          onPress: () => {
            deletePlate(id)
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
    <>
      <ScrollView>
        <VStack
          space={1}
          alignItems="center"
          mt={2}>
          <Text
            color="black"
            fontSize="20"
            fontWeight="bold"
            alignContent="center"
            alignItems="center">
            Summary Order
          </Text>
        </VStack>
        {order.map((plate, index) => {
          return (
            <Box alignItems="center" key={plate.id + index}>
              <Box maxW="80"
                mt={2}
                flex={1}
                flexDirection="row"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1" _dark={{
                  borderColor: "coolGray.600",
                  backgroundColor: "gray.700"
                }} _web={{
                  shadow: 2,
                  borderWidth: 0
                }} _light={{
                  backgroundColor: "gray.50"
                }}>
                <Box flex={3}>
                  <AspectRatio w="100%" ratio={16 / 16}>
                    <Image source={{
                      uri: plate.image
                    }} alt="image" />
                  </AspectRatio>

                </Box>
                <Stack flex={7} pl={2}>
                  <Stack>
                    <Text fontSize="md" _light={{
                      color: "black"
                    }} fontWeight="500">
                      {plate.name}
                    </Text>
                  </Stack>
                  <HStack alignItems="center" justifyContent="space-between" >
                    <HStack alignItems="start" flex={1} flexDirection="column">
                      <Text color="coolGray.600" _dark={{
                        color: "warmGray.200"
                      }} fontWeight="400">
                        Quantity: {plate.cant}
                      </Text>
                      <Text color="coolGray.600" _dark={{
                        color: "warmGray.200"
                      }} fontWeight="400">
                        Unit cost: ${plate.price}
                      </Text>
                    </HStack>
                  </HStack>
                </Stack>
                <Box flex={3}>
                  <Center bg="gray.500" _dark={{
                    bg: "violet.400"
                  }} _text={{
                    color: "warmGray.50",
                    fontWeight: "700",
                    fontSize: "xl"
                  }} bottom="0" px="3" py="1.5">
                    <Text color='white'>
                      ${plate.total}
                    </Text>

                  </Center>
                  <Center flex={1}>
                    <Icon
                      name="trash"
                      size={15}
                      backgroundColor="transparent"
                      color='red'
                      onPress={() => { confirmDelete(plate.id) }}
                    />
                  </Center>
                </Box>
              </Box>
            </Box>
          )
        })}
        <VStack
          space={1}
          alignItems="center"
          mt={2}>
          <Text
            color="black"
            fontSize="20"
            fontWeight="bold"
            alignContent="center"
            alignItems="center">
            Total to pay: ${total}
          </Text>
        </VStack>
      </ScrollView>
      <Box safeAreaTop width="100%" alignSelf="center">
        <HStack bg="#FFDA00" alignItems="center" safeAreaBottom shadow={6} h={10}>
          <Pressable cursor="pointer" style={globalStyles.buttonText} py="2" flex={1} onPress={() => navigation.navigate("Menu")}>
            <Center>
              <Text style={globalStyles.buttonText} fontSize="12">
                Continue Ordering
              </Text>
            </Center>
          </Pressable>
          <Pressable cursor="pointer" style={globalStyles.buttonText} py="2" flex={1} onPress={() => confirmOrder()}>
            <Center>
              <Text style={globalStyles.buttonText} fontSize="12">
                Confirm Order
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </>
  )
}

export default OrderResume

const styles = StyleSheet.create({})