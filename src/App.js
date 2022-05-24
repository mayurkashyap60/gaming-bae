import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Preview from "./components/preview/Preview";
import Categories from "./pages/categories/Categories";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard}></Route>
        <Route path="/preview">
          <Preview />
        </Route>
        <Route path="/categories">
          <Categories />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
