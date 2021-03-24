import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { firebase } from "@firebase/app";
import "@firebase/auth"; 
import '@firebase/firestore';


const firebaseConfig = {
    apiKey: 'AIzaSyCboArlIZAPGDFTYVelvr5vx6kUpuQE4jY',
    authDomain: '',
    databaseURL: '',
    projectId: 'teach-me-494f1',
    storageBucket: 'gs://teach-me-494f1.appspot.com',
    messagingSenderId: '',
    appId: '1:793374019473:web:9d14b2fdf09a3e7a9ed430'
  }
  firebase.initializeApp(firebaseConfig);

//   // utils
// const db = firebase.default.firestore();
// const auth = firebase.default.auth();
// //The Collections that the app going to use;
// const teachersCollections = db.collection('teachers')
// const studentsCollections = db.collection('students')
// const coursesCollections = db.collection('courses')


// export {
//     db,
//     auth,
//     teachersCollections,
//     studentsCollections,
//     coursesCollections,
//   }
  
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
