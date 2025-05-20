import {dataBase} from '../firebase.ts';
import { addDoc, getDocs, collection, deleteDoc, doc, onSnapshot} from 'firebase/firestore';
import type {TaskType} from '../types/task-type.ts';

export const addTask = async (itemData: TaskType) => {
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
  }
}

export const getTasks = async () => {
  const querySnapshot = await getDocs(collection(dataBase, 'tasks'));
  return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as TaskType));
}

export const subscribeToTasks = (callback) => {
  return onSnapshot(collection(dataBase, 'tasks'), (snapshot) => {
    const data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as TaskType));
    callback(data);
  });
}
