<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left" width="45%">
        Name
      </th>
      <th class="text-left" width="45%">
        Calories
      </th>
      <th class="text-left" width="10%">
        check
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="word in words"
        :key="word.id"
    >
      <td>{{ word.english }}</td>
      <td>{{ word.korean }}</td>
      <td>
        <v-checkbox v-model="word.check"></v-checkbox>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  props: {
    words: Array,
  },
  data () {
    return {

    }
  },
}
</script>

<style scoped>

</style>