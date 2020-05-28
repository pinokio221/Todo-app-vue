<template>
<div class='todo-filtered'>
    <ul>
     <li><b-button  :class="{ active: filter == 'all' }" @click = "changeFilter('all')">All</b-button></li>
     <li><b-button  :class="{ active: filter == 'active' }" @click = "changeFilter('active')">Active</b-button></li>
     <li><b-button  :class="{ active: filter == 'completed' }" @click = "changeFilter('completed')">Completed</b-button></li></ul>
    </div>
</template>

<script>
export default {
    name: 'todo-filtered',
    computed: {
        filter() {
            return this.$store.state.filter
        }
    },
    methods: {
        changeFilter(filter) {
            this.$store.dispatch('updateFilter', filter)
        }
    }

}
</script>

