import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
      const index = state.todos.findIndex(item => item.id == this.id)
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
    addTodo(context, todo) {
      context.commit('addTodo', todo)
  },

    updateFilter(context, filter) {
      context.commit('updateFilter', filter)

    }, 

    removedTask(context, id) {
      context.commit('removedTask', id)

    },

    changedTask(context, todo) {
      context.commit('changedTask', todo)

    },

    completeTask(context, todo) {
      context.commit('completeTask', todo)
      }
    }

})