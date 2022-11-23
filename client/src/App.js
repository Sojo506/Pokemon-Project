import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home";
import Card from "./components/Card";
import Navbar from "./components/Navbar";

function App() {
  const pokemon = useSelector((state) => state.pokemon);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
