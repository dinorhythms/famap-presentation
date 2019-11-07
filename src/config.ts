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
  // profileParamsToPopulate: [
  //   { child: 'role', root: 'roles' }, // populates user's role with matching role object from roles
  // ],
  useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
  profileFactory: (user:any) => ({
    role: 'user',
    completedProfile: false,
    email: user.email || ''
  }),
  // enableLogging: false
}

export default { firebase, rrfConfig }
