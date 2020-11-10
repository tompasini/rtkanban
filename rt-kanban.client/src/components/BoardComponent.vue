<template>
  <div class="board-component col-3 bg-light border-rounded shadow p-3 m-3">
    <h3 @click="getActiveBoard(board._id)" class="mb-4">
      {{ board.title }}
    </h3>
    <div>
      <form @submit.prevent="editBoard(board._id)">
        <input type="text" v-model="state.editedBoard.title">
        <button type="submit" class="btn btn-warning ml-2">
          Edit
        </button>
      </form>
    </div>
    <button class="btn btn-danger mt-4" @click="deleteBoard(board._id)">
      Delete
    </button>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
import { useRouter } from 'vue-router'
export default {
  name: 'BoardComponent',
  props: {
    boardProp: Object
  },
  setup(props) {
    const state = reactive({
      editedBoard: {}
    })
    const router = useRouter()
    return {
      state,
      board: computed(() => props.boardProp),
      user: computed(() => AppState.user),
      profile: computed(() => AppState.profile),
      editBoard(boardId) {
        boardService.editBoard(state.editedBoard, boardId)
      },
      deleteBoard(boardId) {
        boardService.deleteBoard(boardId)
      },
      getActiveBoard(boardId) {
        router.push({ name: 'Board', params: { id: boardId } })
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
