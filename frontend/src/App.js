// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './bootstrap.min.css';
import Header from './Components/Header/Header';
import HomeScreen from './screens/HomeScreen';


function App() {
  return (
    <div className="App">
        <Header></Header>
        <main className="container">
            <Router>
              <Route to="/" exact component={HomeScreen}></Route>
            </Router>
        </main>
    </div>
  );
}

export default App;
