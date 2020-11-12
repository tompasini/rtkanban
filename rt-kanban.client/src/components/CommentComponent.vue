<template>
  <div class="CommentComponent col-6 light border-rounded shadow m-3 p-3 d-flex justify-content-between">
    <p> {{ comment.title }} </p>
    <button @click="deleteComment(comment.id)" class="btn btn-danger h-75">
      <i class="far fa-trash-alt"></i>
    </button>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentService } from '../services/CommentService'
export default {
  name: 'CommentComponent',
  props: {
    commentProp: Object,
    taskId: String
  },
  setup(props) {
    const state = reactive({
      newComment: {}
    })
    return {
      state,
      comment: computed(() => props.commentProp),
      task: computed(() => props.taskId),
      tasks: computed(() => AppState.tasks),
      deleteComment(id, task) {
        commentService.deleteComment(id, task)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.light {
  background-color: #86f83b;
}
</style>
