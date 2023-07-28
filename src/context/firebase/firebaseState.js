import React, { useReducer } from 'react'
import FirebaseReducer from './firebaseReducer'
import FirebaseContext from './firebaseContext'
import firebase from '../../firebase'
import { GET_PRODUCTS_EXIT } from '../../types'
import { ref,  onValue } from "firebase/database";
import _ from 'lodash'

const FirebaseState = (props) => {

    const initialState = {
        menu: [],
    }

    const [state, dispatch] = useReducer(FirebaseReducer, initialState)

    const getProducts = () => {
        const plates = ref(firebase.db, 'plates/');
        onValue(plates, (snapshot) => {
            const data = snapshot.val();
            platesArray = Object.values(data);
            let platesArray= platesArray.map((plate) => {
                return{
                    id: plate.image,
                    ...plate
                }
            })

            platesArray = _.sortBy(platesArray, 'category')
            dispatch({
                type: GET_PRODUCTS_EXIT,
                payload: platesArray
            })
        })
      
    }

    return (
        <FirebaseContext.Provider value={{
            menu: state.menu,
            firebase,
            getProducts
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;