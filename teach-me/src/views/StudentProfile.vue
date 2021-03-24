/* eslint-disable prettier/prettier */
<template>
  <div class="container">
<div class="background_profile">
        <!-- <img src="../assets/background2.svg" alt=""> -->
  <div class="background_profile2">
    <div class="profile-img" >
            <img v-if="!picture" src="../assets/profile-img.svg" alt="" />
            <img v-else :src="picture" alt="" />
    </div>
    <input type="file" @change="uploadImage" src="../assets/profile-img.svg">
    <div class="fullName">
        <input v-model="userName" placeholder="שם מלא" />
        <!-- <label class="label">שם מלא</label>
        <input v-model="userName" /> -->
    </div>
    <div class="phoneNumber">
        <input v-model="phoneNum" placeholder="מספר טלפון" />
        <!-- <label>מספר טלפון </label>
        <input class="field" v-model="phoneNum" /> -->
    </div>
    <div class="degree">
        <input v-model="degree" placeholder="בחר/י תואר" />
        <!-- <label>בחר/י תואר</label>
        <input v-model="degree" /> -->
    </div>
    <div class="save-button" @click="saveChanges">
        שמור שינויים
    </div>
  </div>
  </div>
   </div>
</template>

<script>
    import { firebase } from "@firebase/app";
    import "firebase/firestore"
    import"firebase/storage";

    export default {
        data() {
            return {
                userName: null,
                phoneNum: null,
                degree: null,
                imageData: null,
                picture: null,
            }
        },
        methods: {
            async saveChanges(){
                let userId = this.$store.state.userId
                this.$store.commit('setUserName',this.userName);
                this.onUpload()  
                console.log("User id is"+ userId)
                //somtimes takes time for the promise to become the image Url thats why i sleep for 2000ms 
                setTimeout(() => {  console.log("sleep!"); }, 2000);
                firebase.firestore().collection('Students').doc(userId).set({
                    
                    userName: this.userName,
                    phoneNum: this.phoneNum,
                    degree: this.degree,
                    picture: await this.$store.state.userProfilePic,    
                    classes:[]

                }).then(() => {
                    console.log("Document successfully written!");
                    console.log(this.$store.state.userProfilePic)
                    this.$router.push("/my-lessons");
                }).catch((err)=> console.log('error: ' + err))
  
            },
            uploadImage(event){
                this.uploadValue=0;
                this.picture=this.imageData;
                this.imageData=event.target.files[0];
            },
            async onUpload(){
                this.picture=null;
               if(this.imageData){
                  const imageRef= firebase.storage().ref().child(`images/${this.$store.state.userId}/${this.imageData.name}`)
                .put(this.imageData)
                .then(fileData => {

                    return fileData.ref.getDownloadURL()
                }).then ((imageUrl)=>{
                    this.picture=imageUrl
                    
                    console.log(imageUrl)
                    if (imageUrl){
                       this.$store.commit('setUserProfilePic',imageUrl)
                    }
                    else//random image Url 
                     this.$store.commit('setUserProfilePic', "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-library.com%2Ficon%2Fdefault-profile-icon-17.html&psig=AOvVaw1qPj9oL41xnFzeE76TgG35&ust=1615127788436000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCICe_4Lym-8CFQAAAAAdAAAAABAN")
                })
               }
               else {
               this.$store.commit('setUserProfilePic', "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-library.com%2Ficon%2Fdefault-profile-icon-17.html&psig=AOvVaw1qPj9oL41xnFzeE76TgG35&ust=1615127788436000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCICe_4Lym-8CFQAAAAAdAAAAABAN")
               }
              
        }

    }
}
</script>
    
<style> 

.container{
    direction: rtl;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.background_profile{

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

.background_profile2{
    position: absolute;
    top:25px;
    bottom: 20px;
    width: 36%;
    

background: linear-gradient(184.94deg, rgba(255, 255, 255, 0.3828) 8px, rgba(212, 206, 255, 0.5046) 94);
mix-blend-mode: normal;
border: 1px solid rgba(255, 255, 255, 0.94);
box-sizing: border-box;
backdrop-filter: blur(5px);

border-radius: 8px;
}

.profile-img{

display: flex;
flex-direction: column;
align-items: center;
margin: 120px 100px 50px 0px;
width:120px;
    
}

.fullName{
    margin: 5px;
}

.phoneNumber{
   margin: 5px; 
}

.degree{
    margin: 5px; 
}
.save-button{
    cursor: pointer;
    background-color: rgb(143, 90, 192);
    color: white
}

</style>