import * as React from 'react';
import {useState} from 'react';

const TaskForm = ({addTaskForm}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');




  const handleOnAddTask = (evt: React.FormEvent) => {
    evt.preventDefault();

    addTaskForm({
      title: title,
      description: description,
    })

    setTitle('');
    setDescription('');
  }

  return(
    <form  className='task--form' onSubmit={handleOnAddTask}>
      <input className='task__form--title' type='text' onChange={(evt) => setTitle(evt.target.value)} value={title} placeholder='Task title' required/>
      <textarea className='task__form--description'  onChange={(evt) => setDescription(evt.target.value)} value={description} placeholder='Task description'></textarea>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default TaskForm;
