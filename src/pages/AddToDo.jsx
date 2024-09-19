import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  const [workoutBlockTitle, setWorkoutBlockTitle] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [description, setDescription] = useState("");
  const setTodos = useContext(TodoContext).setTodos;
  const todos = useContext(TodoContext).todos;
  const navigate = useNavigate();

  function addTodo(event) {
    event.preventDefault();
    setTodos([
      ...todos,
      {
        id: Date.now(),
        workoutBlockTitle,
        trainingType,
        status,
        description,
      },
    ]);
    navigate("/");
  }

  return (
    <Container>
      <h1 className="my-3">Add Todo</h1>
      <Form onSubmit={addTodo}>
        <Form.Group className="mb-3" controlId="workoutBlockTitle">
          <Form.Label>Workout Block</Form.Label>
          <Form.Control
            value={workoutBlockTitle}
            onChange={(e) => setWorkoutBlockTitle(e.target.value)}
            type="text"
            placeholder="Enter the workout block title (e.g., Strength, Cardio)"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="type">
          <Form.Label>Training Type</Form.Label>
          <Form.Control
            value={trainingType}
            onChange={(e) => setTrainingType(e.target.value)}
            type="text"
            placeholder="Enter the training type (e.g., HIIT, Strength)"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
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
            placeholder="Describe the workout (e.g., Push through 3 sets of high-intensity)"
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
