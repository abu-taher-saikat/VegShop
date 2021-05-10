// import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./bootstrap.min.css";
// import BlogPost from "./Components/BlogPost/BlogPost";
import Header from "./Components/Header/Header";
import Blogs from "./screens/Blogs/Blogs";
import HomeScreen from "./screens/HomeScreen";
import ProductCollection from "./screens/ProductCollection";
import ProductScreen from "./screens/ProductScreen";
import SingleProduct from "./screens/SingleProduct/SingleProduct";

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>

        <main>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            {/* <Route exact path="/singleProduct/:id" component={SingleProduct} /> */}
            <Route exact path="/products" component={ProductScreen} />
            <Route path="/product/:id" component={SingleProduct} />
            <Route exact path="/blogs" component={Blogs} />
            <Route exact path="/collection" component={ProductCollection} />
            {/* <Route exact path="/blogPost" component={BlogPost} /> */}
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
