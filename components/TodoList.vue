<template>
  <div>
    <p>Completed Tasks: {{ todos.filter(todo => { return todo.done === true }).length }}</p>
    <p>Pending Tasks: {{ todos.filter(todo => { return todo.done === false }).length }}</p>
    <div
      v-for="(category, index) in categories"
      :key="index">
      <span class="category">{{ category.replace(/^\w/g, c => c.toUpperCase() ) }}</span>
      <todo-item 
        v-for="(todo, index) in todos.filter(todo => todo.category === category)"
        :key="index"
        :todo="todo" />
    </div> 
  </div>
</template>


<script type= "text/javascript">
import TodoItem from '~/components/TodoItem.vue'
export default {
  components: {
    TodoItem
  },
  props: {
    todos: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    categories() {
      return this.todos
        .reduce((accum, val, idx, arr) => {
          if (!accum.includes(val.category)) accum.push(val.category)
          return accum
        }, [])
        .sort()
    }
  }
}
</script>

<style>
.category {
  font-weight: bold;
}

li {
  list-style-type: none;
}

.done {
  text-decoration: line-through;
}
</style>
