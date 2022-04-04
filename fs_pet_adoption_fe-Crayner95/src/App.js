import './App.css';
import SignInSide from './components/signIn'
import Dashboard from './components/dashboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignUp from './components/signUp'
import MyPets from './components/myPets'
import SearchPet from './components/SearchPet';
import Main from './components/Main';
import AddPet from './components/AddPet';
import Profile from './components/Profile';
import Logout from './components/logout';
import EditUser from './components/EditUser'
import * as React from 'react';
import axios from 'axios';


export const UserContext = React.createContext({ user: null, setUser: () => { },  })

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const userResponse = await axios.get('/api/user');
      setUser(userResponse.data);
    })()
  }, [])



  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route exact path="/">
            <Dashboard>
              <Main />
            </Dashboard>
          </Route>
          <Route path="/search">
            <Dashboard>
              <SearchPet />
            </Dashboard>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <SignInSide />
          </Route>
        <Route path="/logout">
          <Dashboard>
            <Logout />
          </Dashboard>
        </Route>
          <Route path="/pets">
            <Dashboard>
              <MyPets />
            </Dashboard>
          </Route>
          <Route path="/addpet">
            <Dashboard>
              <AddPet />
            </Dashboard>
          </Route>
          <Route path="/profile">
            <Dashboard>
              <Profile />
            </Dashboard>
          </Route>
          <Route path="/manageuser">
            <Dashboard>
              <EditUser />
            </Dashboard>
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  )
}

export default App;
