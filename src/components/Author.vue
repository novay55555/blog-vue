<template>
  <div class="author">
    <div class='photo'>
      <img src="https://aijiang.ga/img/avatar-1505029156458.jpeg" :alt="data.name" />
    </div>
    <div class='intro'>
      <p>{{data.name}}</p>
      <p>{{data.job}}</p>
      <p>{{data.intro}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'author',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.author {
  margin-bottom: 10px;
  padding: 15px 0;
  word-break: break-all;
  text-align: center;
  .photo {
    margin: 0 auto 10px auto;
    width: 150px;
    height: 150px;
    border: 4px solid #eee;
    border-radius: 50%;
    overflow: hidden;
    transform: translateZ(0);
    img {
      width: 100%;
      height: 100%;
      transition: all, 0.5s ease-in-out;
      &:hover {
        transform: scale(1.2, 1.2) translate(-5%, 7%);
      }
    }
  }
  .intro {
    p:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
