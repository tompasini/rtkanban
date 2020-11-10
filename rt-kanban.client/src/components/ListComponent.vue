<template>
  <div class="ListComponent d-flex flex-column col-3">
    <div class="border-bottom p-3">
      <h3> {{ list.title }} </h3>
      <div>
        <form @submit.prevent="editList(list._id, list.board)">
          <input type="text" v-model="state.editedList.title">
          <button type="submit" class="btn btn-warning">
            Edit
          </button>
        </form>
      </div>
      <button class="btn btn-danger" @click="deleteList(list._id, list.board)">
        Delete
      </button>
    </div>
    <div class="p-3">
      <h5>Tasks</h5>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { listService } from '../services/ListService'
export default {
  name: 'ListComponent',
  props: {
    listProp: Object
  },
  setup(props) {
    const state = reactive({
      editedList: {}
    })
    return {
      state,
      list: computed(() => props.listProp),
      editList(listId, board) {
        listService.editList(state.editedList, listId, board)
      },
      deleteList(listId, board) {
        listService.deleteList(listId, board)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
