import React, {useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Todo from './Todo';
import AddTodo from './Todo/addTodo'

export default() => {
  const [todoList, setTodoList] = useState(['abc'])
  return (
    <BrowserRouter>
      <Route exact path='/' render={() => <Todo {...{todoList}} />} />
      <Route exact path='/add' render={() => <AddTodo {...{setTodoList, todoList}} /> } />
    </BrowserRouter>
  );
}
