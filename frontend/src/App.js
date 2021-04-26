// import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./bootstrap.min.css";
import Header from "./Components/Header/Header";
import Blogs from "./screens/Blogs/Blogs";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct/SingleProduct";

function App() {
  return (
<<<<<<< HEAD
    <Router>
      <div className="App">
        <Header></Header>

        <main>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route exact path="/singleProduct" component={SingleProduct} />
            <Route exact path="/blogs" component={Blogs} />
          </Switch>
        </main>
      </div>
    </Router>
=======
    <div className="App">
        <Header></Header>
        <main>
            <Router>
              <Route to="/" exact component={HomeScreen}></Route>
            </Router>
        </main>
    </div>
>>>>>>> d9ec296104fad4acdbc94822cd8402a2fee09e5a
  );
}

export default App;
