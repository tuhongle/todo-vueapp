import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router';

export const useTodoStore = defineStore('todo', () => {
    const colorList : string[] = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8', 'color9', 'color10', 'color11', 'color12', 'color13', 'color14', 'color15', 'color16', 'color17', 'color18', 'color19']
    const longURL : Ref<string> = ref('');
    const shortenURL : Ref<string> = ref('');
    const token : string = import.meta.env.VITE_TOKEN_TLY;
    const isShortening : Ref<boolean> = ref(false);
    const home = ref<boolean>(false);

    const Router = useRouter();
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

    return { colorList, longURL, shortenURL, home, isShortening, $reset,
            isAuth, termAgree, name, pass, mail, userMail, userName, loginMsg, signUpMsg
    }
})