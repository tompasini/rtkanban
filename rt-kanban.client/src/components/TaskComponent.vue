<template>
  <div class="TaskComponent col-12 light border-rounded shadow p-2 my-2">
    <div class="d-flex justify-content-between">
      <p> {{ task.title }} </p>
      <button class="btn btn-sm btn-danger p-1 h-75" @click="deleteTask(task._id, task.list)">
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
    <div class="d-flex justify-content-between">
      <button @click="viewComments(task.id)" class="btn btn-info h-75">
        View Comments
      </button>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
        >
          Change List
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <div v-for="changeList in lists" :key="changeList._id" class="dropdown-item pointer" @click="updateList(list,changeList._id, task.title, task._id)">
            {{ changeList.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { taskService } from '../services/TaskService'
import { AppState } from '../AppState'
import { useRouter } from 'vue-router'
export default {
  name: 'TaskComponent',
  props: {
    taskProp: Object,
    listId: String
  },
  setup(props) {
    const router = useRouter()
    return {
      task: computed(() => props.taskProp),
      list: computed(() => props.listId),
      lists: computed(() => AppState.lists),
      deleteTask(id, list) {
        taskService.deleteTask(id, list)
      },
      updateList(oldList, listId, title, taskId) {
        taskService.updateList(oldList, listId, title, taskId)
      },
      viewComments(taskId) {
        router.push({ name: 'Comments', params: { id: taskId } })
      }
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.light {
  background-color: #f1e46d;
}
.pointer {
  cursor: pointer;
}
</style>
