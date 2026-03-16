"use client";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";

export default function TodoForm() {
    const { todo } = useSelector((state: RootState) => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <ListGroupItem className="d-flex align-items-center gap-2">
            <Button onClick={() => dispatch(addTodo(todo))}
                    id="wd-add-todo-click" variant="success">
                Add
            </Button>
            <Button onClick={() => dispatch(updateTodo(todo))}
                    id="wd-update-todo-click" variant="warning">
                Update
            </Button>
            <FormControl
                value={todo.title}
                onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} />
        </ListGroupItem>
    );
}