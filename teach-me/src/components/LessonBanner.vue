<template>
    <div>
        <div class="banner-container" 
            :class="{confirmed: confirmation==='confirmed',pending: confirmation==='pending',declined: confirmation==='declined'}" 
            @click="toggleShowDetails" >
                <div> {{lessonName}} </div>
                <div>     
                    <div>
                        {{getDate(classDate)}}
                    </div>
                    <div>
                        {{getTime(startTime, endTime) }}
                    </div>
                </div>
                <div @click="removeLesson"> X </div>
        </div>
        
         <vue-slide-up-down :active="showDetails" :duration="400">
            <div class="details" >
                    <div> {{tutorName}} </div>
                    <div> {{tutorPhoneNum}} </div>
            </div>
         </vue-slide-up-down>
    </div>
</template>

<script>
    import VueSlideUpDown from 'vue-slide-up-down';
    export default {
        components: {
            VueSlideUpDown,
        },
        data() {
            return {
                showDetails: false
            }
        },
        props: {
            lessonName: String,
            classDate: Object,
            startTime: Object,
            endTime: Object,
            tutorName: String,
            tutorPhoneNum: String,
            confirmation:String
        },
        methods: {
            toggleShowDetails() {
                this.showDetails = !this.showDetails
            },
            removeLesson() {
                //need to remove from teachers list and user list and rate the teacher
            },
            getDate(timeStamp) {
                let date = new Date(timeStamp * 1000);
                return  date.getDate()+
                        "/"+(date.getMonth()+1) +
                        "/"+(date.getFullYear()-1969)
            },
            getTime(start, finish) {
                return start["HH"] + ':' + start["mm"] + '-' + finish["HH"] + ':' + finish["mm"]
            },
        },
    }
</script>

<style scoped>

    .banner-container{
        direction: rtl;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        width: 300px;
        padding: 10px 15px 10px 15px;
        border-radius: 30px;
        margin:5px;

        cursor: pointer;
        z-index: 1000;;
    }
    .confirmed{
        background-color:rgb(74, 228, 151)
    }
    .pending{
        background-color:rgb(223, 208, 79)
    }
    .declined{
        background-color:rgb(228, 97, 74)
    }

    .details{
        direction: rtl;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        background-color:  rgb(226, 226, 226);
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        
        width: 300px;
        margin:0px 5px 0px 5px;
        padding: 10px 15px 10px 15px;
        border-radius: 30px;



    }

</style>