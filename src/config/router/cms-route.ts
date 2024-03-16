
import { lazy } from "react";

const Dashboard = lazy(() => import('@features/dashboard/pages/dashboard'))
const Subjects = lazy(() => import('@features/subjects/pages/subjects'))
const SubjectsForm = lazy(() => import('@/features/subjects/pages/subjects-form'))

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
  }
];