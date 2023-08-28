<template>
    <ul class="border-0 shadow px-1 py-0 justify-content-between d-flex list-unstyled">
        <li class="p-1" v-for="color in todoStore.colorList" :key="color">
            <label class="d-inline-flex align-items-center justify-content-center">
                <input type="radio" :value="color" v-model="todoStore.colorTag" class="d-none">
                <i class="bi bi-circle-fill" :class="'text-' + color"></i>
            </label>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { useTodoStore } from '../stores/todoStore';

const todoStore = useTodoStore();

</script>