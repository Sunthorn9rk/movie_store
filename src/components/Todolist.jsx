"use client";
import {useState, useEffect} from "react";
import {FiCheckCircle, FiCircle} from "react-icons/fi";
import {FcTodoList} from "react-icons/fc";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // โหลดข้อมูลจาก localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // บันทึกข้อมูลลง localStorage ทุกครั้งที่ todos เปลี่ยน
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    if (editId !== null) {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === editId ? {...todo, text: input} : todo))
      );
      setEditId(null);
    } else {
      setTodos((prev) => [
        ...prev,
        {id: Date.now(), text: input, completed: false},
      ]);
    }
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo
      )
    );
  };

  const editTodo = (id, text) => {
    setInput(text);
    setEditId(id);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="flex text-4xl font-bold mb-4">
        <FcTodoList />
        Todolist
      </h1>
      <div className="flex gap-2 mb-4">
        <input
          className="p-2 border rounded w-64"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={addTodo}
        >
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul className="w-full max-w-md">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 rounded shadow mb-2"
          >
            <div className="flex items-center gap-2">
              {todo.completed ? (
                <FiCheckCircle
                  className="text-green-500 cursor-pointer"
                  onClick={() => toggleComplete(todo.id)}
                />
              ) : (
                <FiCircle
                  className="text-gray-400 cursor-pointer"
                  onClick={() => toggleComplete(todo.id)}
                />
              )}
              <div
                className={`flex-1 cursor-pointer ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.text}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="text-yellow-500"
                onClick={() => editTodo(todo.id, todo.text)}
              >
                Edit
              </button>
              <button
                className="text-red-500"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
