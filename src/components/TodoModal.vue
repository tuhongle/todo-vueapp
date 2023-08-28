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
                        <input type="text" v-model="todo.msg_task" class="w-100 border-0 border-info py-2 ps-2 text-secondary lead">
                        <i v-if="showInputField" class="bi bi-pencil-square ms-3" @click="showInput($event, todo.id), showInputField = false"></i>
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
                                    <input type="text" placeholder="Enter tag" class="form-control border-0 outline-none mb-3 shadow p-3" v-model="currentTag" @keydown="enterTag($event)">
                                    <div v-if="showColorField">
                                        <Transition appear name="color">
                                            <colorDropdown />
                                        </Transition>
                                    </div>
                                    <div class="pe-3">
                                        <div class="form-check text-start d-flex align-items-baseline ps-2" v-for="(tag, index) in todo.tags" :key="index">
                                            <label class="form-check-label d-flex align-items-center mb-0">
                                                <i class="bi bi-tags-fill" :class="'text-' + tag.color" role="button" aria-expanded="false" @click="todoStore.changeColorTag(tag.color)"></i>
                                                <span class="ms-2">{{ tag.title }}</span>
                                            </label>
                                            <input type="checkbox" class="form-check-input ms-auto" :value="tag.title" v-model="tag.title">
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
import { onMounted, ref } from 'vue';
import { useTodoStore } from '../stores/todoStore';
import { type todoType } from '../types/todoTypes';


const props = defineProps<{
    todoProps: todoType;
}>();

const emit = defineEmits(['select', 'color']);


// use pinia Store
const todoStore = useTodoStore();
const todo = ref<todoType>(props.todoProps);
const modal = ref<any>(null);

onMounted(() => {
    modal.value.classList.add('show');
    modal.value.style.backgroundColor = '#000000d9';
})

const { currentTag, showDescField, showInputField, showPriorityField, showTagField, showColorField } = storeToRefs(todoStore);


// /* declare methods */
// const showInput = (el, id) => {
//     document.querySelector(`input#todo_${id}`).focus();
//     el.target.style.display = 'none';
// };
// const enterTag = (el) => {
//     if (el.key === 'Enter') {
//         tags.value.push({title: currentTag.value, color: ''});
//         currentTag.value = '';
//     }
// };


/* tags.value.push({title: 'Home', color: todoStore.colorList[3]});
tags.value.push({title: 'Personal', color: todoStore.colorList[8]});
tags.value.push({title: 'Work', color: todoStore.colorList[5]}); */

/* watchEffect(() => {
    emit('color', [tags.value]);
}, tags.value); */

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