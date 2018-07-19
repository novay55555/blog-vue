<template>
  <uiv-modal
    v-model="value"
    title="登录"
    cancel-text="取消"
    ok-text="确定"
    size="sm"
  >
    Hello world
  </uiv-modal>
</template>

<script>
import { mixinModal } from '../libs/mixins.js'

export default {
  name: 'modal-signin',
  mixins: [mixinModal]
}
</script>

<style>
</style>
