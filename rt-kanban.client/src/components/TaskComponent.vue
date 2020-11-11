<template>
  <div class="TaskComponent col-12 bg-light border-rounded shadow p-2">
    <p> task body </p>
    <div>
      <!-- <form @submit.prevent="editTask(task._id, task.list)" class="d-flex justify-content-between">
        <input type="text" v-model="state.editedTask.body" placeholder="Task" class="narrow">
        <button type="submit" class="btn btn-warning p-1">
          Edit
        </button>
      </form>
      <button class="btn btn-sm btn-danger p-1 h-75" @click="deleteTask(task._id, task.list)">
        Delete
      </button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskComponent',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
