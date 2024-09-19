import { Container, Nav, Navbar, Button } from "react-bootstrap"
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import useLocalStorage from "use-local-storage"
import { TodoContext } from "./contexts/TodoContext"
import { AuthContext } from './contexts/AuthContext';
import RequireAuth from "./contexts/RequireAuth";
import AddTodo from "./pages/AddTodo"
import ErrorPage from "./pages/ErrorPage"
import Home from "./pages/Home"
import EditTodo from "./pages/EditTodo"
import LoginForm from "./pages/LoginForm";
import { useContext } from "react";

function Layout() {
  const navigate = useNavigate()
  const { setToken } = useContext(AuthContext)

  const handleLogout = () => {
    setToken(null);
    navigate("/login")
  }
  return (
    <>
      <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
        <Container>
          <Navbar.Brand href="/" class="navbar-brand h1">Todos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/add">Add Todo</Nav.Link>
            <Nav.Link target="_blank"  href="https://www.calculatorsoup.com/calculators/health/target-heart-rate-zone-calculator.php">HR Zone</Nav.Link>
            <Nav.Link target="_blank"  href="https://www.calculatemacro.com/">Macros Calculator & TDEE</Nav.Link>
          </Nav>
          <div className="ml- auto">
            <Button variant="danger" onClick={handleLogout} >
            <i class="bi bi-escape" ></i>
                     Logout
            </Button>
          </div>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", [])
  const [token, setToken] = useLocalStorage("token", null)

  return (
    <AuthContext.Provider value={{ token, setToken }} >
      <TodoContext.Provider value={{ todos, setTodos }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<RequireAuth><Home /></RequireAuth>} />
              <Route path="add" element={<RequireAuth><AddTodo /></RequireAuth>} />
              <Route path="login" element={<LoginForm />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="todo/:id" element={<EditTodo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TodoContext.Provider>
    </AuthContext.Provider>
  )
}
