import { useTodo } from "../store/todo";

const Todo = () => {
  const {todos, toggleTodoCompleted,handelDelteTodo } = useTodo();
    
    

  return (
    <>
    <ul className="main-task">
    {
        todos.map((todo)=>{
            return <li key={todo.id}>
                <input type="checkbox" id={`todo-${todo.id}`} 
                checked={todo.commpleted}
                onChange={()=>toggleTodoCompleted(todo.id)}
                />
                <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
              {
                todo.commpleted &&(
                    <button type="button" onClick={()=> handelDelteTodo(todo.id)}>Delete</button>
                )
              }
            </li>
        })
    }
    </ul>
    </>
   

  );
};

export default Todo;
