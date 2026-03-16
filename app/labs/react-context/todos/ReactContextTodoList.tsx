"use client";
import { useTodos } from "./todosContext";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";

export default function ReactContextTodoList() {
    const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = useTodos()!;
    return (
        <div id="wd-react-context-todo-list">
            <h2>Todo List</h2>
            <ListGroup>
                <ListGroupItem className="d-flex align-items-center gap-2">
                    <Button onClick={updateTodo} variant="warning">Update</Button>
                    <Button onClick={addTodo} variant="success">Add</Button>
                    <FormControl
                        value={todo.title}
                        onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
                </ListGroupItem>
                {todos.map((t) => (
                    <ListGroupItem key={t.id} className="d-flex align-items-center gap-2">
                        <Button onClick={() => setTodo(t)} variant="primary">Edit</Button>
                        <Button onClick={() => deleteTodo(t.id)} variant="danger">Delete</Button>
                        {t.title}
                    </ListGroupItem>
                ))}
            </ListGroup>
            <hr />
        </div>
    );
}