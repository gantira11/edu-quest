import { lazy } from "react"

const Home = lazy(() => import('@features/student/pages/home'))

const StudentSubjects = lazy(() => import('@/features/student/pages/subjects'))
const StudentSubjectsDetail = lazy(() => import('@features/student/pages/subjects-detail'))

const StudentVideos = lazy(() => import('@features/student/pages/videos'))
const StudentVideosDetail = lazy(() => import('@features/student/pages/videos-detail'))

const StudentPratest = lazy(() => import('@features/student/pages/pra-test'))

const StudentQuizzes = lazy(() => import('@features/student/pages/quizzes'))

const StudentTest = lazy(() => import('@features/student/pages/test'))

const StudentResult = lazy(() => import('@features/student/pages/results'))

const StudentDisccusion = lazy(() => import('@features/student/pages/discussion'))


export const studentRoute = [
  {
    id: 'home-page',
    path: '/student/home',
    component: Home,
    layout: 'student',
    permission: ['student']
  },
  {
    id: 'student-subject-page',
    path: '/student/subjects',
    component: StudentSubjects,
    layout: 'student',
    permission: ['student']
  },
  {
    id: 'student-subject-detail-page',
    path: '/student/subjects/:id',
    component: StudentSubjectsDetail,
    layout: 'student',
    permission: ['student']
  },
  {
    id: 'student-videos-page',
    path: '/student/videos',
    component: StudentVideos,
    layout: 'student',
    permission: ['student']
  },
  {
    id: 'student-videos-detail-page',
    path: '/student/videos/:id',
    component: StudentVideosDetail,
    layout: 'student',
    permission: ['student']
  },
  {
    id: 'student-pratest-page',
    path: '/student/pra-tests',
    component: StudentPratest,
    layout: 'student',
    permission: ['student']
  },
  {
    id: 'student-quizzes-page',
    path: '/student/pra-tests/:id/quizzes',
    component: StudentQuizzes,
    layout: 'student',
    permission: ['student']
  },
  {
    id: 'student-test-page',
    path: '/student/pra-tests/:id/quizzes/:quizId',
    component: StudentTest,
    layout: 'student',
    permission: ['student']
  },
  {
    id: 'student-results-page',
    path: '/student/pra-tests/:id/quizzes/:quizId/result',
    component: StudentResult,
    layout: 'student',
    permission: ['student']
  },
  {
    id: 'student-discussion-page',
    path: '/student/pra-tests/:id/quizzes/:quizId/result/discussion',
    component: StudentDisccusion,
    layout: 'student',
    permission: ['student']
  },
  {
    id: 'student-pratest-page',
    path: '/student/evaluasi',
    component: StudentPratest,
    layout: 'student',
    permission: ['student']
  },
  {
    id: 'student-quizzes-page',
    path: '/student/evaluasi/:id/quizzes',
    component: StudentQuizzes,
    layout: 'student',
    permission: ['student']
  },
  {
    id: 'student-test-page',
    path: '/student/evaluasi/:id/quizzes/:quizId',
    component: StudentTest,
    layout: 'student',
    permission: ['student']
  },
  {
    id: 'student-results-page',
    path: '/student/evaluasi/:id/quizzes/:quizId/result',
    component: StudentResult,
    layout: 'student',
    permission: ['student']
  },
  {
    id: 'student-discussion-page',
    path: '/student/pra-tests/:id/quizzes/:quizId/result/discussion',
    component: StudentDisccusion,
    layout: 'student',
    permission: ['student']
  },
]