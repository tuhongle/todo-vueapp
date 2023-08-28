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
                        <div class="greetings ms-3">
                            <p class="fs-4 fw-bold mb-1">New here?</p>
                            <p class="mb-0">Signing up is easy. It only takes a few steps</p>
                        </div>
                    </div>
                    <div class="form-wrapper">
                        <form @submit.prevent="todoStore.signUp">
                            <div class="form-group mb-3">
                                <input class="form-control shadow-none ps-4 py-3 rounded-0" type="email" placeholder="Email" v-model="todoStore.mail" required>
                            </div>
                            <div class="form-group mb-3">
                                <input class="form-control shadow-none ps-4 py-3 rounded-0" type="password" placeholder="Password" v-model="todoStore.pass" required>
                            </div>
                            <div class="form-group mb-3">
                                <input class="form-control shadow-none ps-4 py-3 rounded-0" type="text" placeholder="Username" v-model="todoStore.name">
                            </div>
                            <div class="d-flex align-items-center justify-content-between my-3">
                                <div class="ps-0">
                                    <label class="form-check-label text-muted">
                                        <input type="checkbox" class="form-check-input" v-model="todoStore.termAgree">
                                        <span class="ms-2 text-muted">I agree to all Terms & Conditions</span>
                                    </label>
                                </div>
                            </div>
                            <p class="text-danger" v-if="todoStore.signUpMsg">{{ todoStore.signUpMsg }}</p>
                            <button class="btn btn-primary btn-block px-4 py-2 fs-4 text-light" type="submit">SIGN UP</button>
                            <p class="text-center lead mt-3">
                                Already have an account?
                                <RouterLink :to="{ name: 'login' }">Login</RouterLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
