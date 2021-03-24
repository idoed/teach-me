<template>
    <div>
        <div class="request-details">
            <div class="course-name">
                {{request.course}}
            </div>
            <div class="date-and-time">
                <div class="date">
                    {{getDate(request.date)}}
                </div>
                <div class="time">
                    {{getTime(request.startTime, request.endTime) }}
                </div>
            </div>
            <div>
                {{student_name}}
            </div>
        </div>
        <div class="confirmation-field">
            <span class="confirm" @click="respondToRequest('confirmed')">
                V
            </span>
            <span>
                |
            </span>
            <span class="decline" @click="respondToRequest('declined')">
                X
            </span>
        </div>
    </div>
</template>

<script>
    import { firebase } from "@firebase/app";

    export default {
        props: {
            request: Object
        },
        data() {
            return {
                student_db_ref:null ,
                student_name:null,
            }
        },
        methods: {
            respondToRequest(answer) {
                let self = this
                let studentClasses = []
                firebase.firestore().collection('Students').doc(this.request.studentId)
                .get()
                .then(docSnapShot => {
                    studentClasses = docSnapShot.data().classes
                    studentClasses.forEach(studentClass => {
                        if (studentClass.unique_id === self.request.unique_id) {
                            studentClass.status = answer
                            //change the class status to answer in student request.
                            //next remove the request form the teacher if answer=='confirmed' add it to class else do nothing.
                            firebase.firestore.collection('Teachers').doc(this.$store.state.userId)
                            .get().
                            then(docSnapShot=> 
                            teacherRequests=docSnapShot.data().classes)
                            teacherRequests.remo
                        } 
                    })
                    self.student_db_ref.update({
                        classes: studentClasses
                    })
                })
    
            },
            getStudentName() {
                
            },
            getDate(timeStamp) {
                let date = new Date(timeStamp * 1000);
                return  date.getDate()+
                        "/"+(date.getMonth()+1)+
                        "/"+date.getFullYear()
            },
            getTime(start, finish) {
                return start["HH"] + ':' + start["mm"] + '-' + finish["HH"] + ':' + finish["mm"]
            },
        },
        created () {
            console.log(this.request.studentId)
            this.student_db_ref=firebase.firestore().collection('Students').doc(this.request.studentId);
            this.student_db_ref.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                     
                    this.student_name=docSnapshot.data().userName
                    console.log("reacieved userName "+ this.student_name)   
                }
            })
        },
    }
</script>

<style lang="scss" scoped>

</style>