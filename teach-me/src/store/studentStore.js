const studentStore={
    data{
        uid="",
        nickname="",
        phonenumber="",
        dagree=""
    },
    methods: {
        addnewStore(nickname, phonenumber,dagree){
            studentStore.data.nickname=nickname,
            studentStore.data.dagree=dagree,
            studentStore.data.phonenumber=phonenumber;
        }

    }
};
export default studentStore;