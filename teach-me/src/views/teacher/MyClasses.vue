<template>
    <div>
        <div class="lesson-requests">
            <h1>בקשות שיעור</h1>
            <div v-for="request in lessonRequests" :key="request.studentId+request.course">
                <lesson-request
                    :request="request"
                />
            </div>
        </div>
        <div class="scheduled-lessons">
            <h1> שיעורים קבועים</h1>
        </div>
    </div>
</template>

<script>
    import { firebase } from "@firebase/app";
    import LessonRequest from '@/components/LessonRequest.vue';

    export default {
        components: {
            LessonRequest,
        },
        data() {
            return {
                lessonRequests: [],
                scheduledLessons: []
            }
        },
        beforeCreate () {
            let self = this
            firebase.firestore().collection('Teachers').doc(this.$store.state.userId)
            .get()
            .then(doc => {
                if (doc.exists) {
                    self.lessonRequests = doc.data().requests;

                    self.scheduledLessons = doc.data().lessons
                    console.log("load Requests")
                }
            }).catch(error => {
                console.log(error);
            })               
        },
    }
</script>

<style lang="scss" scoped>

</style>