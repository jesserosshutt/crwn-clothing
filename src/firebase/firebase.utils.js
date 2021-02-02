import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBeToIpapA47V_7GlteqltQAp0MUCvKzMo",
    authDomain: "crwn-clothing-9b154.firebaseapp.com",
    projectId: "crwn-clothing-9b154",
    storageBucket: "crwn-clothing-9b154.appspot.com",
    messagingSenderId: "870636095215",
    appId: "1:870636095215:web:ec98b7fd5ce56bb4d77d1a",
    measurementId: "G-7BGR0RTN4P"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if (!snapShot.exists) {
      const { displayName, email } = userAuth
      const createdAt = new Date()

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }
    }

    return userRef
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ promt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase