
import { lazy } from "react";

const HowToUsePage = lazy(() => import('@/features/how-to-use/pages/index'))

export const baseRoute = [
  {
    id: 'how-to-use-page',
    path: '/how-to-use',
    component: HowToUsePage,
    layout: 'base',
    permission: [],
  }
];
