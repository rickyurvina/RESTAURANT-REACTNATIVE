import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { VStack, Box, Divider, Image, Text, HStack, Pressable, Center, Icon } from 'native-base';
import globalStyles from '../assets/styles/global'
import OrdersContext from '../context/orders/ordersContext'
import { useNavigation } from '@react-navigation/native'
const PlateDetail = () => {

  const { plate } = useContext(OrdersContext)
  const { name, image, description, price } = plate
  const navigation = useNavigation()

  return (
    <Box border="1" borderRadius="md" style={[globalStyles.container, styles.container]}>
      <VStack space="4" divider={<Divider />} style={[globalStyles.content]}

      >
        <Box>
          <Text fontSize="xl" style={globalStyles.title}>{name}</Text>
        </Box>
        <Box px="4">
          <Image source={{ uri: image }} alt={name} size="xl" style={globalStyles.image} />
          <Text>{description}</Text>
          <Text fontSize="md" style={globalStyles.cant}>Price: ${price}</Text>
        </Box>
      </VStack>

      <HStack bg="gray.400" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable
          cursor="pointer"
          py="3"
          flex={1}
          style={globalStyles.button}
          onPress={() => navigation.navigate('FormPlate')}
        >
          <Center>
            <Text color="white" fontSize="12" style={globalStyles.buttonText}>
              Order Plate
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  )
}

export default PlateDetail

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  content: {
    backgroundColor: '#9C9C9C',
  }
})