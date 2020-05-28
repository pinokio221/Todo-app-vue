
<template>
  <div class="form">
    <div class="input-block">
      <input id = 'todo-input' class="form-control" aria-label="Text input with checkbox" type="text" maxlength= '80' placeholder="Type something here..." v-model='taskTitle' @keyup.enter="addTask">
      <button type="button" class="btn btn-primary" id ='addBtn' v-on:click="addTask">Add new task</button>
      </div>
  <div class="output-block">
  <div v-if="!todosFiltered.length" class='emptyList'>Nothing here</div>
    <div class="filter-buttons">
      <todo-filtered></todo-filtered>
    </div>
  <transition-group name='fade' enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
  <todo-item v-for="(todo, index) in todosFiltered" :key="todo.id" :todo="todo" :index="index" id='todo-block'></todo-item>
    </transition-group>
  </div>

</div>

</template>

<script>
import TodoItem from './TodoItem.vue'
import TodoFiltered from './TodoFiltered'

export default {
  name: 'todo',
  components: {
    TodoItem,
    TodoFiltered,
  },
  data () {
    return {
      taskTitle: '',
      idForTask: 0,
    }
  },
  created () {
    this.$store.dispatch('retrieveTodos')
  },
  computed: {
    todosFiltered() {
      return this.$store.getters.todosFiltered
    }
  },
  methods: {
    addTask() {
      if(this.taskTitle.trim().length == 0) { // check empty field
        return
      }
      this.$store.dispatch('addTodo', {
        id: this.idForTask,
        title: this.taskTitle,
      })

      this.taskTitle = ''
      this.idForTask++
    },
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');

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
  position: absolute; 
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto;
  width: 30%; /* Need a specific value to work */
  cursor: default;
  font-size: 50px;
  color: gray;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  opacity: 15%;
}

.input-block {
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
  animation-duration: 0.3s;
}

.todo-filtered, ul {
  display: flex;
  list-style: none;
  text-transform: uppercase;
  text-decoration: none;
  position: absolute;
  left: 1%;
  cursor: pointer;
  transition-duration: 0.3s;
  color: blue;
  text-align: center;


}
li {
  padding: 3px;
}
@media screen and (max-width: 1300px) {
  .todo-filtered ul {
    flex-direction: column;
    align-self: center;
  }
  .todo-filtered ul li {
    margin: 5px;
  }
}
  @media screen and (max-width: 800px) {
  .todo-filtered ul{
    left: 0;
    text-align: left;
  }
}
.icons {
  display: block;
  position: inherit;
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

</style>

