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
                            <img src="/todo.png" alt="" class="img-fluid" width="100">
                        </div>
                        <div class="greetings">
                            <p class="fw-bold fs-5 mb-3">Hello! let's get started</p>
                            <p class="mb-0">Sign in to continue.</p>
                        </div>
                    </div>
                    <div class="form-wrapper">
                        <form @submit.prevent="todoStore.logIn">
                            <div class="form-group mb-3">
                                <input class="form-control shadow-none ps-4 py-3 rounded-0" type="text" placeholder="Email" v-model="todoStore.mail" required>
                            </div>
                            <div class="form-group mb-3">
                                <input class="form-control shadow-none ps-4 py-3 rounded-0" type="password" placeholder="Password" v-model="todoStore.pass" required>
                            </div>
                            <p class="text-danger mb-3" v-if="todoStore.loginMsg">{{ todoStore.loginMsg }}</p>
                            <button class="btn btn-primary btn-block px-4 py-2 fs-4 text-light" type="submit">SIGN IN</button>
                            <div class="d-flex align-items-center justify-content-between my-4">
                                <div class="me-2">
                                    <label class="form-check-label">
                                        <input type="checkbox" class="form-check-input">
                                        <span class="ms-2 text-muted">Keep me signed in</span>
                                    </label>
                                </div>
                                <a href="#" class="text-dark">Forgot password?</a>
                            </div>
                            <p class="text-center lead">
                                Don't have an account?
                                <RouterLink :to="{ name: 'signup' }">Create</RouterLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>