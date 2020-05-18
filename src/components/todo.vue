<template>
  <div class="form">
    <div class="input-block">
      <input id = 'todo-input' class="form-control" aria-label="Text input with checkbox" type="text" maxlength= '80' placeholder="Type something here..." v-model='taskTitle' @keyup.enter="addTask">
      <button type="button" class="btn btn-primary" id ='addBtn' v-on:click="addTask">Add new task</button>
      </div>
      <div v-if="!todos.length" class='emptyList'>Nothing here</div>
  
  <div class="output-block">
  <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item" id='todo-block'>
    <div class="card w-50">
      <div class="card-body">
        <div>
        <div v-if="!todo.editing" :class="{ completed: todo.completed }"><p class="card-text">{{ todo.title }}</p></div>
        <div v-else><input maxlength= '80' class ='todo-item-edit' @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" type="text" v-model='todo.title'>
          <span @click="doneEdit(todo)"><i title = "Save" class="fas fa-save" id = 'save-edit-icon' ></i></span>
          <span @click="cancelEdit(todo)"><i title = "Cancel" class="fas fa-times" id = 'cancel-edit-icon' ></i></span>
        </div>
      </div>

      <div class="icons">
          <span @click='completeTask(todo)'><i title="Finish task" class="fas fa-check-square" id='checkMarkIcon'></i></span>
          <span @click='editTask(todo)'><i title="Edit this task" class="fas fa-pencil-alt" id='editIcon'></i></span>
          <span @click='removeTask(index)'><i title="Remove this task" class="fas fa-trash-alt" id ='trashIcon' ></i></span>
      </div>
    </div>
  </div>
  </div>
  </div>
  <div class="filter-buttons">
    <div>
      <button id = 'filterBtn' :class="{ active: filter == 'all' }" @click ="filter= 'all'">All</button>
      <button id = 'filterBtn' :class="{ active: filter == 'active' }" @click ="filter= 'active'">Active</button>
      <button id = 'filterBtn' :class="{ active: filter == 'completed' }" @click ="filter= 'completed'">Completed</button>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'todo',
  data () {
    return {
      taskTitle: '',
      idForTask: 3,
      beforeEditCache: '',
      editMode: false,
      filter: 'all',
      todos: [
        {
          'id': 1,
          'title': 'some',
          'completed': false,
          'editing': false,
        },
        {
          'id': 2,
          'title': 'two',
          'completed': false,
          'editing': false,
        },
      ]
    }
  },
  computed: {
    todosFiltered() {
      if(this.filter == 'all') {
        return this.todos
      }
      else if(this.filter == 'active') {
        return this.todos.filter(todo => !todo.completed)
      }
      else if(this.filter == 'completed') {
        return this.todos.filter(todo => todo.completed)
      }

      return this.todos
    }
  },
  methods: {
    addTask() {
      if (this.editMode == true) {
        todo.editing = false;
        this.editMode = false;
      }

      if(this.taskTitle.trim().length == 0) { // check empty field
        return
      }

      this.todos.push({
        id: this.idForTask,
        title: this.taskTitle,
        completed: false,
        editing: false,
      })

      this.taskTitle = ''
      this.idForTask++
    },
    removeTask(index) {
      this.todos.splice(index, 1)
    },

    editTask(todo) {
      if(this.editMode == true) {
        return
      }
      else if (todo.completed == true) {
        return
      }
      this.editMode = true;
      this.beforeEditCache = todo.title
      todo.editing = true

    },

    doneEdit(todo) {
       if(todo.title.trim().length == 0) { // check empty field
        return
      }
      this.beforeEditCache = todo.title
      todo.editing = false
      this.editMode = false;
    },

    cancelEdit(todo) {
      todo.title = this.beforeEditCache
      todo.editing = false;
      this.editMode = false;

    },

    completeTask(todo) {
      todo.completed = true;
    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400&display=swap');

body {
  font-family: 'Work Sans', sans-serif;
}
#addBtn {
  font-size: 18px;
  margin-left: 1%;
}
#todo-input{
  width: 40%;
}
.emptyList {
  text-align: center;
  cursor: default;
  font-size: 50px;
  color: gray;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  opacity: 15%;
}

.input-block {
  display: block;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  overflow: hidden;
  margin-top: 30px;
  padding-bottom: 1%;
}


.todo-item {
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  overflow: hidden;
  cursor: default;
  padding-top: 1%;
  text-align: center;
  font-size: 18px;
}

.filter-buttons {
  position: sticky;
  position: absolute;
  bottom: 10px;
  cursor: pointer;
  margin-top: 30%;
  transition-duration: 0.3s;
  color: blue;
  position: fixed;
  left: 50%;
  margin: 10px 0 0 -110px;

}
.icons {
  display: block;
  letter-spacing: 25px;
  padding-left: 80%;
  padding-top: 2%;
}

#checkMarkIcon {
  font-size: 21px;
  color: grey;
  cursor: pointer;
  transition-duration: 0.5s;

}
#checkMarkIcon:hover {
  color: green;
  cursor: pointer;
  transition-duration: 0.5s;
}

#trashIcon {
  font-size: 21px;
  color: tomato;
  cursor:pointer;
  transition-duration: 0.5s;

}

#trashIcon:hover {
  color: red;
  transition-duration: 0.5s;
}

#editIcon {
  text-align: right;
  font-size: 21px;
  color: gray;
  cursor: pointer;
  transition-duration: 0.5s;
}
#editIcon:hover {
  color: black;
  transition-duration: 0.5s;
}

#save-edit-icon {
  margin-left: 2%;
  font-size: 21px;
  color: rgb(19, 156, 53);
  cursor:pointer;
  transition-duration: 0.5s;

}
#save-edit-icon:hover {
  font-size: 21px;
  color: green;
  cursor:pointer;
  transition-duration: 0.5s;

}
#cancel-edit-icon {
  margin-left: 1.5%;
  font-size: 21px;
  color: tomato;
  cursor:pointer;
  transition-duration: 0.5s;
}
#cancel-edit-icon:hover {
  font-size: 21px;
  color: red;
  cursor:pointer;
  transition-duration: 0.5s;
}

.completed {
  text-decoration: line-through;
  color: gray;
  transition-duration: 0.8s;

}
.active {
  background: rgb(19, 156, 53);
  color: white;
}

#filterBtn {
  border: none;
  outline: none;
  transition-duration: 0.5s;
}

#filterBtn:hover {
  background-color: rgb(19, 156, 53);
  transition-duration: 0.5s;
  color: white;
}

#filterBtn:active {
  background-color: rgb(19, 64, 30);
}

</style>
