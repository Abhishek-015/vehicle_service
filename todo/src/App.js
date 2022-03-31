import logo from "./logo.svg";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import Todo from "./components/Todo";

function App() {
  return (
    <>
      <div className="App">
        <Todo />
      </div>
    </>
  );
}

export default App;
