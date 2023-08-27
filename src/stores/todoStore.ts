import { defineStore } from 'pinia'
import { computed, ref, watchEffect, type Ref } from 'vue'
import { db, colRef } from '../firestore/todoFireStore'
import { type todo, type priority, type docType } from '../types/todoTypes'
import { addDoc, onSnapshot, type DocumentData, deleteDoc, doc } from 'firebase/firestore'

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

  const total = ref<number>();
  const success = ref<number>();
  const pending = ref<number>();
  const currentDay = ref('');
  const currentToDo = ref('');
  const tags = ref([]);
  const todos = ref<todo[]>([]);

  const todolist = computed<todo[]>(() => {
    const todos : todo[] = [];
    onSnapshot(colRef, (querySnapshot) => {
      querySnapshot.forEach((doc: docType) => {
        todos.push({ ...doc.data(), id: doc.id })
      });
    });
    return todos;
  })

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

  watchEffect(()=> {
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

  return { colorList, currentToDo, todolist, deleteTodo, enterToDo, clickEnterToDo, total, success, pending,
          isAuth, termAgree, name, pass, mail, userMail, userName, loginMsg, signUpMsg
  }
})