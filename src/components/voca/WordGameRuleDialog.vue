<template>
  <v-dialog
      persistent
      class="dialog"
      activator="parent"
      width="400px"
  >
    <v-card>
      <template v-slot:title>
        Word Game Rule
      </template>
      <v-card-text>
        <ol class="word-list ml-5">
          <li>Case-insensitive</li><br>
          <li>Spaces(' '), commas(',), tildes(~), dashes(-), and periods(.) are optional</li><br>
          <li>Using commas, square brackets, or parentheses, if there are multiple meanings,
            getting one correct definition is considered a correct answer<br><br>
            크다 - quick, large => quick (O), large(O) <br>
            크다 - quick[large] => quick (O), large(O) <br>
            크다 - quick(large) => quick (O), large(O)
          </li>
        </ol>
      </v-card-text>

      <v-card-actions>
        <v-btn
            elevation="4"
            @click="close()"
        >
          close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  methods: {
    close() {
      this.$emit('closeRulePopup');
    }
  }
}
</script>
<style scoped>

</style>