<template>
    <div>
        <div class="course-selection-bar">
            פקולטה
            <select v-model="selectedFaculty" >
                <option v-for="faculty in faculties" :key="faculty" >
                    {{ faculty }}
                </option>
            </select>
            מחלקה
            <select v-model="selectedDepartment">
                <option v-for="department in departments" :key="department">
                    {{ department }}
                </option>
                 <option >מדעי המחשב</option>
            </select>
            קורס
            <select v-model="selectedCourse">
                <option v-for="course in courses" :key="course">
                    {{ course }}
                </option>
                  <option>מבוא למדעי המחשב</option>
            </select>
        </div>
    </div>
</template>

<script>
    import { firebase } from "@firebase/app";

    export default {
        props: {
            selectedFaculty: String,
            selectedDepartment: String,
            selectedCourse: String
        },
        data() {
            return {
                faculties: [], 
            }
        },
        created () {
            firebase.firestore().collection('פקולטה')
            .get()
            .then(querySnapshot => querySnapshot.forEach(doc => {
                this.faculties.push(doc.id)
            }))
        }, 
        computed: {
            departments() {
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
            },
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
        },
    }
</script>

<style lang="scss" scoped>

</style>