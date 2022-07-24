let firebaseConfig = {
  apiKey: 'AIzaSyBpGHwMSmTEU2Tp7kM_w9AUdOW2qqYZPRw',
  authDomain: 'matchune.firebaseapp.com',
  projectId: 'matchune',
  storageBucket: 'matchune.appspot.com',
  messagingSenderId: '730438131439',
  appId: '1:730438131439:web:b95aa02cd364125a9a451a',
};
export const environment = {
  firebase: {
    projectId: 'matchune',
    appId: '1:730438131439:web:b95aa02cd364125a9a451a',
    storageBucket: 'matchune.appspot.com',
    apiKey: 'AIzaSyBpGHwMSmTEU2Tp7kM_w9AUdOW2qqYZPRw',
    authDomain: 'matchune.firebaseapp.com',
    messagingSenderId: '730438131439',
  },
  production: false,
  firebaseConfig,
  BASEURL: 'http://localhost:5001/matchune/us-central1/app',
};

export { firebaseConfig };
