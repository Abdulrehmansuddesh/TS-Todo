    import  { createContext, useContext, useState, type ReactNode } from "react";


    export type TodoProviderProp = {
    children: ReactNode
    }

    export type Todo = {
        id:string;
        task:string;
        commpleted:boolean;
        createdAt:Date
    }

    export type ContexTodo = {
        todos:Todo[];
        handleAddTodo:(task:string)=>void;
        toggleTodoCompleted:(id:string)=>void;
        handelDelteTodo:(id:string)=>void;

    }
 

  

    export const TodoContext = createContext <ContexTodo |null > (null);

    export const TodosProvider = ({ children}:TodoProviderProp) => {

      const [todos ,setTodoes] = useState <Todo[]> ([])
    const handleAddTodo =(task :string)=>{
            setTodoes((pre)=>{
                const newTodo : Todo[] =[
                    {
                    id:Math.random().toString(),
                    task:task,
                    commpleted:false,
                    createdAt:new Date()
                },
                ...pre
            ]
            console.log(newTodo);
            
            return newTodo
            })
    }

     const toggleTodoCompleted = (id:string)=> {
    setTodoes((pre)=>{
    let newTodo = pre.map((todo)=> {
        if(todo.id === id){
            return {...todo,commpleted:!todo.commpleted}
        }else{
            return todo
        }
    } )
    return newTodo
    })
  }


    const handelDelteTodo=(id:string)=>{
        setTodoes((pre)=>{
            return pre.filter((filterTodo)=>filterTodo.id !== id)
        })

    }

    return (
        <TodoContext.Provider value={{todos,handleAddTodo,toggleTodoCompleted,handelDelteTodo}}>
        {children}    
        </TodoContext.Provider>
    );
    };


    // consumer

    export const useTodo = () =>{
        const todosConsumer = useContext(TodoContext)
        if(!todosConsumer){
          throw new Error("useTodo must be used within a TodosProvider");
        }
        return todosConsumer
    }