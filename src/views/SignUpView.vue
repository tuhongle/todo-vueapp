<script setup lang="ts">
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore();
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col text-start bg-white shadow-sm p-4">
                <div class="card shadow px-5 py-3">
                    <div class="greetings-wrapper d-flex justify-content-between align-items-center mb-4">
                        <div class="brand-logo d-flex align-items-center">
                            <img src="/shortenURL.png" alt="" class="img-fluid" width="120">
                        </div>
                        <div class="greetings me-4">
                            <p class="fs-6 mb-3">New here?</p>
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
                            <button class="btn btn-primary btn-block px-5 py-2 mb-4" type="submit">SIGN UP</button>
                            <p class="text-center lead">
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
