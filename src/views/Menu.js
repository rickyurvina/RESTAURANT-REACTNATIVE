import { StyleSheet, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import FirebaseContext from '../context/firebase/firebaseContext'
import OrdersContext from '../context/orders/ordersContext'
import { useNavigation } from '@react-navigation/native'

import {
  Text, FlatList,
  Box, Heading, Avatar, HStack, VStack, Spacer, Pressable
} from 'native-base'

import globalStyles from '../assets/styles/global'

const Menu = () => {

  const { menu, getProducts } = useContext(FirebaseContext)

  const { selectProduct } = useContext(OrdersContext)

  const navigation = useNavigation()

  useEffect(() => {
    getProducts()
  }, [])

  const showHeading = (category, index) => {
    if (index > 0) {
      const previousCategory = menu[index - 1].category
      if (previousCategory !== category) {
        return (
          <Heading
            style={styles.header}
          >
            <Text style={styles.headerText}>
              {category}

            </Text>
          </Heading>
        )
      }
    } else {
      return (
        <Heading
          style={styles.header}
        >
          <Text style={styles.headerText}>
            {category}

          </Text>
        </Heading>
      )
    }
  }


  return (
    <Box>
      <FlatList data={menu} renderItem={({
        item, index
      }) =>
        <Box borderBottomWidth="1" _dark={{
          borderColor: "muted.50"
        }} borderColor="muted.600" pl={["0", "4"]} pr={["0", "5"]}
        >
          {showHeading(item.category, index)}
          <Pressable onPress={() => {
            selectProduct(item);
            navigation.navigate('PlateDetail')
          }} overflow="hidden" >
            <HStack space={[3, 3]} justifyContent="space-between"
            >
              <Avatar size="90px"
                square
                source={{
                  uri: item.image
                }} />
              <VStack>
                <Text _dark={{
                  color: "warmGray.50"
                }} color="coolGray.800" bold
                  style={globalStyles.buttonText}
                >
                  {item.name}
                </Text>
                <Text color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }}>
                  {item.description}
                </Text>
                <Text color="coolGray.800" _dark={{
                  color: "warmGray.800"
                }} bold>
                  Price: ${item.price}
                </Text>
              </VStack>
              <Spacer />
            </HStack>
          </Pressable>
        </Box>
      } keyExtractor={item => item.id} />
    </Box>
  )
}

export default Menu

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',
    height: 35,
  },
  headerText: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
})