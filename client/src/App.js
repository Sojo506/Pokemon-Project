import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home";
import CardCreate from "./components/CardCreate";
import CardDetail from "./components/CardDetail";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/create" component={CardCreate} />
        <Route exact path="/home/pokemon/:id" component={CardDetail} />
        <Route path='*' component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
