<template>
  <div :class="'form-input form-group ' + status">
    <label 
      v-if="label"
      :for="name" 
      class="control-label"
    >
      {{ errMsg || label }}
    </label>
    <input
      ref="input"
      :type="type" 
      :value="currentValue"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      class="form-control"
      @input="change($event)"
      @keyup.enter="enterKeyboard"
    >
  </div>
</template>

<script>
import { mixinInput } from '../libs/mixins.js'

export default {
  name: 'FormInput',
  mixins: [mixinInput]
}
</script>

<style>
</style>
