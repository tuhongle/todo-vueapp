<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div ref="modal" class="modal fade d-block" data-bs-backdrop="static" id="todoModal" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <Transition appear name="modal">
                <div class="modal-content">
                    <div class="modal-header p-3">
                    <h1 class="modal-title fs-5">Task Detail</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="todoStore.resetData"></button>
                    </div>
                    <div class="modal-body p-3">
                    <div class="modal-input d-flex align-items-center mb-3">
                        <input ref="msgTask" type="text" v-model="todo.msg_task" class="msgTask w-100 border-0 rounded-2 py-2 ps-2 bg-transparent text-secondary lead" :disabled="showInputField">
                        <i v-if="showInputField" class="bi bi-pencil-square ms-3" @click="showInput()"></i>
                    </div>
                    <div class="modal-desc mb-3">
                        <p v-if="!showDescField" class="small text-secondary text-start ps-2">{{ todo.desc }}</p>
                        <p v-if="!showDescField" class="text-primary text-decoration-underline text-end" @click="showDescField = true">Add description</p>
                        <textarea v-if="showDescField" v-model="todo.desc" cols="30" rows="3" class="form-control" placeholder="Write a description text here..."></textarea>
                    </div>
                    <div class="modal-actions mb-4">
                        <div class="row d-flex mb-3">
                            <div class="col-6 text-primary" >
                                <button class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center shadow-sm p-2 rounded-2" @click="showPriorityField = !showPriorityField, showTagField = false">
                                    <i class="bi bi-exclamation fs-5"></i>
                                    <i class="bi bi-exclamation fs-5"></i>
                                    <i class="bi bi-exclamation fs-5"></i>
                                    <p class="mb-0 ms-3">Priority</p>
                                </button>
                            </div>
                            <div class="col-6 text-primary">
                                <button class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center shadow-sm p-2 rounded-2" @click="showTagField = !showTagField, showPriorityField = false">
                                    <i class="bi bi-tags-fill fs-5"></i>
                                    <p class="mb-0 ms-3">Tags</p>
                                </button>
                            </div>
                        </div>
                        <div v-if="showPriorityField" class="row action-priority">
                            <div class="col-12">
                                <div class="shadow p-4 text-secondary text-start">
                                    <p class="">Set priority of your task</p>
                                    <div class="form-check text-start d-flex align-items-baseline">
                                        <input type="radio" class="form-check-input" id="high-priority" name="priority" value="High" v-model="todo.priority">
                                        <label for="high-priority" class="form-check-label d-flex align-items-center mb-0 ms-2">
                                            <i class="bi bi-exclamation text-danger fs-5"></i>
                                            <i class="bi bi-exclamation text-danger fs-5"></i>
                                            <i class="bi bi-exclamation text-danger fs-5"></i>
                                            <span class="ms-3">High</span>
                                        </label>
                                    </div>
                                    <div class="form-check text-start d-flex align-items-baseline">
                                        <input type="radio" class="form-check-input" id="medium-priority" name="priority" value="Medium" v-model="todo.priority">
                                        <label for="medium-priority" class="form-check-label d-flex align-items-center mb-0 ms-2">
                                            <i class="bi bi-exclamation text-tertiary fs-5"></i>
                                            <i class="bi bi-exclamation text-tertiary fs-5"></i>
                                            <span class="ms-3">Medium</span>
                                        </label>
                                    </div>
                                    <div class="form-check text-start d-flex align-items-baseline">
                                        <input type="radio" class="form-check-input" id="low-priority" name="priority" value="Low" v-model="todo.priority">
                                        <label for="low-priority" class="form-check-label d-flex align-items-center mb-0 ms-2">
                                            <i class="bi bi-exclamation text-primary fs-5"></i>
                                            <span class="ms-3">Low</span>
                                        </label>
                                    </div>
                                    <div class="form-check text-start d-flex align-items-baseline">
                                        <input type="radio" class="form-check-input" id="none-priority" name="priority" value="None" v-model="todo.priority">
                                        <label for="none-priority" class="form-check-label d-flex align-items-center mb-0 ms-2">
                                            <i class="bi bi-exclamation text-dark fs-5"></i>
                                            <i class="bi bi-exclamation text-dark fs-5"></i>
                                            <i class="bi bi-exclamation text-dark fs-5"></i>
                                            <span class="ms-3">None</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="showTagField" class="row action-tags">
                            <div class="col-12">
                                <div class="shadow p-4 text-secondary text-start">
                                    <input type="text" placeholder="Enter tag" class="form-control border-0 outline-none mb-3 shadow p-3" v-model="currentTag" @keydown.enter="todo.tags.push(currentTag), currentTag = ''">
                                    <div v-if="showColorField">
                                        <Transition appear name="color">
                                            <colorDropdown @chooseColor="changeColorTag" />
                                        </Transition>
                                    </div>
                                    <div class="pe-3">
                                        <div class="form-check text-start d-flex align-items-baseline ps-2" v-for="(tag, index) in todo.tags" :key="index">
                                            <label class="form-check-label d-flex align-items-center mb-0">
                                                <i class="bi bi-tags-fill" role="button" aria-expanded="false" @click="openColorField($event)"></i>
                                                <span class="ms-2">{{ tag }}</span>
                                            </label>
                                            <input type="checkbox" class="form-check-input ms-auto" :value="tag" v-model="todo.tags">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="modal-footer p-3">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="todoStore.resetData">Cancel</button>
                    <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" @click="todoStore.updateData(todo, todo.id)">Save changes</button>
                    </div>
                </div>
            </Transition>
        </div>
    </div> 
</template>

<script setup lang="ts">
import colorDropdown from './colorDropdown.vue';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watchEffect } from 'vue';
import { useTodoStore } from '../stores/todoStore';
import { type todoType, colorEnum } from '../types/todoTypes';


const props = defineProps<{
    todoProps: todoType;
}>();

// use pinia Store
const todoStore = useTodoStore();
const todo = ref<todoType>(props.todoProps);
const modal = ref<any>(null);
const msgTask = ref<any>(null);

const { currentTag, showDescField, showInputField, showPriorityField, showTagField, showColorField, tags } = storeToRefs(todoStore);

onMounted(() => {
    modal.value.classList.add('show');
    modal.value.style.backgroundColor = '#000000d9';
})


const openColorField = (el: MouseEvent) => {
    showColorField.value = !showColorField.value;
    (el.target as Element).classList.add('activeTag');
}

const changeColorTag = (data: string) => {
    (document.querySelector('.activeTag')! as HTMLElement).style.color = colorEnum[`${data}` as keyof typeof colorEnum];
    document.querySelector('.activeTag')!.classList.remove('activeTag');
    showColorField.value = false;
}

const showInput = () => {
    showInputField.value = false;
    setTimeout(() => {
        msgTask.value.focus();
    }, 10);
};

</script>

<style scoped>
.modal-enter-from,
.modal-leave-to {
  transform: translateY(-200px);
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s linear;
}

.color-enter-from,
.color-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.color-enter-active,
.color-leave-active {
    transition: all 0.5s ease;
}
</style>