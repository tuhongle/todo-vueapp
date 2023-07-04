<template>
  <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header p-3">
                <h1 class="modal-title fs-5">Task Detail {{ todo.id }}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body p-3">
                <div class="modal-input d-flex align-items-center mb-3">
                  <input type="text" v-model="todo.msg_task" :ref='"list_" + todo.id' class="w-100 border-0 border-info py-2 ps-2 text-secondary">
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
                                    <input type="radio" class="form-check-input" id="high-priority" value="High" v-model="todo.priority">
                                    <label for="high-priority" class="form-check-label d-flex align-items-center mb-0 ms-2">
                                        <i class="bi bi-exclamation text-danger fs-5"></i>
                                        <i class="bi bi-exclamation text-danger fs-5"></i>
                                        <i class="bi bi-exclamation text-danger fs-5"></i>
                                        <span class="ms-3">High</span>
                                    </label>
                                </div>
                                <div class="form-check text-start d-flex align-items-baseline">
                                    <input type="radio" class="form-check-input" id="medium-priority" value="Medium" v-model="todo.priority">
                                    <label for="medium-priority" class="form-check-label d-flex align-items-center mb-0 ms-2">
                                        <i class="bi bi-exclamation text-tertiary fs-5"></i>
                                        <i class="bi bi-exclamation text-tertiary fs-5"></i>
                                        <span class="ms-3">Medium</span>
                                    </label>
                                </div>
                                <div class="form-check text-start d-flex align-items-baseline">
                                    <input type="radio" class="form-check-input" id="low-priority" value="Low" v-model="todo.priority">
                                    <label for="low-priority" class="form-check-label d-flex align-items-center mb-0 ms-2">
                                        <i class="bi bi-exclamation text-primary fs-5"></i>
                                        <span class="ms-3">Low</span>
                                    </label>
                                </div>
                                <div class="form-check text-start d-flex align-items-baseline">
                                    <input type="radio" class="form-check-input" id="none-priority" value="None" v-model="todo.priority">
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
                                <div class="pe-3">
                                    <div class="form-check text-start d-flex align-items-baseline ps-2" v-for="tag in tags" :key="tag">
                                        <label class="form-check-label d-flex align-items-center mb-0">
                                            <div class="dropdown">
                                                <i class="bi bi-three-dots-vertical me-2" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false"></i>
                                                <ul class="dropdown-menu border-0 shadow p-2">
                                                    <li class="dropdown-item d-inline-flex align-items-center justify-content-center p-1" v-for="color in colorList" :key="color">
                                                        <input type="radio" :value="color" v-model="tag.color" class="position-absolute opacity-0">
                                                        <i class="bi bi-circle-fill" :class="'text-' + color"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <i class="bi bi-tags-fill" :class="'text-' + tag.color"></i>
                                            <span class="ms-2">{{ tag.title }}</span>
                                        </label>
                                        <input type="checkbox" class="form-check-input ms-auto" :value="tag.title" v-model="todo.tags" @click="$emit('select', [tag, todo.id])">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <div class="modal-footer p-3">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal">Save changes</button>
              </div>
            </div>
          </div>
</template>

<script>
export default {
    name: 'Modal',
    props: ['todo'],
    data() {
        return {
            showInputField: true,
            showDescField: false,
            showPriorityField: false,
            showTagField: false,
            showDropdown: false,
            currentTag: '',
            colorList: ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8', 'color9', 'color10', 'color11', 'color12', 'color13', 'color14', 'color15', 'color16', 'color17', 'color18', 'color19'],
            tags: [],
        }
    },
    methods: {
        showInput(el, id) {
            this.$refs["list_" + id].focus();
            el.target.style.display = 'none';
        },
        showPriority(el) {
            el.target.style.background = "#5e72e4";
            el.target.style.color = "white";
            this.showPriorityField = true;
            this.showTagField = false;
        },
        enterTag(el) {
            if (el.key === 'Enter') {
                this.tags.push({title: this.currentTag, color: ''});
                this.currentTag = '';
            }
        }
    },
    created() {
        this.tags.push({title: 'Home', color: this.colorList[3]});
        this.tags.push({title: 'Personal', color: this.colorList[8]});
        this.tags.push({title: 'Work', color: this.colorList[5]});
    },
    mounted() {
        this.showInputField = true;
        this.showDescField = false;
        this.showPriorityField = false;
    },
}
</script>