import { useState } from "react";
import { useTodo } from "../store/todo";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const { handleAddTodo } = useTodo();

  const handleTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.trim() === "") {
      alert("Please enter a todo");
      return;
    }
    handleAddTodo(todo.trim());
    setTodo("");
  };

  return (
    <form onSubmit={handleTodo}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter a todo..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
