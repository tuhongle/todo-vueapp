import { defineStore } from 'pinia'

import { computed, ref, watch, type Ref } from 'vue'
import { db, colRef, auth } from '../firestore/todoFireStore'
import { type todoType } from '../types/todoTypes'
import { query, addDoc, onSnapshot, deleteDoc, doc, updateDoc, orderBy } from 'firebase/firestore'
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { useRouter } from 'vue-router'

export const useTodoStore = defineStore('todo', () => {
  const colorList : string[] = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8', 'color9', 'color10', 'color11', 'color12', 'color13', 'color14', 'color15', 'color16', 'color17', 'color18', 'color19'];

  const router = useRouter();
  const isAuth : Ref<boolean> = ref(false);
  const termAgree : Ref<boolean> = ref(true);
  const keepSignIn : Ref<boolean> = ref(true);
  const wantToDel = ref<boolean>(false);
  const confirmDelete = ref<boolean>(false);

  const mail = ref<string>('');
  const pass = ref<string>('');
  const name = ref<string>('');
  const url = ref<string>('');

  const userMail = ref<string>("");
  const userName = ref<string>("");
  const userAvatar = ref<string>('');

  const loginMsg = ref<string>("");
  const signUpMsg = ref<string>("");
  const sendMailResetMsg = ref<string>('');
  const sendEmailPass = ref<boolean>(true);


  const $reset = () => {
      mail.value = '';
      pass.value = '';
      name.value = '';
      url.value = '';
      loginMsg.value = '';
      signUpMsg.value = '';
      sendMailResetMsg.value = '';
      wantToDel.value = false;
      confirmDelete.value = false;
      sendEmailPass.value = true;
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
    querySnapshot.forEach((doc: any) => {
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
    if (showTag.value) {
      showTag.value = false;
    } else {
      showTag.value = true;
    };
    const tag = document.querySelector(`#dropdownTags_${id}`)!;
    if (tag.classList.contains('show')) {
      tag.classList.remove('show')
    } else {
      tag.classList.add('show')
    }
    setTimeout(() => {
      showTag.value = false;
      tag.classList.remove('show');
    }, 2000);
  }
  

  const doneToDo = async (data : boolean, id: string) => {
    await updateDoc(doc(db, 'todos', id), {
      isChecked: data
    });
  };

  // declare firestore auth functions

  const signUp = async() => {
    try {
      if (termAgree.value) {
        await createUserWithEmailAndPassword(auth, mail.value, pass.value);
        await updateProfile(auth.currentUser!, {
          displayName: name.value,
          photoURL: url.value,
        });
        const user = auth.currentUser;
        if (user) {
          userMail.value = user.email!;
          userName.value = user.displayName!;
          userAvatar.value = user.photoURL!;
        };
        $reset();
        router.push('/');
      } else {
        signUpMsg.value = 'Please agree our terms and conditions';
      }
    }
    catch (err: any) {
      if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
        signUpMsg.value = 'That mail is taken. Please try another.'
      }
    }
  }

  const logIn = async() => {
    try {
      await signInWithEmailAndPassword(auth, mail.value, pass.value);
      $reset();
      router.push('/');
    }
    catch (err: any) {
      switch (err.code) {
        case "auth/user-not-found":
        loginMsg.value = "Couldn't find your account";
        break;
        case "auth/wrong-password":
        loginMsg.value = 'Wrong password. Try again or click Forgot password to reset it.'
        break;
      }
    }
  }

  const logOut = async() => {
    await signOut(auth);
  }

  const deleteAcc = async() => {
    await deleteUser(auth.currentUser!);
  }

  const sendMailResetPass = async() => {
    try {
      await sendPasswordResetEmail(auth, mail.value);
      sendEmailPass.value = false;
    }
    catch (err : any) {
      if (err.code === 'auth/user-not-found') {
        sendMailResetMsg.value = "Email address is not valid";
      }
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuth.value = true;
      userMail.value = user.email!;
      userName.value = user.displayName!;
      userAvatar.value = user.photoURL!;
    } else {
      isAuth.value = false;
      wantToDel.value = false;
      confirmDelete.value = false;
    }
  })

  return { colorList, currentToDo, todolist, deleteTodo, enterToDo, clickEnterToDo, total, success, pending, showModal, showTag, openModal, doneToDo, clearAll, showDropdownTag
          , currentTag, showInputField, showDescField, showPriorityField, showTagField, showColorField, todoDetail, colorTag, resetData, updateData, changeColorTag
          , isAuth, termAgree, keepSignIn, name, pass, mail, url, userMail, userName, userAvatar, loginMsg, signUpMsg, wantToDel, confirmDelete, signUp, logIn, logOut, deleteAcc
          , sendMailResetMsg, sendEmailPass, sendMailResetPass
  }
})