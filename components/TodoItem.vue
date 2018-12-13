<template>
  <div class="todo">
    <input 
      :checked="todo.done" 
      type="checkbox" >
    <span :class="{ done: todo.done }">{{ todo.text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  }
}
</script>
