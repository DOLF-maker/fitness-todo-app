import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { TodoContext } from "../contexts/TodoContext";

export default function EditTodo() {
    const setTodos = useContext(TodoContext).setTodos;
    const todos = useContext(TodoContext).todos;
    const navigate = useNavigate();
    const id = parseInt(useParams().id);
    const currentTodo = todos.find((todo) => todo.id === id);
    const [workoutBlock, setWorkoutBlock] = useState(currentTodo.workoutBlock);
    const [trainingType, setTrainingType] = useState(currentTodo.trainingType);
    const [status, setStatus] = useState(currentTodo.status);
    const [description, setDescription] = useState(currentTodo.description);

    function updateTodo(event) {
        event.preventDefault();
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    id,
                    workoutBlock,
                    trainingType,
                    status,
                    description
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
        navigate("/");
    }

    return (
        <Container>
            <h1 className="my-3">Edit Todo</h1>
            <Form onSubmit={updateTodo}>
                <Form.Group className="mb-3" controlId="workoutBlock">
                    <Form.Label>Workout Block</Form.Label>
                    <Form.Control
                        value={workoutBlock}
                        onChange={(e) => setWorkoutBlock(e.target.value)}
                        type="text"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="trainingType">
                    <Form.Label>Training Type</Form.Label>
                    <Form.Control
                        value={trainingType}
                        onChange={(e) => setTrainingType(e.target.value)}
                        type="text"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option>Not Started</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        as="textarea"
                        rows={3}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
