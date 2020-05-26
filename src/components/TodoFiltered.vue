<template>
<div class='todo-filtered'>
    <button id = 'filterBtn' :class="{ active: filter == 'all' }" @click = "changeFilter('all')">All</button>
    <button id = 'filterBtn' :class="{ active: filter == 'active' }" @click = "changeFilter('active')">Active</button>
    <button id = 'filterBtn' :class="{ active: filter == 'completed' }" @click = "changeFilter('completed')">Completed</button>
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