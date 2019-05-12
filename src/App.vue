<template>
  <div id="app">
    {{ todos }}
    <todos v-model="todos"></todos>
    <todos v-model="todos"></todos>
    <todos></todos>
    <button @click="addTodo">Ajouter une tâche</button>
  </div>
</template>

<script>
import Todos from './components/Todos.vue'

export default {
  name: 'app',
  components: {
    Todos
  },
  data() {
    return {
      todos: [{
        name: 'Demo',
        completed: true
      }
      ]
    }
  },
  methods: {
    addTodo() {
      this.todos.push({
        name: 'Jean',
        completed: false
      })
    }
  }
}
</script>

<style>

</style>
