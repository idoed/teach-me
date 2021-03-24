<template>
    <div class="container">
        <div class="background_profile">
            <div class="my_lessons">
                <div class="icon1">
                    <img src="../assets/student-img.svg" alt="">
                </div>
                השיעורים שלי
            </div>
            <div class="lesson-banner">
                <div v-for="myClass in myClasses" :key=myClass.teacherId>
                     <lesson-banner
                        :lessonName="myClass.course"
                        :classDate="myClass.classDate"
                        :startTime="myClass.startTime"
                        :endTime="myClass.endTime"
                        :tutorName="myClass.teacherName"
                        :tutorPhoneNum="myClass.teacherPhoneNum"
                        :confirmation="myClass.status"
                     />
                </div>
                <!-- <lesson-banner
                    :lessonName="'מבוא למדעי המחשב'"
                    :time="'יום ה` 9:00'"
                    :tutorName="'אלה לי שמעון'"
                    :tutorPhoneNum= "'0548671069'"
                    :confirmation="'confirmed'"
                />
                <lesson-banner
                    :lessonName="'אלגברה1'"
                    :time="'יום ג` 18:00'"
                    :tutorName="'יצחק בובליל'"
                    :tutorPhoneNum= "'0526123069'"
                    :confirmation="'pending'"
                />
                <lesson-banner
                    :lessonName="'דינמיקה להנדסת מכונות'"
                    :time="'יום ג` 18:00'"
                    :tutorName="'יעקב אזולאי'"
                    :tutorPhoneNum= "'0526182649'"
                    :confirmation="'declined'"
                /> -->

                <div class="new-lesson" @click="navigateToNewLesson">
                    <div class="plus-icon">
                        <img src="../assets/plus.svg" alt="">
                    </div>
                    <div>
                        קבע/י שיעור חדש 
                    </div>
                </div>
            </div>
        </div>
     </div>
</template>

<script>
    import LessonBanner from '@/components/LessonBanner.vue';
    import { firebase } from "@firebase/app";

    export default {
        components: {
            LessonBanner
        },
        data() {
            return {
                myClasses: []
            }
        },
        async created () {
            let self = this
            firebase.firestore().collection('Students').doc(this.$store.state.userId)
            .get()
            .then((docSnapshot) => {
                self.myClasses = docSnapshot.data().classes
                console.log(self.myClasses)
            })
        },
        methods: {
            navigateToNewLesson() {
                this.$router.push('/new-lesson')
            },
            
        },
    }
</script>

<style>
    .container{
        /* display: inline-block;
        align-content: center; */
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .my_lessons{
        cursor: pointer;
        /* white-space: nowrap; */
        color: #715EF6;
        margin: 120px 0px 60px 0px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px;

        width: 328px;
        height: 36px;
        left: 16px;
        top: 110px;

        background: #D4CEFF;
        border-radius: 8px;
        font-weight: bold;
        
    }

    .icon1{
    height: 30px;
    width: 30px;

    }

    .lesson-banner{
    /* margin: 170px 0px 40px 0px; */
    }
    .new-lesson{
        margin: 290px 55px 40px 0px;
        cursor: pointer;
        /* position: flex; */
        /* bottom:10px; */

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width:200px;
        padding:12px;
        border-radius: 30px;
        background-color: #715EF6;

        font-size:1.2rem;
        color:white;


    }
    .plus-icon{
        height: 17px;
        width: 25px;
    }   

</style>