<template>
  <div class="ListComponent d-flex flex-column col-3 light border-rounded shadow m-3">
    <div class="border-bottom p-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h3> {{ list.title }} </h3>
        <button class="btn btn-sm btn-danger p-1 h-75" @click="deleteList(list._id, list.board)">
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
      <div>
        <form @submit.prevent="editList(list._id, list.board)" class="d-flex justify-content-between">
          <input type="text" v-model="state.editedList.title" placeholder="List Title" class="narrow">
          <button type="submit" class="btn btn-warning p-1">
            <i class="far fa-edit"></i>
          </button>
        </form>
      </div>
    </div>
    <div class="p-3">
      <h5>Tasks</h5>
      <div>
        <form @submit.prevent="createTask(list._id)" class="d-flex">
          <input type="text" v-model="state.newTask.title" placeholder="New Task Title" class="h-75">
          <button type="submit" class="btn btn-success ml-3 h-75">
            <i class="far fa-plus-square"></i>
          </button>
        </form>
      </div>
      <div class="row">
        <TaskComponent v-for="task in tasks" :key="task._id" :task-prop="task" :list-id="list._id" />
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { listService } from '../services/ListService'
import { taskService } from '../services/TaskService'
export default {
  name: 'ListComponent',
  props: {
    listProp: Object
  },
  setup(props) {
    onMounted(async() => {
      await taskService.getTasksByList(props.listProp._id)
    })
    const state = reactive({
      editedList: {},
      newTask: {}
    })
    return {
      state,
      list: computed(() => props.listProp),
      tasks: computed(() => AppState.tasks[props.listProp._id]),
      editList(listId, board) {
        listService.editList(state.editedList, listId, board)
      },
      deleteList(listId, board) {
        listService.deleteList(listId, board)
      },
      createTask(listId) {
        state.newTask.list = listId
        taskService.createTask(listId, state.newTask)
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
  .light {
  background-color: #e4b0d9;
}
</style>
