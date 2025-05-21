import {dataBase} from '../firebase.ts';
import { addDoc, getDocs, collection, deleteDoc, doc, onSnapshot, updateDoc} from 'firebase/firestore';
import type {TaskType} from '../types/task-type.ts';

export const addTask = async (itemData:  Omit<TaskType, 'id' | 'completedStatus'>) => {
  try {
    const docRef = await addDoc(collection(dataBase, 'tasks'), itemData);
    return docRef;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

export const deleteTask = async (itemId: string) => {
  try {
    await deleteDoc(doc(dataBase, 'tasks', itemId));
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
}

export const getTasks = async () => {
  const querySnapshot = await getDocs(collection(dataBase, 'tasks'));
  return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as TaskType));
}

export const subscribeToTasks = (callback: (tasks: TaskType[]) => void ) => {
  console.log(callback);
  return onSnapshot(collection(dataBase, 'tasks'), (snapshot) => {
    const data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as TaskType));
    callback(data);
  });
}

export const updateTask = async ( task: TaskType) => {
  try {
    const { id, ...data } = task;
    const taskRef = doc(dataBase, 'tasks', id);
    await updateDoc (taskRef, data);
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
}
