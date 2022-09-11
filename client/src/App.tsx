
import React from 'react'
import useSWR from 'swr'
import AddTodo from './components/AddTodo';

export interface Todo{
  id:Number,
  title:string,
  body: string,
  done:boolean
}
export const ENDPOINT = "http://localhost:4000"

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {

  const {data,mutate} = useSWR<Todo[]>("api/todos",fetcher)

  async function markTodo(id:unknown) {

    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH"
    }).then(r => r.json())
    mutate(updated)
  }
  return (
    <div>
      <div>
        {/* {JSON.stringify(data)} */}
        <div className="">
          {
            data?.map((todo) => {
              return <div className="" 
              onClick={() => markTodo(todo.id)}
              key={`todo_list_${todo.id}`} >
                {todo?.title}
                {todo?.body}
                {
                  todo.done ? "true" : "false"
                }
              </div>
            })
          }
        </div>
        <AddTodo mutate={mutate}/>
      </div>
      
    </div>
  )
}

export default App