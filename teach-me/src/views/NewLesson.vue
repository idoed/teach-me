<template>
    <div class="container">
        <div class="background_profile">
            <div class="new-lesson">
                שיעור חדש
            </div>
            <span class="course-selection-bar">
                <select v-model="selectedFaculty" >
                    <option :value="null" disabled>בחר/י פקולטה</option>  
                    <option v-for="faculty in faculties" :key="faculty">
                        {{ faculty }}
                    </option>
                </select>
                <span class="course-selection-bar">
                    <select v-model="selectedDepartment">
                        <option :value="null" :disabled="!selectedFaculty">באיזו מחלקה?</option>
                        <option v-for="department in departments" :key="department" @click="reRender">
                            {{ department }}
                        </option>
                    </select>
                </span>
            </span>
            <div class="course-selection-bar3">
                <select v-model="selectedCourse">
                    <option :value="null" disabled>שם קורס</option>
                    <option v-for="course in courses" :key="course">
                        {{ course }}
                    </option>
                </select>
            </div>
        
            <span class="search-button" @click="searchLessons">
                <span class="search-icon">
                    <img src="../assets/search-img.svg" alt="">
                </span>
                חפש שיעור
            </span>
            <div v-if="error" class="error-message">
                יש למלא את כל השדות
            </div>
            <div class="teachers-container">
                <div v-for="teacher in teachers" :key="teacher.data().name">
                    <teacher-time-slots 
                        :name="teacher.data().userName"
                        :rating="teacher.data().rating"
                        :timeSlots="teacher.data().lessons"
                        :teacherId="teacher.id"
                        :teacherPhoneNum="teacher.data().phoneNum"
                        :teacherName="teacher.data().userName"
                        :course="selectedCourse"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { firebase } from "@firebase/app";
import TeacherTimeSlots from '../components/TeacherTimeSlots.vue';

    export default {
        components: {
            TeacherTimeSlots
        },
        data() {
            return {
                selectedFaculty: null,
                selectedDepartment: null,
                selectedCourse: null,
                teachers: [],
                error: false,
                faculties: [],
                // userId: this.$store.state.userId
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
                let departments = []
                if(this.selectedFaculty){
                    firebase.firestore().collection('פקולטה').doc(this.selectedFaculty).collection('מחלקה')
                    .get()
                    .then(querySnapshot => querySnapshot.forEach(doc => {
                        departments.push(doc.id)
                     }))
                }
                return departments;
            }
        },
        created () {
            firebase.firestore().collection('פקולטה')
            .get()
            .then(querySnapshot => querySnapshot.forEach(doc => {
                this.faculties.push(doc.id)
            }))
        },
        methods: {
            searchLessons() {
                this.error = false;
                this.teachers = []
                if (!this.selectedFaculty || !this.selectedDepartment || !this.selectedCourse)
                    this.error = true;
                else {
                     firebase.firestore()
                     .collection('Teachers')
                     .where('teaching','array-contains',this.selectedCourse)
                     .get()
                     .then(querySnapshot => 
                        querySnapshot.forEach(doc => {
                            this.teachers.push(doc);       
                        }))
                }
            },
            reRender() {
                this.$forceUpdate()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        direction: rtl;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .new-lesson{
        cursor: pointer;
        color: #D4CEFF;
        margin: 110px 0px 30px 0px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px;

        width: 328px;
        height: 36px;
        left: 16px;
        top: 110px;
        background:#715EF6 ;
        border-radius: 8px;
        font-weight: bold;
    
    }

    .course-selection-bar{
     margin:20px;
    }

    .search-button{
        margin-top: 25px;
        cursor: pointer;
        background-color: green;
        color: white;
        width: 200px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width:200px;
        padding: 12px;
        border-radius: 30px;
        font-size:1.2rem;   
    }
  
   .search-icon{
        height: 17px;
        width: 25px;
        margin:5px;
    }

    .error-message {
        color: red;
        font-weight: bold;
    }

</style>