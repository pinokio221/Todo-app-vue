<template>
<div class="todo-item">
<div class="card w-50">
    <div class="card-body">
    <div v-if="!editing" :class="{ completed: completed }"><p class="card-text">{{ title }}</p></div>
    <div v-else><input maxlength= '80' class ='todo-item-edit' @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()" type="text" v-model='title'>
        <span @click="doneEdit"><i title = "Save" class="fas fa-save" id = 'save-edit-icon' ></i></span>
        <span @click="cancelEdit"><i title = "Cancel" class="fas fa-times" id = 'cancel-edit-icon' ></i></span>
    </div>

    <div class="icons">
        <span v-if="!completed" @click='completeTask()'><i title="Finish task" class="fas fa-check" id='checkMarkIcon'></i></span>
        <span v-if="!completed" @click='editTask()'><i title="Edit this task" class="fas fa-pencil-alt" id='editIcon'></i></span>
        <span v-if="!completed" @click='removeTask(index)'><i title="Remove this task" class="fas fa-trash-alt" id ='trashIcon' ></i></span>
    </div>
    </div>
</div></div>
</template>

<script>
export default {
    name: 'todo-item',
    props: {
        todo: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        }
    },

    data() {
        return {
            'id': this.todo.id,
            'title': this.todo.title,
            'completed': this.todo.completed,
            'editing': this.todo.editing,
            'beforeEditCache': '',
        }
    },

    methods: {
        removeTask(index) {
            this.$emit('removedTask', index)
        },
        editTask() {
            this.editing = true
            this.beforeEditCache = this.title
         },

        doneEdit() {
            if(this.title.trim().length == 0) { // check empty field
                return
            }
            this.beforeEditCache = this.title
            this.editing = false
            this.$emit('finishedEdit', {
                'index': this.index,
                'todo': {
                    'id': this.id,
                    'title': this.title,
                    'completed': this.completed,
                    'editing': this.editing,
                }
            })
        },

        cancelEdit() {
            this.title = this.beforeEditCache
            this.editing = false;

        },
        completeTask() {
            this.completed = true;
            this.editing = false;
            this.$emit('completedTask', {
                'index': this.index,
                'todo': {
                    'id': this.id,
                    'title': this.title,
                    'completed': this.completed,
                    'editing': this.editing,
                }
            })
    },

    }

}
</script>