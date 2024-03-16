import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { filter, map } from 'lodash';
import { IRoute, router } from './routes';

import BaseLayout from '@/shared/layouts/base-layout';
import CmsLayout from '@/shared/layouts/cms-layout';
import ProtectedRoute from '@/shared/components/protected-route';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          {map(
            filter(router, (route: IRoute) => route.layout === 'base'),
            (route: IRoute) => {
              const Component = route.component;
              return (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<Component />}
                />
              );
            }
          )}
        </Route>
        <Route element={<CmsLayout />}>
          {map(
            filter(router, (route: IRoute) => route.layout === 'cms'),
            (route: IRoute) => {
              const Component = route.component;
              return (
                <Route
                  key={route.id}
                  path={route.path}
                  element={
                    <ProtectedRoute
                      element={<Component />}
                      rolePermission={route.permission}
                    />
                  }
                />
              );
            }
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
