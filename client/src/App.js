import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoppingList from './components/ShoppingList';
import { Provider } from 'react-redux'; //share states among components - Provider
import store from './store';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import { loadUser } from './actions/authActions';

import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  
  render() {
    return (
      <Provider store={store}> 
      <div classNames="App">
        <AppNavbar />
        <Container>
        <ItemModal />
        <ShoppingList />
        </Container>
      </div>
      </Provider>
    );
  }
}

export default App;
