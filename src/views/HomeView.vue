<template>
  <section class="todolist p-3 p-md-5 bg-white rounded rounded-3">
    <div class="container-md todo">
      <div class="row mb-4">
        <div class="col d-flex align-items-center">
          <h1 class="fw-bold w-auto mb-0">TODO-LIST</h1>
          <div v-if="!todoStore.isAuth" class="col text-end authen">
            <RouterLink :to="{name: 'login'}" class="me-3 text-decoration-none text-muted">Log In</RouterLink>
            <RouterLink :to="{name: 'signup'}" class="text-decoration-none text-muted">Sign Up</RouterLink>
          </div>
          <div v-else class="col avatar text-end">
            <div class="dropdown">
              <button class="btn btn-transparent border-0" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                <img v-if="todoStore.userAvatar" :src="todoStore.userAvatar" alt="avatar" width="60" height="60" class="object-fit-cover rounded-circle">
                <img v-else src="/avatar.png" alt="avatar" width="60" height="60" class="object-fit-cover rounded-circle">
              </button>
              <ul class="dropdown-menu rounded-3 p-4">
                <li class="dropdown-item text-center mb-2 bg-transparent text-primary text-decoration-underline">{{ todoStore.userMail }}</li>
                <li class="dropdown-item text-center mb-2 bg-transparent">
                  <img v-if="todoStore.userAvatar" :src="todoStore.userAvatar" alt="avatar" width="60" height="60" class="object-fit-cover rounded-circle">
                  <img v-else src="/avatar.png" alt="avatar" width="100" height="100" class="object-fit-cover rounded-circle">
                </li>
                <li class="dropdown-item text-center mb-2 bg-transparent">
                  <p v-if="todoStore.userName" class="lead mb-0">Hi, <span class="small fst-italic">{{ todoStore.userName }}</span>!</p>
                  <p v-else class="lead mb-0">Hi, <span class="small fst-italic">{{ todoStore.userMail }}</span>!</p>
                </li>
                <li class="dropdown-item text-center mb-2 bg-transparent">
                  <div class="btn-group" role="group" aria-label="Basic button group">
                    <button class="btn btn-outline-primary" type="button" @click="todoStore.logOut">
                      <i class="bi bi-box-arrow-right me-1"></i>
                      Sign Out
                    </button>
                    <button class="btn btn-outline-primary" type="button" @click="todoStore.wantToDel = !todoStore.wantToDel">
                      <i class="bi bi-person-x me-2"></i>
                      <span v-if="!todoStore.wantToDel">Delete Acc</span>
                      <span v-else>Not Delete</span>
                    </button>
                  </div>
                </li>
                <li v-if="todoStore.wantToDel" class="dropdown-item text-center mb-2 bg-transparent text-primary text-decoration-underline">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" v-model="todoStore.confirmDelete">
                    Please confirm to delete your account!
                  </label>
                  <button v-if="todoStore.confirmDelete" class="btn btn-primary text-light ms-2" @click="todoStore.deleteAcc">Del</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-if="todoStore.isAuth">
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
        <div class="row lists mb-3 py-3 border-bottom" v-for="todo in todoStore.todolist" :key="todo.id">
          <div class="row list" :class="{'opacity-50 text-decoration-line-through': todo.isChecked}">
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
                    <!-- dropdown tag -->
                    <i class="bi bi-tag-fill fs-5 text-secondary" @click.stop="todoStore.showDropdownTag(todo.id)"></i>
                    <!-- ========= -->
                    <Transition name="tag" v-show="todoStore.showTag">
                      <ul class="dropdown-menu" :id="'dropdownTags_' + todo.id">
                        <li class="dropdown-item text-center text-secondary disabled">
                          <i class="bi bi-tags-fill"></i>
                          <span class="ms-2">Tags</span>
                        </li>
                        <li class="dropdown-item py-0"><hr class="my-1"></li>
                        <li class="dropdown-item text-center dropdownTags" v-for="tag in todo.tags" :key="tag">{{ tag }}</li>
                      </ul>
                    </Transition>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-3 d-flex align-items-center">
              <div class="row align-items-center w-100">
                <div class="col text-secondary">{{ todo.date }}</div>
                <div class="col d-flex align-items-center justify-content-end">
                  <!-- done todo -->
                  <input type="checkbox" class="form-check-input mt-0 border-info me-0 me-md-3" v-model="todo.isChecked" @click="todoStore.doneToDo(!todo.isChecked, todo.id)" />
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
      </div>
      <div v-else>
        <div class="display-4">
          <img src="/background.png" alt="background" class="img-fluid">
          <p>Hello from bottom of my heart!</p>
          <p class="my-4">Please <RouterLink :to="{ name: 'login' }">login</RouterLink> or <RouterLink :to="{ name: 'signup' }">signup</RouterLink></p>
          <p class="fw-bold">Thank you!</p>
        </div>
      </div>

      <!-- Modal -->
      <Teleport to="#modal" v-if="todoStore.showModal">
          <!-- <TodoModal :todo="todo" @select="handleSelect" @color="changeColorTag"/> -->
          <TodoModal :todoProps="JSON.parse(JSON.stringify(todoStore.todoDetail))"/>
      </Teleport>
      <!-- CLEAR ALL -->
      <div v-if="todoStore.isAuth" class="row clear">
        <button v-if="todoStore.todolist.length" class="w-auto btn bg-transparent text-info border-0 text-start d-flex align-items-center" @click="todoStore.clearAll">
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

<style scoped>
.tag-enter-from, 
.tag-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.tag-enter-active,
.tag-leave-active {
  transition: all 0.3s linear;
}
</style>