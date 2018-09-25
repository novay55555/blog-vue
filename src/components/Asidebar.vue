<template>
  <div class="asidebar">
    <div :class="'wrapper ' + (showMobileAside ? 'active' : '')">
      <ul ref="ul">
        <li 
          v-for="(item, index) in data" 
          :key="index"
          :class="activeIndex === index ? 'active' : ''"
          @click="stopPropagationClick"
        >
          <span 
            :class="'glyphicon ' + item.icon" 
            @click.stop="toggleChildren(index)"
          />
          <div 
            :style="{top: index === 0 ? index : (index * liHeight + liPaddingTop) + 'px'}" 
            class="children"
          >
            <slot :name="item.slotName || ''" />
          </div>
        </li>
      </ul>
    </div>
    <span 
      class="glyphicon glyphicon-align-justify btn-mobile"
      @click="toggleMobileAside"
    />
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Asidebar',
  props: {
    data: Array
  },
  data() {
    return {
      liHeight: 0,
      liPaddingTop: 0,
      activeIndex: -1,
      showMobileAside: false
    }
  },
  mounted() {
    const $li = $(this.$el).find('li')

    if ($li.length) {
      this.liHeight = $li.outerHeight()
      this.liPaddingTop = ($li.outerHeight() - $li.height()) / 2
    }

    document.addEventListener('click', this.hideChildren)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideChildren)
  },
  methods: {
    toggleChildren(index) {
      if (this.activeIndex === index) return (this.activeIndex = -1)
      this.activeIndex = index
    },
    hideChildren() {
      this.activeIndex = -1
    },
    stopPropagationClick(e) {
      e.stopPropagation()
      if (e.target.tagName.toLowerCase() === 'li') {
        this.hideChildren()
      }
    },
    toggleMobileAside() {
      this.showMobileAside = !this.showMobileAside
    }
  }
}
</script>

<style lang="scss">
.asidebar {
  .wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 75px;
    background: #222;
    z-index: 998;
  }
  ul {
    margin-bottom: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #222;
  }
  li {
    padding: 20px 0;
    text-align: center;
    &.active {
      overflow-y: initial;
      & > .glyphicon {
        color: #eee;
      }
      .children {
        transform: translate(100%, 0);
        transform: translate3d(100%, 0, 0);
      }
    }
    & > .glyphicon {
      padding: 5px;
      font-size: 24px;
      color: #555;
      cursor: pointer;
      transition: transform 0.25s ease-in-out;
      &:hover {
        transform: rotateZ(360deg);
      }
    }
  }
  .children {
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    transition: transform 0.25s ease-in-out;
    transform: translate(0, 0);
    transform: translate3d(0, 0, 0);
  }
  .list-group-item {
    background: rgba(0, 0, 0, 0.9);
    border-color: #222;
    color: #eee;
    width: 150px;
  }
  .feature-search {
    width: 180px;
    input {
      height: 44px;
    }
    a {
      color: #ccc;
      &:hover {
        color: #66afe9;
      }
    }
  }
  .btn-mobile {
    padding: 8px;
    position: fixed;
    top: 25px;
    right: 25px;
    z-index: 998;
    display: none;
    border-radius: 4px;
    text-align: center;
    background: #222;
    color: #555;
    cursor: pointer;
    &:hover,
    &.active {
      color: #eee;
    }
  }
}

@media (max-width: 500px) {
  .asidebar {
    .wrapper {
      transition: transform 0.25s ease-in-out;
      transform: translate3d(-100%, 0, 0);
      &.active {
        transform: translate3d(0, 0, 0);
      }
    }
    .btn-mobile {
      display: block;
    }
  }
}
</style>
