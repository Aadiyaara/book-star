import './App.css';
import Auth from './screens/auth/Auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './screens/landing/Home';
import { AuthProvider } from './services/context/AuthContext';
import AuthRoute from './helpers/AuthRoute';
import MyBooks from './screens/my_books/MyBooks';
import BookSummary from './screens/book/BookSummary';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <AuthRoute path="/my_books" exact component={MyBooks} />
            <AuthRoute path="/book" exact component={BookSummary} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
