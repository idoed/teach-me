<template>
  <div class="container">
    <div class="background">
        <img src="../assets/background.svg" alt="">
    </div>
    <div class="logo">
        <img src="../assets/LOGO.svg" alt="">
    </div>
    <div class="email">
      <input v-model="email" placeholder="הכנס אימייל" />
    </div>
    <div class="password">
      <input v-model="password" type="password" placeholder="הכנס סיסמה" />
    </div>
    <div class="not-registered-message">
         עוד לא נרשמת? <span @click="goToRegistrationPage" class="regitration-button"> לחצ/י כאן</span> כדי להירשם
    </div>
    <div class="login-button" @click="login('teacher')">
        התחבר כמורה
    </div>
    <div class="login-button" @click="login('student')">
        התחבר כתלמיד
    </div>
  </div>
</template>

<script>
import { firebase } from "@firebase/app";
import "firebase/auth"
import "firebase/firestore"
import"firebase/storage";
export default {
  data() {
    return {
      email: null,
      password: null,
      error: null
    };
  },
  methods: {
    async login(userType) {
      try {
        let user =  firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        this.$store.commit('setUserId', (await user).user.uid)
             console.log((await user).user.uid)
             //check if the user has profile details on his Uid 
             //case true - Go to main student page.
             //case false- Redirect to create a profie data.
        if(userType==='student'){
          firebase.firestore().collection('Students').doc((await user).user.uid).get().then((docSnapshot) => {
            if (docSnapshot.exists) {
            //retrive the user profile image url
            this.$store.commit('setUserProfilePic',docSnapshot.data().picture);
            this.$router.push("/my-lessons");
          } 
          else {
            this.$router.push("/StudentProfile"); 
          }
        });
        }
        else{
          firebase.firestore().collection('Teachers').doc((await user).user.uid).get().then((docSnapshot) => {
            if (docSnapshot.exists) {
            //retrive the user profile image url
            this.$store.commit('setUserProfilePic',docSnapshot.data().picture);
            //will later on will be cast to Teacher Page
           this.$router.push("/my-classes");
          } 
          else {
            this.$router.push("/TeacherProfile"); 
          }
        });
        }
       
        
      } catch (err) {
        console.log(err);
      }
    },
    goToRegistrationPage(){
        this.$router.push("/register");
    }
  }
};
</script>

<style scoped>

    .container{
    direction: rtl;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-image: url("../assets/background2.svg");
    display: flex;
    flex-direction: column;
    align-items: center;
    top:0px;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    width: 100%;
    height: 100%;

    }
    .background{
      
        position: absolute;
        top:0px;
        width:100%;
        /* transform: scale(1.1); */
        
    }
    .logo{ 
         margin: 170px 0px 40px 0px;
    }
    .email{
        margin: 5px;
    }
    .password{
         margin: 5px;
    }
    .not-registered-message{
        margin: 20px 0px 140px 0px;
    }
    .regitration-button{
        color:#715EF6;
        font-weight: bold;
        cursor: pointer;
    }
    .login-button{
        cursor: pointer;
        line-height: 2rem;
        color:white;
        padding: 10px;
        margin: 5px;

        width: 300px;
        height: 30px;

        background: #715EF6;
        border-radius: 30px;
        margin: 20px 0px px 0px;
    }
    
    .regitration-button{
        color:#715EF6;
        font-weight: bold;
        cursor: pointer;
    }
    .login-button{
        cursor: pointer;
        line-height: 2rem;
        color:white;
        padding: 10px;
        margin: 5px;

        width: 300px;
        height: 30px;

        background: #715EF6;
        border-radius: 30px;
    }

</style>