import { initializeApp } from 'firebase/app'
import firebaseConfig from './config'
import { getDatabase } from "firebase/database";

class Firebase {
    constructor() {
        const app = initializeApp(firebaseConfig)
        this.db = getDatabase(app.firebase);
    }
}

const firebase = new Firebase();
export default firebase;