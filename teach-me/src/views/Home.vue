/* eslint-disable */
<template>
  <div class="home">
    <div class="logo">TeachMe</div>
    <div class="button" @click="goToTeachersPage">מורה</div>
    <div class="button" @click="goToStudentsPage">תלמיד</div>
  </div>
</template>

<script>
export default {
  methods: {
    goToTeachersPage() {
      this.$router.push("/login-teacher");
    },
    goToStudentsPage() {
      this.$router.push("/login-student");
    }
  }
};
</script>

<style scoped>
.home{
  display:flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
.logo{
  font-weight: bold;
  font-size: 50px;
  margin: 20px;
}
.button {
  color:white;
  cursor: pointer;
  width: 100px;
  margin: 10px;
  padding: 15px;
  background-color: blueviolet;
  border-radius: 30px;
}


</style>
