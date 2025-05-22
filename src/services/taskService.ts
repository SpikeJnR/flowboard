import {dataBase} from '../firebase.ts';
import { addDoc, getDocs, collection, deleteDoc, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import type {TaskType} from '../types/task-type.ts';
import type {BoardType} from '../types/board-type.ts';

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


export const addBoardSettings = async (boardData: BoardType) => {
  try {
    const docRef = doc(dataBase, 'boardSettings', 'currentBoardSettings');
    await setDoc(docRef, boardData, { merge: true });
    return docRef;
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
}

export const subscribeToBoardSettings = (callback: (boards: BoardType[]) => void) => {
  return onSnapshot(collection(dataBase, 'boardSettings'), (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BoardType[];

    callback(data);
  })
}
