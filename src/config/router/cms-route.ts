
import { lazy } from "react";

const Dashboard = lazy(() => import('@features/dashboard/pages/dashboard'))
const Subjects = lazy(() => import('@features/subjects/pages/subjects'))
const SubjectsForm = lazy(() => import('@/features/subjects/pages/subjects-form'))
const SubjectDetail = lazy(() => import('@features/subjects/pages/subjects-detail'))

const QuizForm = lazy(() => import('@features/quiz/pages/quiz-form'))
const QuizDetail = lazy(() => import('@features/quiz/pages/quiz-detail'))

const Users = lazy(() => import('@features/user/pages/users'))
const UsersForm = lazy(() => import('@features/user/pages/users-form'))

export const cmsRoute = [
  {
    id: 'dashboard-page',
    path: '/dashboard',
    component: Dashboard,
    layout: 'cms',
    permission: ['admin']
  },
  {
    id: 'subjects-page',
    path: '/subjects',
    component: Subjects,
    layout: 'cms',
    permission: ['admin']
  },
  {
    id: 'subjects-form-page',
    path: '/subjects/form',
    component: SubjectsForm,
    layout: 'cms',
    permission: ['admin']
  },
  {
    id: 'subjects-form-edit-page',
    path: '/subjects/form/:id',
    component: SubjectsForm,
    layout: 'cms',
    permission: ['admin']
  },
  {
    id: 'subjects-detail-page',
    path: '/subjects/:id',
    component: SubjectDetail,
    layout: 'cms',
    permission: ['admin']
  },
  {
    id: 'quiz-form-page',
    path: '/subjects/:id/quiz/form',
    component: QuizForm,
    layout: 'cms',
    permission: ['admin']
  },
  {
    id: 'quiz-form-page',
    path: '/subjects/:id/quiz/form/:quizId',
    component: QuizForm,
    layout: 'cms',
    permission: ['admin']
  },
  {
    id: 'quiz-detail-page',
    path: '/subjects/:id/quiz/:quizId',
    component: QuizDetail,
    layout: 'cms',
    permission: ['admin']
  },
  {
    id: 'users-page',
    path: '/users',
    component: Users,
    layout: 'cms',
    permission: ['admin']
  },
  {
    id: 'users-form-page',
    path: '/users/form',
    component: UsersForm,
    layout: 'cms',
    permission: ['admin']
  },
  {
    id: 'users-form-edit-page',
    path: '/users/form/:id',
    component: UsersForm,
    layout: 'cms',
    permission: ['admin']
  },
];