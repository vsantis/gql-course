import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import Nav from './components/Nav';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import { Route, Switch } from 'react-router-dom';
// import CompleteRegistration from './pages/auth/CompleteRegistration';

const client = new ApolloClient({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT });

function App() {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
