<template>
    <div class="dashboard">
        <h1>Hello {{ user.name }}!</h1>
        <h3>Simple Todo List App</h3>
        <ul class="todo-list">
            <li v-for="(todo, key) in todos" :key="key"
                class="todo-item"
                @click="$router.push({ name: 'todo', params: { id: todo.id } })"
            >
                <span>{{ todo.label }}</span>
            </li>
        </ul>
        <div class="add-todo-con">
            <FormKit
                type="form"
                v-model="newTodoData"
                :actions="false"
                @submit="callCreateTodo"
                ref="addTodoForm"
            >
                <FormKit
                    type="text"
                    name="label"
                    label="Todo"
                    placeholder="Add new todo here"
                    validation="required|length:5,100"
                />
                <div class="btn-con">
                    <button class="btn" @click.prevent="submitCreateTodo">
                        Add Todo
                    </button>
                </div>
            </FormKit>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()
        const user = computed(() => store.getters['auth/user'])
        const todos = computed(() => store.getters['todo/list'])
        store.dispatch('auth/getUser')
        store.dispatch('todo/getList')

        const newTodoData = ref({})
        const addTodoForm = ref(null)
        function submitCreateTodo() {
            const node = addTodoForm.value.node
            node.submit()
        }

        function callCreateTodo() {
            console.log(todos)
            store.dispatch('todo/create', { params: newTodoData.value })
                .then(res => {
                    console.log(res)
                    store.dispatch('todo/getList')
                }, err => {
                    console.log(err)
                })
        }

        return {
            user,
            todos,
            addTodoForm,
            newTodoData,
            submitCreateTodo,
            callCreateTodo
        }
    }
}
</script>

<style lang="scss">
.dashboard {
    flex-direction: column;
    .todo-list {
        height: 400px;
        width: 100%;
        max-width: 800px;
        padding: 0 30px;
        list-style: none;
        overflow-y: auto;
        overflow-x: hidden;
        li.todo-item {
            padding: 12px 20px;
            text-align: center;
            border: 1px solid #ccc;
            margin-bottom: 10px;
            cursor: pointer;
        }
    }
    .add-todo-con {
        max-width: 300px;
        width: 100%;
    }
}
</style>