import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "@/views/Register.vue";
import StudentProfile from "@/views/StudentProfile.vue";
import MyLessons from '@/views/MyLessons.vue';
import NewLesson from '@/views/NewLesson.vue';
import teacherProfile from '@/views/teacher/teacherProfile.vue';
import MyClasses from '@/views/teacher/MyClasses.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/student-profile",
    name: "StudentProfile",
    component: StudentProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/teacher-profile",
    name: "teacherProfile",
    component: teacherProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/my-lessons",
    name: "MyLessons",
    component: MyLessons,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/my-classes",
    name: "MyClasses",
    component: MyClasses,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/new-lesson",
    name: "NewLesson",
    component: NewLesson,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    redirect: '/login'
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


export default router;
