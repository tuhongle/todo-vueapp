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
        <div class="row list" data-bs-toggle="modal" :data-bs-target="'#list'+todo.id">
          <div class="col-9">
            <div class="row text-start">
              <div class="col-12 col-md-8 d-flex align-items-center mb-3 mb-md-0">
                <i class="bi bi-grip-vertical"></i>
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
        <div class="modal fade" :id="'list'+todo.id" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5">Task Detail {{ todo.id }}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="modal-input d-flex align-items-center">
                  <input type="text" v-model="todo.msg_task" :ref='"list_" + todo.id' class="w-100 border-0 border-info py-2 ps-2 text-secondary">
                  <i v-if="show" class="bi bi-pencil-square ms-3" @click="showInput($event, todo.id)"></i>
                </div>
                <div class="modal-desc">
                  <textarea v-model="todo.desc" cols="30" rows="3" class="form-control"></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary text-white">Save changes</button>
              </div>
            </div>
          </div>
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

export default {
  name: 'ToDo',
  data() {
    return {
      total: null,
      success: null,
      pending: null,
      currentDay: null,
      currentID : 4,
      show: true,
      todolist: [
        {id: 1, msg_task: "Standup meeting with the team @5pm", priority: "Low", tags: [], desc: "", date: "Jul 03"},
        {id: 2, msg_task: "Order pizza for Granny tonight", priority: "High", tags: [], desc: "", date: "Jul 03"},
        {id: 3, msg_task: "Design, Develop and Deploy Apps to Netlify for Clients", priority: "Medium", tags: [], desc: "", date: "Jul 03"},
      ]
    }
  },
  methods: {
    showInput(el, id) {
      this.$refs["list_" + id][0].focus();
      el.target.style.display = 'none';
    }
  },
  mounted() {
    this.total = this.todolist.length;
  },
  updated() {
    this.currentDay = new Date().toDateString().slice(4,10);
    this.total = this.todolist.length;
  }
}
</script>