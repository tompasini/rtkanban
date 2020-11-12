<template>
  <div class="about container-fluid">
    <div class="row text-center justify-content-center">
      <div class="col-12">
        <h1>Welcome {{ profile.name }}</h1>
        <img class="rounded" :src="profile.picture" alt="" />
        <p>{{ profile.email }}</p>
      </div>
    </div>
    <div class="row text-center justify-content-center border-bottom mb-3">
      <div class="col-4">
        <form @submit.prevent="createBoard" class="form-group d-flex">
          <input type="text"
                 class="form-control"
                 aria-describedby="helpId"
                 placeholder="Board Title"
                 v-model="state.newBoard.title"
          >
          <button type="submit" class="btn btn-success ml-2">
            <i class="far fa-plus-square"></i>
          </button>
        </form>
      </div>
    </div>
    <div class="row justify-content-around">
      <board-component v-for="board in boards" :key="board._id" :board-prop="board" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
export default {
  name: 'Profile',
  setup() {
    const state = reactive({
      newBoard: {}
    })
    onMounted(() => {
      boardService.getUserBoards()
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      boards: computed(() => AppState.boards),
      createBoard() {
        boardService.createBoard(state.newBoard)
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
.light {
  background-color: #dcd8b2;
}
</style>
