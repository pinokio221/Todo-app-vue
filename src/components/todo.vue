<template>
  <div class="form">
    
    <input type="text" maxlength= '80' class = 'todo-input' placeholder="Type something here..." v-model='taskTitle' @keyup.enter="addTask">
    <button type="button" class="btn btn-primary" id ='addBtn' v-on:click="addTask">Add task</button><br>
  <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item" id='todo-block'>
    <div class="card w-50">
      <div class="card-body">
        <div>
        <div v-if="!todo.editing" class='todo-item' ><p class="card-text">{{ todo.title }}</p></div>
        <input maxlength= '80' v-else class ='todo-item-edit' @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" type="text" v-model='todo.title'>
      </div>

      <div class="icons">
          <span><i title="Finish task" class="fas fa-check-square" id='checkMarkIcon'></i></span>
          <span @click='editTask(todo)'><i title="Edit this task" class="fas fa-pencil-alt" id='editIcon'></i></span>
          <span @click='removeTask(index)'><i title="Remove this task" class="fas fa-trash-alt" id ='trashIcon' ></i></span>
      </div>
  </div>
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
  methods: {
    addTask() {
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
      todo.editing = true
    },

    doneEdit(todo) {
      todo.editing = false
    }
  }
}
</script>

<style>

.emptyList {
  cursor: default;
  font-size: 50px;
  color: gray;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  opacity: 15%;
}
.form {
  display: block;
  text-align: center;
  margin-top: 20px;
}


.todo-item {
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  overflow: hidden;
  cursor: default;
}

.icons {
  display: block;
  letter-spacing: 25px;
  padding-left: 80%;
  padding-top: 15px;
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
</style>
