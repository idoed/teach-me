/* eslint-disable prettier/prettier */
<template>
    <div class="container">
        <div class="background_profile">
            <div class="background_profile2">
                <div v-if="!step_one_completed" class="personal_details">
                    <div class="profile-img" >
                            <img v-if="!picture" src="../../assets/profile-img.svg" alt="" />
                            <img v-else :src="picture" alt="" />
                    </div>
                    <input type="file" @change="uploadImage" src="../../assets/profile-img.svg">
                    <div class="fullName">
                        <input v-model="userName" placeholder="שם מלא" />
                    </div>
                    <div class="phoneNumber">
                        <input v-model="phoneNum" placeholder="מספר טלפון" />
                    </div>
                    <div class="about">
                        <textarea v-model="about" placeholder="כמה מילים על עצמך"/>
                    </div>
                </div>
                
                <div v-else>
                    <div class="course-selection-bar">
                        <div>
                            פקולטה      
                            <select v-model="selectedFaculty" >
                                <option v-for="faculty in faculties" :key="faculty">
                                    {{ faculty }}
                                </option>
                            </select>
                        </div>
                        <div>
                            מחלקה   
                            <select v-model="selectedDepartment" :disabled="!selectedFaculty">
                                <option v-for="department in departments" :key="department">
                                    {{ department }}
                                </option>
                                <option value="מדעי המחשב">מדעי המחשב</option>
                            </select>
                        </div>
                        <div>
                            קורס
                            <select v-model="selectedCourse" :disabled="!selectedDepartment"> 
                                <option v-for="course in courses" :key="course">
                                    {{ course }}
                                </option>
                                <option value="מבוא למדעי המחשב">מבוא למדעי המחשב</option>
                                <option value="מבוא המחשב">מבוא המחשב</option>
                            </select>
                        </div>
                        <div class="add_course_btn" @click="addCourse">הוספת קורס</div>
                        <div v-for="course in coursesTought" :key="course">
                            <span class="single-course">{{ course }}</span>
                            <span @click="removeCourse(course)">-X-</span>
                            
                        </div>
                        <!-- <datepicker v-model="picked" /> -->
                        <div class="avialiable_time">
                            <div>
                                <date-picker v-model="chosen_date" ></date-picker>
                            </div>
                            <div>
                                <vue-timepicker minute-interval="15" v-model="hour_start" placeholder="הכנס שעת התחלה" ></vue-timepicker>
                            </div>
                            <div>
                                 <vue-timepicker minute-interval="15" v-model="hour_finish" placeholder="הכנס שעת סיום" ></vue-timepicker>
                            </div>
                            <div class="add_when" @click="add_time_slot">
                                הוסף חלון שיעור  
                            </div>
                            <div v-if="dateError" class="error-message">
                                יש למלא תאריך, שעת התחלה ושעת סיום
                            </div>
                            <div v-for="time in time_slots" :key="time.start" class="time-slot">
                                <span class="slot-date">{{getDate(time.date)}}</span>
                                <span class="slot-time">{{getTime(time.startTime, time.endTime)}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div @click="toggleSteps">
                    <span v-if="step_one_completed">חזור</span>
                    <span v-else>המשך</span>
                </div>
                <div v-if="step_one_completed" class="save-button" @click="saveChanges">
                    שמור שינויים
                </div>
            </div>
        </div>
    </div>
</template>





<script >
    import { firebase } from "@firebase/app";
    import "firebase/firestore"
    import"firebase/storage";
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    // Main JS (in UMD format)
    import VueTimepicker from 'vue2-timepicker'

// CSS
    import 'vue2-timepicker/dist/VueTimepicker.css'
    export default {
        components: {
            DatePicker,VueTimepicker
        },
        data() {
            return {
                userName: null,
                phoneNum: null,
                degree: null,
                imageData: null,
                picture: null,
                selectedFaculty: null,
                selectedDepartment: null,
                selectedCourse: null,
                faculties: [],
                step_one_completed: false,
                about:'',
                coursesTought: [],
                chosen_date: null,
                picked :null,
                hour_start: null,
                hour_finish: null,
                dateError: false,
                time_slots:[],
                
            }
        },
        computed: {
            courses(){
                let courses = []
                if(this.selectedDepartment){
                    firebase.firestore().collection('פקולטה').doc(this.selectedFaculty).collection('מחלקה')
                    .doc(this.selectedDepartment).collection('קורס')
                    .get()
                    .then(querySnapshot=> querySnapshot.forEach(doc => {
                        courses.push(doc.data().name)
                    }))
                    return courses
                }
            },
            departments() {
                this.selectedCourse=null
                let departments = []
                if(this.selectedFaculty){
                    
                    firebase.firestore().collection('פקולטה').doc(this.selectedFaculty).collection('מחלקה')
                    .get()
                    .then(querySnapshot => querySnapshot.forEach(doc => {
                        departments.push(doc.id)
                     }))
                }
                console.log(departments)
                return departments;
            }
        },
        created () {
            let self = this
            firebase.firestore().collection('פקולטה')
            .get()
            .then(querySnapshot => querySnapshot.forEach(doc => {
                this.faculties.push(doc.id)
            }))
        },
        methods: {
             getDate(timeStamp) {
                 console.log(timeStamp.getTime())
                let date = timeStamp;
                return  date.getDate()+
                        "/"+(date.getMonth()+1)+
                        "/"+date.getFullYear()
            },
            getTime(start, finish) {
                return start["HH"] + ':' + start["mm"] + '-' + finish["HH"] + ':' + finish["mm"]
            },
            toggleSteps(){
                this.step_one_completed = !this.step_one_completed
            },
            async saveChanges(){
                if(this.userName && this.phoneNum){
                    let userId = this.$store.state.userId
                    this.$store.commit('setUserName',this.userName);
                    this.onUpload()  
                    console.log("User id is"+ userId)
                    //somtimes takes time for the promise to become the image Url thats why i sleep for 2000ms 
                    setTimeout(() => {  console.log("sleep!"); }, 2000);
                    firebase.firestore().collection('Teachers').doc(userId).set({    
                        userName: this.userName,
                        phoneNum: this.phoneNum,
                        picture: await this.$store.state.userProfilePic,   
                        about: this.about,
                        teaching: this.coursesTought,
                        lessons: this.time_slots,
                        requests: []

                    }).then(() => {
                        console.log("Document successfully written!");
                        console.log(this.$store.state.userProfilePic)
                        this.$router.push("/my-classes");
                    }).catch((err)=> console.log('error: ' + err))   
                }else
                console.log("else")
                
            },
            uploadImage(event){
                this.uploadValue=0;
                this.picture=this.imageData;
                this.imageData=event.target.files[0];
            },
            async onUpload(){
                this.picture=null;
            
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
            },
            addCourse() {
                if(this.coursesTought.indexOf(this.selectedCourse) < 0 && this.selectedCourse)
                    this.coursesTought.push(this.selectedCourse)
            },
            add_time_slot(){
                    this.dateError=false
                    if (!this.chosen_date || !this.hour_start || !this.hour_finish){
                        this.dateError=true
                    }
                    else{
                        this.time_slots.push({date:this.chosen_date, startTime:this.hour_start ,endTime:this.hour_finish,student:"",course:""})
                        this.chose_date = this.hour_start = this.hour_finish = null
                    }
            },
            removeCourse(course) {
                this.coursesTought.splice(this.coursesTought.indexOf(course), 1)
            },
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
    
    background-image: url("../../assets/background2.svg");
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
    margin-top: 60px;
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

/* background: #D4CEFF;
border: 4px solid #715EF6;
box-sizing: border-box;
border-radius: 100px; */

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
.single-course{
    margin: 10px;
}
.slot-date{
    margin:10px;
}
.time-slot{
    direction: ltr;
    margin:10px;
}
.error-message{
    margin: 10px;
    font-weight: bold;
    color: red
}
</style>