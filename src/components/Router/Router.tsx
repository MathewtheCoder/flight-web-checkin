import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import routes from "routes";

type RouteInfo = {
  component: () => JSX.Element;
  path: string;
};
const Router = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      {routes.map((route: RouteInfo) => (
        <Route
          path={route.path}
          component={route.component}
          key={route.path}
          exact
        />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Router;
