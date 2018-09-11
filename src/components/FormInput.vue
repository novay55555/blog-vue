<template>
  <div :class="'form-input form-group ' + status">
    <label 
      v-if="label"
      class="control-label" 
      :for="name"
    >
      {{errMsg || label}}
    </label>
    <input
      ref="input"
      class="form-control" 
      :type="type"
      :value="currentValue"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      @input="change($event)"
      @keyup.enter="enterKeyboard"
    />
  </div>
</template>

<script>
import { mixinInput } from '../libs/mixins.js'

export default {
  name: 'form-input',
  props: {
    type: {
      type: String,
      default: 'text'
    }
  },
  mixins: [mixinInput]
}
</script>

<style>
</style>
