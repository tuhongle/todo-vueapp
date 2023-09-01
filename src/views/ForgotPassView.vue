<script setup lang="ts">
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore();
</script>

<template>
    <div class="container-fluid">
        <div class="row align-items-center">
            <div class="col col-md-8 col-lg-6 text-start p-4 mx-auto">
                <div class="card shadow p-4 p-md-5 rounded-4 overflow-hidden">
                    <div class="greetings-wrapper d-flex justify-content-between align-items-center mb-4">
                        <div class="brand-logo d-flex align-items-center">
                            <RouterLink :to="{name: 'home'}"><img src="/todo.png" alt="" class="img-fluid" width="100"></RouterLink>
                        </div>
                        <div class="greetings">
                            <p class="fw-bold fs-3 mb-3">Find your email</p>
                            <p class="mb-0">Please enter your recovery email</p>
                        </div>
                    </div>
                    <div class="form-wrapper">
                        <form @submit.prevent="todoStore.sendMailResetPass" v-if="todoStore.sendEmailPass">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="todoStore.mail">
                                <label for="floatingInput">Email address</label>
                            </div>
                            <p class="text-danger mb-3" v-if="todoStore.sendMailResetMsg">{{ todoStore.sendMailResetMsg }}</p>
                            <div class="text-end">
                                <button class="btn btn-primary btn-block px-4 py-2 fs-4 text-light" type="submit">NEXT</button>
                            </div>
                        </form>
                        <div v-else>
                            <p class="lead text-muted">Thank you! Please check you email to reset your password.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>