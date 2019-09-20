import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Todo from './Todo';
import AddTodo from './Todo/addTodo'

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Todo} />
      <Route exact path='/add' component={AddTodo} />
    </BrowserRouter>
  );
}

export default App;
