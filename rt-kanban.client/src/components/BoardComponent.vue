<template>
  <div class="board-component col-3 light border-rounded shadow p-3 m-3">
    <div class="d-flex justify-content-between">
      <h3 @click="getActiveBoard(board._id)" class="pointer mb-4">
        {{ board.title }}
      </h3>
      <button class="btn btn-danger p-1 h-75" @click="deleteBoard(board._id)">
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
    <div>
      <form @submit.prevent="editBoard(board._id)" class="d-flex justify-content-between">
        <input type="text" v-model="state.editedBoard.title" placeholder="Board Title">
        <button type="submit" class="btn btn-warning">
          <i class="far fa-edit"></i>
        </button>
      </form>
    </div>
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
.light {
  background-color: #dcd8b2;
}
.pointer {
  cursor: pointer;
}
</style>
