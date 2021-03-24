<template>
  <div class="page-register">
      <div class="background">
        <img src="../assets/background.svg" alt="">
      </div>
      <div class="logo">
        <img src="../assets/LOGO.svg" alt="">
      </div>
      <div class="input-fields">
          <div class="email">
            <input type="text" v-model="email" placeholder="הכנס אימייל" />
          </div>
          <div class="password">
            <input type="password" v-model="password1" placeholder="הכנס סיסמה" />
          </div>
          <div class="password2">
            <input type="password" v-model="password2" placeholder="הכנס סיסמה בשנית" />
          </div>
          <div class="error-message" v-if="passwordsMismatch">
              הסיסמאות אינן תואמות נסה שנית.
          </div>
      </div>
      <div class="sing-up-button" @click="registerAndNavigateToTeacherProfile">
          הירשם כמורה
      </div>
      <div class="sing-up-button" @click="registerAndNavigateToStudentProfile">
          הירשם כתלמיד
      </div>
</div>
</template>

<script>
import { firebase } from "@firebase/app";
import "firebase/auth"
// import auth from "../firebase"

export default {
  data() {
    return {
      email: "",
      password1: "",
      password2: "",
      error: "",
      passwordsMismatch: false
    };
  },
  methods: {
    registerAndNavigateToTeacherProfile(){
      this.register();
      if (!this.passwordsMismatch){
        this.$router.push("/teacher-profile");
      }
    },
    registerAndNavigateToStudentProfile(){
      this.register();
      if (!this.passwordsMismatch){
        this.$router.push("/student-profile");
      }
    },
    async register() {
      
      this.passwordsMismatch = false
      try {
        if(this.password1==this.password2){
          let user = firebase.auth().createUserWithEmailAndPassword(this.email,this.password1);
          console.log(user)
          this.$store.commit('setUserId', (await user).user.uid)
        }else{
          this.passwordsMismatch = true
        }
      } catch (err) {
          console.log(err);
      }
    }
  }
};
</script>

<style scoped>

    .page-register{
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
      /* background:#f7f8ed; */
        position: absolute;
        top:0px;
        width:100%;
        /* transform: scale(1.1); */

        
    }
    .logo{ 
         margin: 170px 0px 40px 0px;
    }
        .input-fields{
    /* margin-bottom: 100px; */
    /* margin: 10px 0px 140px 0px; */
  }
     .email{
        margin: 5px;
    } 

    .password{
         margin: 10px;
    }
    
   .password2{
        margin: 10px 0px 152px 0px;
    }
    .sing-up-button{
         cursor: pointer;
         line-height: 2rem;
         color:white;
         padding: 10px;
         margin: 5px ;

         width: 300px;
         height: 30px;

         background: #715EF6;
         border-radius: 30px;
         margin: 20px 0px 140px 0px;
    }
    .sing-up-button{
         cursor: pointer;
         line-height: 2rem;
         color:white;
         padding: 10px;
         margin: 5px ;

         width: 300px;
         height: 30px;

         background: #715EF6;
         border-radius: 30px;
    }

    .error-message{
      margin-top:5px;
      color:red;
      font-weight: bold;
    }
  

</style>
