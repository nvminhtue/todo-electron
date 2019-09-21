import React, {useState} from 'react'
import { ipcRenderer } from 'electron';
import styled from 'styled-components';

const AddTodoContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    height: 50px;
`;
const AddTodoInput = styled.input`
    width: 300px;
    /* height: 50px; */
    background: transparent;
    border: 1px purple solid;
    border-radius: 4px;
    color: purple;
    margin-right: 10px;
`;

const Button = styled.button`
    width: 100px;
    /* height: 50px; */
    background: transparent;
    border: 1px purple solid;
    border-radius: 4px;
    color: purple;
`;

export default({setTodoList, todoList}) => {
    const [fieldValue, setFieldValue] = useState('');

    const handleSubmit = () => {
        if (fieldValue) {
            setTodoList([...todoList, fieldValue]);
            setFieldValue('');
            ipcRenderer.on('asynchronous-reply', (event, arg) => {
                console.log('renderer')
                console.log(arg) // prints "pong"
            })
            ipcRenderer.send('asynchronous-message', todoList)
    }}
    return (
    <AddTodoContainer>
        <AddTodoInput placeholder="Add new todo" value={fieldValue} onChange={(event) => setFieldValue(event.target.value)} />
        <Button onClick={handleSubmit}>Submit</Button>
    </AddTodoContainer>
)}