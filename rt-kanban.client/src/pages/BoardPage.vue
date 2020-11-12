<template>
  <div class="Board container-fluid" v-if="profile.id === board.creatorId">
    <div class="row border-bottom p-3 mb-3">
      <h2 class="col-12 mb-3">
        {{ board.title }} Board
      </h2>
      <div class="col-12">
        <form @submit.prevent="createList(board._id)" class="d-flex">
          <input type="text" v-model="state.newList.title" placeholder="New List Title">
          <button type="submit" class="btn btn-success ml-3">
            <i class="far fa-plus-square"></i>
          </button>
        </form>
      </div>
    </div>
    <div class="row justify-content-around">
      <ListComponent v-for="list in lists" :list-prop="list" :key="list._id" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
import { useRoute } from 'vue-router'
import { listService } from '../services/ListService'

export default {
  name: 'Board',
  setup() {
    const state = reactive({
      newList: {}
    })
    const route = useRoute()
    onMounted(() => {
      boardService.getActiveBoard(route.params.id)
      listService.getListsByBoard(route.params.id)
    })
    return {
      state,
      board: computed(() => AppState.activeBoard),
      profile: computed(() => AppState.profile),
      lists: computed(() => AppState.lists),
      createList(boardId) {
        state.newList.board = boardId
        listService.createList(boardId, state.newList)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
