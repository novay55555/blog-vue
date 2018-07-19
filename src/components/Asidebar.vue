<template>
  <div class="asidebar">
    <div>
      <ul>
        <li v-for="(item, index) in data" :key="index">
          <span :class="'glyphicon ' + (item.btn || '')"></span>
          <div class="children">
            {{item.content && item.content()}}
          </div>
        </li>
      </ul>
      <span class="glyphicon glyphicon-align-justify"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'asidebar',
  props: {
    data: Array
  }
}
</script>

<style lang="scss">
.asidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 75px;
  background: #222;
  z-index: 998;
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
      &.children {
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
  .btn-slidebar-mobile {
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
  .search {
    position: relative;
    margin-bottom: 0;
    input {
      padding-right: 30px;
    }
    .glyphicon {
      position: absolute;
      top: 50%;
      right: 5px;
      padding: 5px;
      transform: translate(0, -50%);
      font-size: 1.1em;
      color: #333;
      cursor: pointer;
      &:hover {
        color: #ff0000;
      }
    }
  }
}
</style>
