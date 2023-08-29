import { defineStore } from 'pinia'

import { computed, ref, watch, type Ref } from 'vue'
import { db, colRef } from '../firestore/todoFireStore'
import { type todoType, type docType } from '../types/todoTypes'
import { query, addDoc, onSnapshot, deleteDoc, doc, updateDoc, orderBy } from 'firebase/firestore'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth"

export const useTodoStore = defineStore('todo', () => {
  const colorList : string[] = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8', 'color9', 'color10', 'color11', 'color12', 'color13', 'color14', 'color15', 'color16', 'color17', 'color18', 'color19'];

  const isAuth : Ref<boolean> = ref(false);
  const termAgree : Ref<boolean> = ref(true);
  const mail = ref<string>('');
  const pass = ref<string>('');
  const name = ref<string>('');

  const userMail = ref<string>("");
  const userName = ref<string>("");

  const loginMsg = ref<string>("");
  const signUpMsg = ref<string>("");


  const $reset = () => {
      mail.value = '';
      pass.value = '';
      name.value = '';
      loginMsg.value = '';
      signUpMsg.value = '';
  }

  const resetData = () => {
    showInputField.value = true;
    showDescField.value = false;
    showPriorityField.value = false;
    showTagField.value = false;
    showColorField.value = false;
    showModal.value = false;
  };

  const updateData = async(data: todoType, id: string) => {
    showInputField.value = true;
    showDescField.value = false;
    showPriorityField.value = false;
    showTagField.value = false;
    showColorField.value = false;
    showModal.value = false;
    const docRef = doc(db, 'todos', id);
    await updateDoc(docRef, {
      msg_task: data.msg_task,
      priority: data.priority,
      tags: data.tags,
      desc: data.desc,
      date: data.date,
      isChecked: data.isChecked
    });
  };

  // Declare variables of homeview
  const total = ref<number>();
  const success = ref<number>();
  const pending = ref<number>();
  const currentToDo = ref('');
  const showModal = ref<boolean>(false);
  const todos = ref<todoType[]>([]);
  const showTag = ref<boolean>(false);

   // Declare variables of modal
   const currentTag = ref<string>('');
   const showInputField = ref<boolean>(true);
   const showDescField = ref<boolean>(false);
   const showPriorityField = ref<boolean>(false);
   const showTagField = ref<boolean>(false);
   const showColorField = ref<boolean>(false);
   const todoDetail = ref<todoType>();
   const colorTag = ref<string>();

  // Declare methods work with firestore
  const q = query(colRef, orderBy('date'));
  onSnapshot(q, (querySnapshot) => {
    const todoRef : todoType[] = [];
    querySnapshot.forEach((doc: docType) => {
      todoRef.push({...doc.data(), id: doc.id})
    })
    todos.value = todoRef;
  });

  const todolist = computed<todoType[]>(() => {
    return JSON.parse(JSON.stringify(todos.value));
  });

  const addTodo = async() => {
    await addDoc(colRef, {
      msg_task: currentToDo.value,
      priority: 'None',
      tags: [],
      desc: '',
      date: new Date().toDateString().slice(4,10),
      isChecked: false
    })  
  }

  const deleteTodo = async(id: string) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  const clearAll = () => {
    todolist.value.forEach(async(el) => {
      await deleteDoc(doc(db, 'todos', el.id))
    })
  }

  watch(todolist, () => {
    total.value = todolist.value.length;
    success.value = todolist.value.filter(el => el.isChecked).length;
    pending.value = total.value! - success.value!;
  })

  /* declare methods */
  const enterToDo = async (el : KeyboardEvent) => {
    if (el.key === "Enter") {
      await addTodo();
      currentToDo.value = '';
    }
  };

  const clickEnterToDo = async () => {
    await addTodo();
    currentToDo.value = '';
  };

  const openModal = (data: todoType) => {
    todoDetail.value = data;
    showModal.value = true;
  }

  const changeColorTag = (data: string) => {
    colorTag.value = data;
    showColorField.value = !showColorField.value;
  }

  const showDropdownTag = (id: string) => {
    showTag.value = !showTag.value;
    const tag = document.querySelector(`#dropdownTags_${id}`)!;
    if (tag.classList.contains('show')) {
      tag.classList.remove('show')
    } else {
      tag.classList.add('show')
    }
  }
  

  const doneToDo = async (data : boolean, id: string) => {
    await updateDoc(doc(db, 'todos', id), {
      isChecked: data
    });
  };

  // declare firestore auth functions

  const auth = getAuth();

  const signUp = async() => {
    if (termAgree.value) {
      await createUserWithEmailAndPassword(auth, mail.value, pass.value);
      $reset();
    } else {
      signUpMsg.value = 'Please agree our terms and conditions';
    }
  }

  return { colorList, currentToDo, todolist, deleteTodo, enterToDo, clickEnterToDo, total, success, pending, showModal, showTag, openModal, doneToDo, clearAll, showDropdownTag
          , currentTag, showInputField, showDescField, showPriorityField, showTagField, showColorField, todoDetail, colorTag, resetData, updateData, changeColorTag
          , isAuth, termAgree, name, pass, mail, userMail, userName, loginMsg, signUpMsg, signUp
  }
})