<template>
  <div class="board-component col-3">
    <h3>{{ board.title }}</h3>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'BoardComponent',
  props: {
    boardProp: Object
  },
  setup(props) {
    return {
      board: computed(() => props.boardProp)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
