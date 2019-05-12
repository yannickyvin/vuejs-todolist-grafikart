<template>
<section class="todoapp">
  <header class="header">
    <h1>
      Todos
    </h1>
    <input class="new-todo" type="text" placeholder="Ajouter une tâche" name="" v-model="newTodo" @keyup.enter="addTodo">
  </header>
  <div class="main">
    <input id="toggle-all" type="checkbox" class="toggle-all" v-model="allDone"><label for="toggle-all"></label>
    <ul class="todo-list">
      <li class="todo" v-for="todo in filteredTodos" :key="todo.name" :class="{completed: todo.completed, editing: todo === editing}">
        <div class="view" >
          <input class="toggle" type="checkbox" v-model="todo.completed">
          <label @dblclick="editTodo(todo)">
            {{todo.name}}
          </label>
          <button class="destroy"  @click='deleteTodo(todo)'></button>
        </div>
        <input type="text" class="edit" v-model="todo.name" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus="todo === editing" @blur="doneEdit">
      </li>
    </ul>
  </div>
  <footer class="footer" v-show="todos.length > 0">
    <span class="todo-count">
      <strong> {{remaining}} </strong>tâches à faire</span>
      <ul class="filters">
        <li><a href="#" :class="{selected: filter === 'all'}" @click.prevent="filter = 'all'">Toutes</a></li>
        <li><a href="#" :class="{selected: filter === 'todo'}" @click.prevent="filter = 'todo'">A faire</a></li>
        <li><a href="#" :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Faites</a></li>
      </ul>
      <button class="clear-completed" @click.prevent="deleteCompleted" v-show="hasCompleted">Supprimer tâches finies</button>
  </footer>
</section>
</template>

<script>
import Vue from 'vue';
export default {
  props: {
    value: {type: Array, default() { return []; }}
  },
  data() {
    return {
      todos: this.value,
      newTodo: '',
      filter: 'all',
      editing: null,
      oldTodo: ''
    }
  },
  computed: {
    allDone : {
      get() {
        return this.remaining === 0;
      },
      set(value) {
          this.todos.forEach(todo => { 
            todo.completed = value;
        });
      }
    },
    remaining() {
      return this.todos.filter(todo => !todo.completed).length
    },
    filteredTodos() {
      if (this.filter === 'todo') {
          return this.todos.filter(todo => !todo.completed);
      } else if (this.filter === 'done') {
        return this.todos.filter(todo => todo.completed);
      }
      
      return this.todos;
    },
    hasCompleted() {
      return (this.todos.filter(todo => todo.completed === true).length > 0);
    }
  },
  methods: {
    addTodo() {
      this.todos.push({
        name: this.newTodo,
        completed: false
        });
      this.newTodo = '';
    },
    deleteTodo(value) {
      this.todos = this.todos.filter(todo => todo !== value);
      this.$emit('input', this.todos);
    },
    deleteCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
      this.$emit('input', this.todos);
    },
    editTodo(todo){
      this.editing = todo;
      this.oldTodo = todo.name;
    },
    doneEdit() {
      this.editing = null;
    },
    cancelEdit(){
      this.editing.name = this.oldTodo;
      this.doneEdit();
    }
  },
  watch: {
    value(value) {
      this.todos = value;
    }
  },
  directives: {
    focus (el, value) {
      if(value) {
        Vue.nextTick(() => {
          el.focus();
        });
      }
    }
  }
 
};
</script>

<style src="./todos.css"> 
</style>
