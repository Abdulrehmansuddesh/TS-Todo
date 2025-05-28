import { useState } from "react";
import { useTodo } from "../store/todo";

const Todo = () => {
  const { todos, toggleTodoCompleted, handleDeleteTodo, handleEditTodo } = useTodo();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTask, setEditTask] = useState("");

  const onCheckboxChange = (todoId: string) => {
    toggleTodoCompleted(todoId);
  };

  const startEditing = (todoId: string, currentTask: string) => {
    setEditingId(todoId);
    setEditTask(currentTask);
  };

  const closeModal = () => {
    setEditingId(null);
    setEditTask("");
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId && editTask.trim() !== "") {
      handleEditTodo(editingId, editTask.trim());
      closeModal();
    }
  };

  return (
    <>
      <ul className="main-task">
        {todos.map((todo) => (
          <li key={todo.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          

            <label htmlFor={`todo-${todo.id}`} style={{ flex: 1 }}>
              {todo.task}
            </label>

            <button className="editBtn" type="button" onClick={() => startEditing(todo.id, todo.task)}>
              Edit
            </button>

            <button className="DeletBtn" type="button" onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {editingId && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Todo</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                autoFocus
              />
              <div style={{ marginTop: "1rem" }}>
                <button type="submit">Save</button>
                <button type="button" onClick={closeModal} style={{ marginLeft: "10px" }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
