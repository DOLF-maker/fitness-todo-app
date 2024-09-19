import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";

export default function TodoCard({ todo }) {
    const statusColor = {
        "Not Started": "warning",
        "In Progress": "info",
        "Completed": "success",
        
    }
    const border = statusColor[todo.status] || "danger";
    const [timer, setTimer] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);
    const setTodos = useContext(TodoContext).setTodos;

    const startTimer = () => {
        if (timerInterval === null) {
            const intervalID = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
            setTimerInterval(intervalID);
        }
    };

    const pauseTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
    };

    const resetTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
        setTimer(0);
    };

    const deleteTodo = () => {
        setTodos((prevTodos) =>
            prevTodos.filter((prevTodo) => prevTodo.id !== todo.id)
        );
    };

    useEffect(() => {
        return () => {
            clearInterval(timerInterval);
        };
    }, [timerInterval]);
    return (
        <>
            <Card border={border} className="my-3" style={{ backgroundColor: '#1f1f1f' }}>
                <Card.Header style={{ backgroundColor: '#2b2b2b', color: '#ffffff' }}>Status: {todo.status} </Card.Header>
                <Card.Body>
                    <Card.Title style={{ color: '#F5F5F5' }}>{todo.workoutBlockTitle} ({todo.trainingType})</Card.Title>
                    <Card.Text style={{ color: '#c0c0c0' }}>{todo.description}</Card.Text>
                    <p style={{ color: '#c0c0c0' }}>Status: {todo.status}</p>
                    <p style={{ color: '#ffcc00' }}>Timer: {timer} seconds</p>
                    <Button onClick={startTimer}>
                        <i className="bi bi-play"></i>
                    </Button>
                    <Button onClick={pauseTimer} className="ms-2">
                        <i className="bi bi-pause-fill"></i>
                    </Button>
                    <Button onClick={resetTimer} className="ms-2">
                        <i className="bi bi-arrow-clockwise"></i>
                    </Button>
                    <Button variant="secondary" href={`/todo/${todo.id}`} className="ms-2">
                        <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="danger" onClick={deleteTodo} className="ms-2">
                        <i className="bi bi-trash3"></i>
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}