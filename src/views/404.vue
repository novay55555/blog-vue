<template>
  <Layout>
    <div class="not-found">
      <h1>Never Mind :P</h1>
      <h4>The longest distance in the world is not just only 404</h4>
      <p>I'll find it out sooner or later</p>
      <div class='progress'>
        <div 
          :style="{ width: `${progress}%` }" 
          ref="progressBar"
          class='progress-bar progress-bar-info' 
          role='progressbar' 
          aria-valuenow={progress} 
          aria-valuemin='0' 
          aria-valuemax='100' 
        />
        <div class='progress-text'>
          {{isBack ? 'Holy shit :(' : `${progress}%`}}
        </div>
      </div>
    </div>
  </Layout>
  
</template>

<script>
import Layout from '../layouts/MainPage.vue'

let timer = null

export default {
  name: 'not-found',
  components: {
    Layout
  },
  data() {
    return {
      progress: 0,
      max: 99.99,
      isBack: false
    }
  },
  mounted() {
    const progressBar = this.$refs.progressBar
    const animateFunc = () => {
      if (!this.isBack) return
      this.isBack = false
      this.animate()
    }
    const events = ['transitionend', 'webkitTransitionEnd']

    events.forEach(event => {
      progressBar.addEventListener(event, animateFunc)
    })

    this.animate()
  },
  beforeDestroy() {
    clearTimeout(timer)
  },
  methods: {
    increase() {
      const { progress, max } = this
      const random = Math.round(Math.random() * 300) / 100
      let nextProgress = Math.round((progress + random) * 100) / 100
      if (nextProgress > max) {
        nextProgress = Math.round(Math.random() * max * 100) / 100
        this.isBack = true
        this.progress = nextProgress
        return clearTimeout(this.timer)
      } else {
        this.progress = nextProgress
        this.animate()
      }
    },
    animate() {
      timer = setTimeout(this.increase, 99.8)
    }
  }
}
</script>

<style lang="scss">
.not-found {
  padding: 0 15px;
  text-align: center;
  .progress {
    position: relative;
    margin: 0 auto;
    max-width: 998px;
  }
  .progress-text {
    position: absolute;
    top: 0;
    left: 50%;
    text-align: center;
    line-height: 20px;
    transform: translateX(-50%);
    color: #9900cc;
  }
}
</style>
