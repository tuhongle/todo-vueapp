import { defineStore } from 'pinia'

import { computed, ref, watchEffect, type Ref } from 'vue'
import { db, colRef } from '../firestore/todoFireStore'
import { type todoType, type priority, type docType } from '../types/todoTypes'
import { query, addDoc, onSnapshot, deleteDoc, doc, updateDoc, orderBy } from 'firebase/firestore'

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
  const tags = ref([]);
  const todos = ref<todoType[]>([]);

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

  const updateSuccess = () => {
    success.value = 0;
    todolist.value.forEach((el) => {
      if (el.isChecked) {
        success.value! ++
      }
    });
  };  

  watchEffect(async()=> {
    total.value = todolist.value.length;
    updateSuccess();
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

  const showdropdownMenu = (id) => {
    document.getElementById(`dropdownTags_${id}`).classList.add('show');
  };

  const hidedropdownMenu = (id) => {
    document.getElementById(`dropdownTags_${id}`).classList.remove('show');
  };

  const handleSelect = (info) => {
    if (!todolist.value[info[1]-1].tags.includes(info[0].title)) {
      todolist.value[info[1] - 1].tags.push(info[0].title);
    };
  };

  

  const doneToDo = (info) => {
    if (!info[1]) {
      document.getElementById(`todo_${info[0]}`).style.opacity = '0.5';
      document.getElementById(`title_${info[0]}`).style.textDecoration = 'line-through';
    } else {
      document.getElementById(`todo_${info[0]}`).style.opacity = '1';
      document.getElementById(`title_${info[0]}`).style.textDecoration = 'none';
    };
  };


  return { colorList, currentToDo, todolist, deleteTodo, enterToDo, clickEnterToDo, total, success, pending, showModal, openModal
          , currentTag, showInputField, showDescField, showPriorityField, showTagField, showColorField, todoDetail, colorTag, resetData, updateData, changeColorTag
          , isAuth, termAgree, name, pass, mail, userMail, userName, loginMsg, signUpMsg
  }
})