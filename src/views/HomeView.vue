<template>
  <section class="todolist p-3 p-md-5 bg-white rounded rounded-3">
    <div class="container-md todo">
      <div class="row mb-4">
        <div class="col d-flex align-items-center">
          <h1 class="fw-bold w-auto mb-0">TODO-LIST</h1>
          <div class="col text-end">
            <RouterLink :to="{name: 'login'}" class="me-3 text-decoration-none text-muted">Log In</RouterLink>
            <RouterLink :to="{name: 'signup'}" class="text-decoration-none text-muted">Sign Up</RouterLink>
          </div>
          <div class="col avatar text-end">
            <img src="/avatar.jpg" alt="avatar" width="60" height="60" class="object-fit-cover rounded-circle">
          </div>
        </div>
      </div>
      <div class="row tasks mb-4">
        <div class="col px-1">
          <p class="text-start fw-bold small bg-primary py-1 px-2 text-white rounded rounded-3 py-3">TOTAL: <span class="ms-0 ms-md-2">{{ todoStore.total }}</span></p>
        </div>
        <div class="col px-1">
          <p class="text-start fw-bold small bg-success py-1 px-2 text-white rounded rounded-3 py-3">SUCCESS: <span class="ms-0 ms-md-2">{{ todoStore.success }}</span></p>
        </div>
        <div class="col px-1">
          <p class="text-start fw-bold small bg-tertiary py-1 px-2 text-white rounded rounded-3 py-3">PENDING: <span class="ms-0 ms-md-2">{{ todoStore.pending }}</span></p>
        </div>
      </div>
      <div class="row input mb-4 border-bottom border-1 border-info align-items-center">
        <!-- Enter new todo -->
        <input type="text" placeholder="Enter New To-Do" class="form-control w-100 border-0 shadow-none" v-model="todoStore.currentToDo" @keydown="todoStore.enterToDo($event)">
        <i class="bi bi-arrow-right-short fs-1" @click="todoStore.clickEnterToDo"></i>
        <!-- ---- Exit new todo ---- -->
      </div>
      <div class="row lists mb-3 py-3 border-bottom" v-for="todo in todoStore.todolist" :key="todo.id" :id="'todo_'+todo.id">
        <div class="row list">
          <div class="col-9" @click="todoStore.openModal(todo)">
            <div class="row text-start">
              <div class="col-12 col-md-8 d-flex align-items-center mb-3 mb-md-0">
                <i class="bi bi-grip-vertical fs-4"></i>
                <p class="lead text-secondary mb-0 ms-2" :id="'title_'+todo.id"> {{ todo.msg_task }}</p>
              </div>
              <div class="col-12 col-md-4 d-flex align-items-center">
                <div v-if="todo.priority" class="d-flex align-items-center">
                  <i class="bi bi-circle-fill small" :class="{'text-primary': todo.priority === 'Low', 'text-danger': todo.priority === 'High', 'text-warning': todo.priority === 'Medium'}"></i>
                  <p class="ms-2 mb-0 text-secondary">{{ todo.priority }} Priority</p>
                </div>
                <div v-else class="d-flex align-items-center">
                  <i class="bi bi-circle-fill text-info small"></i>
                  <p class="ms-2 mb-0 text-secondary">None Priority</p>
                </div>
                <div class="dropdown ms-auto">
                  <i class="bi bi-tag-fill fs-5 text-secondary"></i>
                  <ul class="dropdown-menu" :id="'dropdownTags_' + todo.id">
                    <li class="dropdown-item text-center text-secondary disabled">
                      <i class="bi bi-tags-fill"></i>
                      <span class="ms-2">Tags</span>
                    </li>
                    <li class="dropdown-item py-0"><hr class="my-1"></li>
                    <li class="dropdown-item text-center dropdownTags" :id="tag+'_'+todo.id" v-for="tag in todo.tags" :key="tag">{{ tag }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3 d-flex align-items-center">
            <div class="row align-items-center w-100">
              <div class="col text-secondary">{{ todo.date }}</div>
              <div class="col d-flex align-items-center justify-content-end">
                <!-- done todo -->
                <input type="checkbox" class="form-check-input mt-0 border-info me-0 me-md-3" v-model="todo.isChecked" @click="doneToDo([todo.id, todo.isChecked])">
                <!-- ======= -->
                <!-- delete todo -->
                <button class="btn p-0" @click="todoStore.deleteTodo(todo.id)">
                  <i class="bi bi-trash text-info d-flex align-items-center"></i>
                </button>
                <!-- ======= -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <Teleport to="#modal" v-if="todoStore.showModal">
          <!-- <TodoModal :todo="todo" @select="handleSelect" @color="changeColorTag"/> -->
          <TodoModal :todoProps="JSON.parse(JSON.stringify(todoStore.todoDetail))"/>
      </Teleport>
      <!-- CLEAR ALL -->
      <div class="row clear">
        <button v-if="todoStore.todolist.length" class="w-auto btn bg-transparent text-info border-0 text-start d-flex align-items-center">
          <span>Clear All</span>
          <i class="bi bi-trash fs-5 ms-3"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTodoStore } from '../stores/todoStore';
import TodoModal from '../components/TodoModal.vue';

const todoStore = useTodoStore();

</script>