import React, { useContext } from 'react';
import {TodoContext} from "../contexts/TodoContext"
import { Col, Container, Row } from 'react-bootstrap';
import TodoCard from '../components/ToDoCard';

export default function Home() {
  const todos = useContext(TodoContext).todos;
    
  return (
    <Container>
      <div>
        <h1 className='text-white bg-dark'>Welcome to the Fitness Strive</h1>
        <p>Start your workout now!</p>
          <Row>
            <CardGroup todos={todos}/>
          </Row>
      </div>
      </Container>
  );
}

function CardGroup({ todos }) {
  return todos.map((todo) => {
      return (
          <Col md={4} key={todo.id}>
              <TodoCard todo={todo} />
          </Col>
      );
  });
}

