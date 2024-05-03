
import { authenticationRoute } from "./authentication-route";
import { baseRoute } from "./base-routes";
import { cmsRoute } from "./cms-route";
import { studentRoute } from "./student-route";

export interface IRoute {
  id: string,
  path: string,
  component: React.LazyExoticComponent<() => JSX.Element>;
  layout: string,
  permission: string[]
}

export const router: IRoute[] = [
  ...baseRoute,
  ...authenticationRoute,
  ...cmsRoute,
  ...studentRoute
];
