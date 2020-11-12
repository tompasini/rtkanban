<template>
  <div class="Home container-fluid">
    <div class="row justify-content-center align-items-center h-100">
      <div class="col-6 align-self-center text-center homeCard border-rounded shadow" v-if="profile.id" @click="getBoards">
        <h1>Manage Your Boards</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { useRouter } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    return {
      profile: computed(() => AppState.profile),
      user: computed(() => AppState.user),
      getBoards() {
        router.push({ name: 'Profile' })
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.homeCard {
  background-color: #faa650;
  padding: 2em;
  border-radius: 10px;
}

.homeCard:hover {
  cursor: pointer;
}
</style>
