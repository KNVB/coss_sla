import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import InputIncident from './InputIncident';
import InputSystemBaseCount from './InputSystemBaseCount';
import ListIncident from './ListIncident';
import MainMenu from './MainMenu';
import ShowStat from './ShowStat';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainMenu}/>
        <Route path='/listIncident' component={ListIncident}/>
        <Route path='/showStat' component={ShowStat} />
        <Route path='/inputIncident' component={InputIncident} />
        <Route path='/inputSystemBaseCount' component={InputSystemBaseCount}/>
      </Switch>
    </Router>
  );
}

export default App;
