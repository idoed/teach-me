/* eslint-disable */
<template>
  <div>
    <div class="page-healine">student login</div>
    <div>
      <label>Email </label> <input v-model="email" placeholder="הכנס אימייל" />
    </div>
    <div>
      <label>Password </label>
      <input v-model="password" placeholder="הכנס סיסמה" />
    </div>
    <div @click="login">Login</div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      email: null,
      password: null,
      error: null
    };
  },
  methods: {
    async login() {
      try {
        const val = await firebase.default
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        console.log("bruh" + val);
      } catch (err) {
        console.log("bruh1");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
