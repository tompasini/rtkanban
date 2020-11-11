<template>
  <div class="TaskComponent col-12 bg-light border-rounded shadow p-2 my-2">
    <div class="d-flex justify-content-between">
      <p> {{ task.title }} </p>
      <button class="btn btn-sm btn-danger p-1 h-75" @click="deleteTask(task._id, task.list)">
        Delete
      </button>
    </div>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
      >
        Dropdown button
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <div v-for="changeList in lists" :key="changeList._id" class="dropdown-item" @click="updateList(list,changeList._id, task.title, task._id)">
          {{ changeList.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { taskService } from '../services/TaskService'
import { AppState } from '../AppState'
export default {
  name: 'TaskComponent',
  props: {
    taskProp: Object,
    listId: String
  },
  setup(props) {
    return {
      task: computed(() => props.taskProp),
      list: computed(() => props.listId),
      lists: computed(() => AppState.lists),
      deleteTask(id, list) {
        taskService.deleteTask(id, list)
      },
      updateList(oldList, listId, title, taskId) {
        taskService.updateList(oldList, listId, title, taskId)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
