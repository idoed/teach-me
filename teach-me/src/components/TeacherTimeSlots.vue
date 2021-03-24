<template>
    <div class="container">
        <div class="name-and-rating" @click="toggleOpenSlots">
            <div>{{name}}</div>
            <div>דירוג: {{rating}}</div>
        </div>
        <vue-slide-up-down :active="openSlots" :duration="400">
            <div v-for="slot in timeSlots" :key=slot.date.seconds>
                <div class="time-and-apply" v-if="!slot.studentId">
                     <div class="time-slot">
                         {{getDate(slot.date)}}
                         {{getTime(slot.startTime, slot.endTime) }}
                    </div>
                    <div class="apply" @click="registerLesson(slot)">
                        <span v-if="!(slot.studentId === currentStudentId) ">הרשמה לשיעור</span>
                        <span v-else class="cancel-registration">ביטול הרשמה</span>
                    </div>
                </div>
            </div>
        </vue-slide-up-down>
    </div>
</template>

<script>
    import { firebase } from "@firebase/app";
    import VueSlideUpDown from 'vue-slide-up-down';

    export default {
        components: {
            VueSlideUpDown,
        },
        props: {
            name: String,
            teacherId: String,
            teacherName: String,
            teacherPhoneNum: String,
            rating: Number,
            timeSlots: Array,
            course: String,
        },
        data() {
            return {
                openSlots: false,
                currentStudentId: this.$store.state.userId,
            }
        },
        methods: {
            toggleOpenSlots() {
                this.openSlots = !this.openSlots
            },
             toggleRequestPending() {
                this.requestPending = !this.requestPending
            },
            getDate(timeStamp) {
                let date = new Date(timeStamp * 1000);
                return  date.getDate() +
                        "/"+(date.getMonth()+1) +
                        "/"+(date.getFullYear()-1969)
            },
            getTime(start, finish) {
                return start["HH"] + ':' + start["mm"] + '-' + finish["HH"] + ':' + finish["mm"]
            },
            registerLesson(slot){
                console.log(this.$store.state.userId)
                if (slot.studentId === this.currentStudentId) {
                    firebase.firestore()
                    .collection('Teachers')
                    .doc(this.teacherId)
                    .update({
                        requests: firebase.firestore.FieldValue.arrayRemove({
                            studentId: this.currentStudentId,
                            startTime: slot.startTime,
                            endTime: slot.endTime,
                            course: this.course,
                            date: slot.date,
                            unique_id: unique_id
                        })
                    },{merge:true})
                }
                else {
                    let unique_id=Date.now()
                    this.requestPending = true;
                    firebase.firestore()
                    .collection('Teachers')
                    .doc(this.teacherId)
                    .update({
                        requests: firebase.firestore.FieldValue.arrayUnion({
                            studentId: this.currentStudentId,
                            startTime: slot.startTime,
                            endTime: slot.endTime,
                            course: this.course,
                            date: slot.date,
                            unique_id: unique_id
                        })
                    },{merge:true}).then(()=>{
                        slot.studentId=this.currentStudentId
                        firebase.firestore()
                        .collection('Students')
                        .doc(this.currentStudentId)
                        .update({
                            classes: firebase.firestore.FieldValue.arrayUnion({
                                unique_id:unique_id,
                                teacherId: this.teacherId,
                                teacherName: this.teacherName,
                                teacherPhoneNum: this.teacherPhoneNum,
                                classDate: slot.date,
                                startTime: slot.startTime,
                                endTime: slot.endTime,
                                course: this.course,
                                status:'pending'
                            })
                        },{merge:true})
                    })
                }
            }
        }
    }
    
</script>

<style lang="scss" scoped>


.container{
    margin:5px;
    
}
.name-and-rating{
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 400px;
    max-width: 100%;
    padding: 9px 10px 9px 10px;
    background-color: #715EF6;
    border-radius: 30px;
    color: white;
    font-weight: bold;

}
.time-and-apply{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width:400px;
    max-width: 100%;
    padding: 5px 10px 5px 5px;
    background-color: #aea3f8;
    border-radius: 30px;
    margin:2px;
}
.container{
    display: flex;
    flex-direction: column;
    align-items: center;;
}
.apply {
    background-color: white;
    border-radius: 30px;
    padding:5px 10px 5px 10px;
    cursor: pointer;
}
.cancel-registration{
    color: red;
    font-weight: bold;
}
</style>