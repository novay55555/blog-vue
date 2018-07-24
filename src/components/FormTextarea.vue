<template>
  <div class="form-textarea form-group">
    <label 
      v-if="label"
      class="control-label" 
      :for="name"
    >
      {{errMsg || label}}
    </label>
    <textarea 
      ref="input"
      :class="'form-control ' + className" 
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      :readonly="readonly"
      @input="change($event)"
    />
  </div>
</template>

<script>
import { mixinInput } from '../libs/mixins.js'

export default {
  name: 'form-textarea',
  props: {
    className: String,
    readonly: String
  },
  mixins: [mixinInput]
}
</script>

<style>
</style>
