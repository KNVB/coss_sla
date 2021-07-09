import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GenerateMonthlyReport from './components/GenerateMonthlyReport';
import InputIncident from './components/InputIncident';
import InputSystemBaseCount from './components/InputSystemBaseCount';
import ListIncident from './components/ListIncident';
import MainMenu from './components/MainMenu';
import ShowMonthlyReport from './components/showMonthlyReport/ShowMonthlyReport';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainMenu}/>
        <Route path="/generateMonthlyReport" component={GenerateMonthlyReport}/>
        <Route path='/listIncident' component={ListIncident}/>
        <Route path='/showMonthlyReport' component={ShowMonthlyReport} />
        <Route path='/inputIncident' component={InputIncident} />
        <Route path='/inputSystemBaseCount' component={InputSystemBaseCount}/>
      </Switch>
    </Router>
  );
}

export default App;
