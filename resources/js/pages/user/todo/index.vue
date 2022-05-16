<template>
    <div class="todo">
        <h1>Hello {{ user.name }}!</h1>
        <h3>Simple Todo List App</h3>
        <div v-if="todo.label" class="edit-todo-con">
            <div v-if="showSuccess" class="success-con">
                Successfully Updated!
            </div>
            <FormKit
                type="form"
                v-model="todoData"
                :actions="false"
                @submit="callUpdateTodo"
                ref="updateTodoForm"
            >
                <FormKit
                    type="text"
                    name="label"
                    label="Todo"
                    placeholder="Update todo here"
                    validation="required|length:5,100"
                    :value="todo.label"
                />
                <div class="btn-con">
                    <button class="btn" @click.prevent="submitUpdateTodo">
                        Update Todo
                    </button>
                    <button class="btn btn-delete" @click.prevent="deleteTodo">
                        Delete Todo
                    </button>
                    <button class="btn" @click.prevent="$router.push({ name: 'dashboard' })">
                        Back To Dashboard
                    </button>
                </div>
            </FormKit>
        </div>
    </div>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const user = computed(() => store.getters['auth/user'])
        const todo = ref({})
        const showSuccess = ref(false)

        const todoData = ref({})
        const updateTodoForm = ref(null)
        function submitUpdateTodo() {
            showSuccess.value = false
            const node = updateTodoForm.value.node
            node.submit()
        }

        function callUpdateTodo() {
            store.dispatch('todo/update', { id: route.params.id, params: todoData.value })
                .then(res => showSuccess.value = true, err => console.log(err))
        }

        function deleteTodo() {
            store.dispatch('todo/delete', { id: route.params.id })
                .then(res => {
                    router.push({ name: 'dashboard' })
                }, err => {
                    console.log(err)
                })
        }

        onBeforeMount(() => {
            store.dispatch('auth/getUser')
            store.dispatch('todo/read', { id: route.params.id })
                .then(res => {
                    todo.value = res.data
                    console.log(res)
                }, err => {
                    router.push({ name: 'dashboard' })
                })
        })

        return {
            user,
            todo,
            showSuccess,
            updateTodoForm,
            todoData,
            submitUpdateTodo,
            callUpdateTodo,
            deleteTodo
        }
    }
}
</script>

<style lang="scss">
.todo {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px 0;
    .edit-todo-con {
        padding: 20px 30px;
        list-style: none;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        justify-content: center;
        max-width: 360px;
        width: 100%;
        height: 550px;
        > form {
            width: 100%;
        }
        .btn-con {
            .btn {
                margin-bottom: 10px !important;
            }
        }
    }
}
</style>