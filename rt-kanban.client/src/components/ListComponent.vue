<template>
  <div class="ListComponent d-flex flex-column col-3 bg-light border-rounded shadow m-3">
    <div class="border-bottom p-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h3> {{ list.title }} </h3>
        <button class="btn btn-sm btn-danger p-1 h-75" @click="deleteList(list._id, list.board)">
          Delete
        </button>
      </div>
      <div>
        <form @submit.prevent="editList(list._id, list.board)" class="d-flex justify-content-between">
          <input type="text" v-model="state.editedList.title" placeholder="List Title" class="narrow">
          <button type="submit" class="btn btn-warning p-1">
            Edit
          </button>
        </form>
      </div>
    </div>
    <div class="p-3">
      <h5>Tasks</h5>
      <div class="row">
        <TaskComponent />
      </div>
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
  .narrow{
    width: 75%;
  }
</style>
