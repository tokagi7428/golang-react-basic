import React, { useState } from 'react'
import {useForm} from "@mantine/form"
import { ENDPOINT,Todo } from '../App'
import {KeyedMutator} from 'swr'


function AddTodo({mutate}:{mutate:KeyedMutator<Todo[]>}) {
    const [open,setOpen] = useState(false)
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    
    const form = useForm({
        initialValues: {
            title: '',
            body: ''
        }
    })
    console.log(form.values)
    async function createTodo(values: {title:string, body:string}) {
        
        
        const updated = await fetch(`${ENDPOINT}/api/todos`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(values)
        }).then(r => r.json())
        mutate(updated)
        form.reset()
        setOpen(false)
    }
  return (
    <div>
        <form onSubmit={form.onSubmit(createTodo)}>
            <h3>Create Todo</h3>
            <div className='form-group'>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" onChange={(e) => form.setFieldValue('title',e.target.value)}/>
            </div>
            <div className='form-group'>
                <label htmlFor="body">Body</label>
                <input type="text" name="body" id="body" onChange={(e) => form.setFieldValue('body',e.target.value)}/>
            </div>
            <button type="submit">Create Todo</button>
        </form>
    </div>
  )
}

export default AddTodo