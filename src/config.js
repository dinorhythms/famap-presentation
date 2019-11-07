export const firebase = {
  apiKey: "AIzaSyAZ71xjAl8v_Q3IU3OXRnNdPqMAzJp75wU",
    authDomain: "famap-bcb93.firebaseapp.com",
    databaseURL: "https://famap-bcb93.firebaseio.com",
    projectId: "famap-bcb93",
    storageBucket: "famap-bcb93.appspot.com",
    messagingSenderId: "46631190000"
}

export const rrfConfig = {
  userProfile: 'users', // where profiles are stored in database
  profileFactory: (user) => ({
    role: 'user',
    completedProfile: false,
  }),
  useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
}

export default { firebase, rrfConfig }
