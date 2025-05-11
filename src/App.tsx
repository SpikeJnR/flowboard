import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/layout";
import {Fragment} from "react";

function App() {


  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path = '/'
          element = {<Layout />}
          >
        </Route>
      </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
