import {auth, dataBase} from '../firebase.ts';
import { addDoc, getDocs, getDoc, collection, deleteDoc, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import type {TaskType} from '../types/task-type.ts';
import type {BoardType} from '../types/board-type.ts';
import { Timestamp } from 'firebase/firestore';

export const addTaskRequest = async (itemData:  Omit<TaskType, 'id' | 'completedStatus'>) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  try {
    const docRef = await addDoc(
      collection(dataBase, 'users', user.uid, 'tasks'),
      {
        ...itemData,
        userId: user.uid,
      }
    );
    return docRef;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

export const deleteTaskRequest = async (itemId: string) => {
  const user = auth.currentUser;
  if (!user) return () => {};

  try {
    await deleteDoc(doc(dataBase, 'users', user.uid, 'tasks', itemId));
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
  const user = auth.currentUser;
  if (!user) return () => {};

  return onSnapshot(collection(dataBase, 'users', user.uid, 'tasks'), (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      deadline: doc.data().deadline instanceof Timestamp
        ? doc.data().deadline.toDate()
        : null,
    } as TaskType));
    callback(data);
  });
}

export const updateTaskRequest = async ( task: TaskType) => {
  const user = auth.currentUser;
  if (!user) return () => {};

  try {
    const { id, ...data } = task;
    const taskRef = doc(dataBase, 'users', user.uid, 'tasks', id);
    await updateDoc (taskRef, data);
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
}


export const addBoardSettings = async (boardData: BoardType) => {
  const user = auth.currentUser;
  if (!user) return () => {};

  try {
    const docRef = doc(dataBase, 'users', user.uid, 'boardSettings', 'currentBoardSettings');
    await setDoc(docRef, boardData, { merge: true });
    return docRef;
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
}

export const subscribeToBoardSettings = (callback: (boards: BoardType[]) => void) => {
  const user = auth.currentUser;
  if (!user) return () => {};

  return onSnapshot(collection(dataBase, 'users', user.uid, 'boardSettings'), (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BoardType[];

    callback(data);
  })
}

export const getUserTheme = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (!user) return '';

  const docRef = doc(dataBase, 'users', user.uid, 'preferences', 'theme');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().theme : null;
}

export const setUserTheme = async (theme: string | null) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const docRef = doc(dataBase, 'users', user.uid, 'preferences', 'theme');
    await setDoc(docRef, { theme }, { merge: true });
  } catch (error) {
    console.error('Error updating theme:', error);
    throw error;
  }
};
