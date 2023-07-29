import { StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import globalStyles from '../assets/styles/global'
import { useNavigation } from '@react-navigation/native'
import OrdersContext from '../context/orders/ordersContext'
import firebase from '../firebase'
import { ref, onValue, query, orderByKey, equalTo, orderByChild, set } from "firebase/database";
import { Box, AspectRatio, Image, Center, Stack, Heading, HStack, Text, View, Pressable } from 'native-base';
import { CountdownCircleTimer, useCountdown } from 'react-native-countdown-circle-timer'

const OrderProgress = () => {

  const [time, setTime] = useState(0)
  const [completed, setCompleted] = useState(false)
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown({ isPlaying: true, duration: time, colors: '#abc' })

  const { idOrder } = useContext(OrdersContext)
  const navigation = useNavigation()
  const db = firebase.db

  useEffect(() => {
    const getProduct = () => {
      const ordersRef = ref(db, 'orders/');
      const statusToFilter = idOrder;

      const filteredOrdersQuery = query(ordersRef, orderByChild('id'), equalTo(statusToFilter));

      onValue(filteredOrdersQuery, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const orderArray = Object.values(data);
          setTime(orderArray[0].time)
          const status = orderArray[0].status
          console.log({ status })
          if (status === 'completed') {
            setCompleted(true)
          } else {
            setCompleted(false)
          }
        } else {
          console.log('No se encontraron pedidos pendientes.');
        }
      });
    }
    getProduct()
  }, [])

  const startNewOrder = () => {
    navigation.navigate('NewOrder')
  }

  return (
    <>
      {completed ? (
        <>
          <Box alignItems="center" flex={1}>
            <Box maxW="98%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700"
            }} _web={{
              shadow: 2,
              borderWidth: 0
            }} _light={{
              backgroundColor: "gray.50"
            }}>
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image source={{
                    uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                  }} alt="image" />
                </AspectRatio>
                <Center bg="violet.500" _dark={{
                  bg: "violet.400"
                }} _text={{
                  color: "warmGray.50",
                  fontWeight: "700",
                  fontSize: "xs"
                }} position="absolute" bottom="0" px="3" py="1.5">
                  OLESPANA
                </Center>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    YOUR ORDER IS COMPLETED
                  </Heading>
                  <Text fontSize="xs" _light={{
                    color: "violet.500"
                  }} _dark={{
                    color: "violet.400"
                  }} fontWeight="500" ml="-0.5" mt="-1">
                    Please pick up in the restaurant your order
                  </Text>
                </Stack>
                <Text fontWeight="400">
                  Enjoy your meal!
                </Text>
              </Stack>
            </Box>

          </Box>
          <Box safeAreaTop width="100%" alignSelf="center">
            <HStack bg="#FFDA00" alignItems="center" safeAreaBottom shadow={6} h={10}>
              <Pressable
                cursor="pointer"
                style={globalStyles.buttonText}
                py="2" flex={1}
                onPress={() => navigation.navigate("Menu")}
              >
                <Center>
                  <Text style={globalStyles.buttonText} fontSize="12">
                    Start new order
                  </Text>
                </Center>
              </Pressable>
            </HStack>
          </Box>
        </>

      ) : (
        <Box alignItems="center" flex={1}>
          <Box maxW="98%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
          }} _web={{
            shadow: 2,
            borderWidth: 0
          }} _light={{
            backgroundColor: "gray.50"
          }}>
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image source={{
                  uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                }} alt="image" />
              </AspectRatio>
              <Center bg="violet.500" _dark={{
                bg: "violet.400"
              }} _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs"
              }} position="absolute" bottom="0" px="3" py="1.5">
                OLESPANA
              </Center>
            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  YOUR ORDER IS ON THE WAY
                </Heading>
                <Text fontSize="xs" _light={{
                  color: "violet.500"
                }} _dark={{
                  color: "violet.400"
                }} fontWeight="500" ml="-0.5" mt="-1">
                  Please wait for the confirmation
                </Text>
              </Stack>
              <Text fontWeight="400">
                We are preparing your order and will send you a confirmation email when it is ready to pick up.
              </Text>
              <HStack alignItems="center" space={4} justifyContent="space-between">
                <HStack alignItems="center">
                  <Text color="coolGray.600" _dark={{
                    color: "warmGray.200"
                  }} fontWeight="400">
                    Your order will be ready in {time} minutes

                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>
          <Box>
            <CountdownCircleTimer
              isPlaying
              duration={time * 60}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => {
                return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
              }}
            >
              {({ time }) => <Text>{time}</Text>}
            </CountdownCircleTimer>
          </Box>
        </Box>
      )}
    </>
  )
}

export default OrderProgress

const styles = StyleSheet.create({})