<template>
  <div class="CommentPage container-fluid">
    <div class="row border-bottom p-3 mb-3">
      <h3 class="col-12 p-3">
        {{ task.title }}
      </h3>
      <form @submit.prevent="createComment()" class="col-12 d-flex">
        <input type="text" v-model="state.newComment.title" placeholder="Comment">
        <button type="submit" class="btn btn-success ml-3">
          <i class="far fa-plus-square"></i>
        </button>
      </form>
    </div>
    <div class="row flex-column align-items-center">
      <CommentComponent v-for="comment in comments" :key="comment._id" :comment-prop="comment" :task-id="task._id" />
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed } from 'vue'
import { commentService } from '../services/CommentService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'CommentPage',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await commentService.getActiveTask(route.params.id)
      await commentService.getCommentsByTask(route.params.id)
    })
    const state = reactive({
      newComment: {}
    })
    return {
      state,
      task: computed(() => AppState.activeTask),
      comments: computed(() => AppState.comments[route.params.id]),
      createComment() {
        state.newComment.task = route.params.id
        commentService.createComment(route.params.id, state.newComment)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
