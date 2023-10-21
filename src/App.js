import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import _ from "lodash";
import './App.css';
import Utils from './Utils';
import CustomRoutes from './CustomRoutes';
import { NotFound } from "./components";

const App = (props) => {
  const RoutedLayout = () => {
    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <Routes>
          {CustomRoutes.map((route, index) => {
            if (route.secure) {
              return (
                <Route
                  key={index}
                  path={`${process.env.PUBLIC_URL}/login`}
                  component={() => (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  )}
                />
              );
            } else {
              return (
                <Route
                  key={index}
                  path={process.env.PUBLIC_URL + route.path}
                  exact={route.exact || false}
                  element={
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  }
                />
              );
            }
          })}
          <Route component={NotFound}></Route>
        </Routes>
      </Router>
    );
  };
  const AppComponent = () => {
    return (      
      <RoutedLayout />
    );
  };
  return <AppComponent />;
};

export default App;
