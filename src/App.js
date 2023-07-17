import React, { useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import "./assets/styles/main.scss";
import "./assets/styles/responsive.css";
import "antd-button-color/dist/css/style.css"; // or 'antd-button-color/dist/css/style.less'

import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import routeList from "./config/routeMap";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isLoggedIn) {
      //history.push("/styles");
    }
  }, [isLoggedIn, dispatch]);
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in" exact component={SignIn} />
        <Route
          path="/"
          render={() => {
            if (!isLoggedIn) {
              return <Redirect to="/sign-in" />;
            } else {
              return (
                <Main>
                  <Switch>
                    {routeList.map((item) => {
                      return (
                        <Route
                          exact
                          path={item.path}
                          component={item.component}
                          key={item.path}
                        />
                      );
                    })}
                    {/* <Redirect from="*" to="/patients" /> */}
                  </Switch>
                </Main>
              );
            }
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
