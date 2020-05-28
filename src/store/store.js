import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://todo_laravel.test:8003/api'

export const store = new Vuex.Store( {
  state: {
      filter: 'all',
      todos: [ ],
  },

  getters: {
      todosFiltered(state) {
          if(state.filter == 'all') {
            return state.todos
          }
          else if(state.filter == 'active') {
             return state.todos.filter(todo => !todo.completed)
          }
          else if(state.filter == 'completed') {
              return state.todos.filter(todo => todo.completed)
           }
          return state.todos
         }
  },

  mutations: {
    
    retrieveTodos(state, todos) {
      state.todos = todos;
    },
    
    addTodo(state, todo) {
        state.todos.push({
            id: todo.id,
            title: todo.title,
            completed: false,
            editing: false
        })
    },

    updateFilter(state, filter) {
      state.filter = filter
    }, 

    removedTask(state, id) {
      const index = state.todos.findIndex(item => item.id == id)
      state.todos.splice(index, 1)
    },

    changedTask(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id)
      state.todos.splice(index, 1, {
          'id': todo.id,
          'title': todo.title,
          'completed': todo.completed,
          'editing': todo.editing,
        })
    },

    completeTask(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id)
      state.todos.splice(index, 1, {
          'id': todo.id,
          'title': todo.title,
          'completed': todo.completed,
          'editing': todo.editing,
        })
    }

  },
  actions: {
    retrieveTodos(context) {
      axios.get('/todos') // axios get request here
          .then(response => {
            context.commit('retrieveTodos', response.data)
          })
          .catch(error => {
            console.log(error);
          }) 
    },

    addTodo(context, todo) {
      axios.post('/todos', {
        title: todo.title,
        completed: false
      }) // axios get request here
          .then(response => {
            context.commit('addTodo', response.data)
          })
          .catch(error => {
            console.log(error);
          }) 
  },

    updateFilter(context, filter) {
      context.commit('updateFilter', filter)

    }, 

    removedTask(context, id) {
      axios.delete('/todos/' + id) 
      // axios get request here
          .then(response => {
            context.commit('removedTask', id)
          })
          .catch(error => {
            console.log(error);
          }) 
    },

    changedTask(context, todo) {
      axios.patch('/todos/' + todo.id, {
        title: todo.title,
        completed: todo.completed
      }) // axios get request here
          .then(response => {
            context.commit('changedTask', response.data)
          })
          .catch(error => {
            console.log(error);
          }) 

    },

    completeTask(context, todo) {
      axios.patch('/todos/' + todo.id, {
        completed: true
      }) // axios get request here
          .then(response => {
            context.commit('completeTask', response.data)
          })
          .catch(error => {
            console.log(error);
          }) 
      }
    }

})