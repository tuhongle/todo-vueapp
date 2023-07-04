<template>
  <section class="todolist p-5 bg-white rounded rounded-3">
    <div class="container-md todo">
      <div class="row align-items-center mb-4">
        <h1 class="fw-bold w-auto mb-0">TODO-LIST</h1>
        <div class="avatar w-auto ms-auto">
          <img src="../assets/avatar.jpg" alt="avatar" width="60" height="60" class="object-fit-cover rounded-circle">
        </div>
      </div>
      <div class="row tasks mb-4">
        <div class="col-4 px-1">
          <p class="text-start fw-bold small bg-primary py-1 px-2 text-white rounded rounded-3">TOTAL: <span class="ms-0 ms-md-2">{{ total }}</span></p>
        </div>
        <div class="col-4 px-1">
          <p class="text-start fw-bold small bg-success py-1 px-2 text-white rounded rounded-3">SUCCESS: <span class="ms-0 ms-md-2">{{ success }}</span></p>
        </div>
        <div class="col-4 px-1">
          <p class="text-start fw-bold small bg-tertiary py-1 px-2 text-white rounded rounded-3">PENDING: <span class="ms-0 ms-md-2">{{ pending }}</span></p>
        </div>
      </div>
      <div class="row input mb-4 border-bottom border-1 border-info align-items-center">
        <input type="text" placeholder="Enter New To-Do" class="form-control w-100 border-0 shadow-none">
        <i class="bi bi-arrow-right-short fs-1"></i>
      </div>
      <div class="row lists mb-3 py-3" v-for="todo in todolist" :key="todo.id">
        <div class="row list">
          <div class="col-9" data-bs-toggle="modal" :data-bs-target="'#list_'+todo.id">
            <div class="row text-start">
              <div class="col-12 col-md-8 d-flex align-items-center mb-3 mb-md-0">
                <i class="bi bi-grip-vertical fs-4"></i>
                <p class="lead text-secondary mb-0 ms-2"> {{ todo.msg_task }}</p>
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
                <i class="bi bi-tag-fill fs-5 ms-auto text-secondary"></i>
              </div>
            </div>
          </div>
          <div class="col-3 d-flex align-items-center">
            <div class="date text-secondary">{{ currentDay }}</div>
            <div class="icons d-flex align-items-center ms-auto">
              <input type="checkbox" class="form-check-input mt-0 me-3 border-info">
              <i class="bi bi-trash text-info fs-5"></i>
            </div>
          </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" :id="'list_'+todo.id" tabindex="-1" aria-hidden="true">
          <Modal :todo="todo"/>
        </div>
      </div>
      <!-- CLEAR ALL -->
      <div class="row clear">
        <button v-if="todolist.length" class="w-auto btn bg-transparent text-info border-0 text-start d-flex align-items-center" @click="todolist=[]">
          <span>Clear All</span>
          <i class="bi bi-trash fs-5 ms-3"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import Modal from './Modal.vue'

export default {
  name: 'ToDo',
  components: {Modal},
  data() {
    return {
      total: null,
      success: null,
      pending: null,
      currentDay: null,
      currentID : 4,
      todolist: [
        {id: 1, msg_task: "Standup meeting with the team @5pm", priority: "Low", tags: ['Personal'], desc: "", date: "Jul 03"},
        {id: 2, msg_task: "Order pizza for Granny tonight", priority: "High", tags: ['Home', 'Personal'], desc: "", date: "Jul 03"},
        {id: 3, msg_task: "Design, Develop and Deploy Apps to Netlify for Clients", priority: "Medium", tags: ['Home'], desc: "", date: "Jul 03"},
      ]
    }
  },
  methods: {},
  mounted() {
    this.total = this.todolist.length;
  },
  updated() {
    this.currentDay = new Date().toDateString().slice(4,10);
    this.total = this.todolist.length;
  }
}
</script>