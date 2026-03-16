"use client";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button } from "react-bootstrap";

export default function TodoItem({ todo }: {
    todo: { id: string; title: string };
}) {
    const dispatch = useDispatch();
    return (
        <ListGroupItem className="d-flex align-items-center gap-2">
            <Button onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click" variant="danger">
                Delete
            </Button>
            <Button onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click" variant="primary">
                Edit
            </Button>
            {todo.title}
        </ListGroupItem>
    );
}