
import './App.css';
import Home from './Componrnts/Home/Home/Home';
import { createContext, useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser ]}>
      <Router >
        <Switch>
          <Route exact path="/">
             <Home></Home>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
