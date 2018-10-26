<template>
  <div :class="'form-textarea form-group ' + status">
    <label 
      v-if="label"
      :for="name" 
      class="control-label">
      {{ errMsg || label }}
    </label>
    <textarea 
      ref="input"
      :class="'form-control ' + className" 
      :value="currentValue"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      :readonly="readonly"
      @input="change($event)"/>
  </div>
</template>

<script>
import { mixinInput } from '../libs/mixins.js'

export default {
  name: 'FormTextarea',
  mixins: [mixinInput],
  props: {
    className: String,
    readonly: String
  }
}
</script>

<style>
</style>
