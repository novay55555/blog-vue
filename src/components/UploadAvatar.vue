<template>
  <div class="upload-avatar">
    <div class="photo">
      <img :src="photo" alt="">
      <input 
        type='file' 
        title='更换头像' 
        accept='image/*' 
        @change="changePhoto($event)"
      />
      <div class="preview"></div>
    </div>
    <div 
      class="cropper"
      :style="{
        display: isUploadMode ? 'block' : 'none'
      }"
    >
      <img ref="image" />
      <div class="cropper-btns">
        <button class="btn btn-success" @click="upload">确定</button>
        <button class="btn btn-danger" @click="cancel($event)">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { loadPlugin } from '../libs/utils.js'

export default {
  name: 'upload-avatar',
  props: {
    photo: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      $cropper: null,
      isUploadMode: false
    }
  },
  mounted() {
    loadPlugin('cropper').then(() => {
      this.$cropper = $(this.$refs.image).cropper({
        viewMode: 2,
        preview: '.preview'
      })
    })
  },
  methods: {
    changePhoto(e) {
      const image = e.target.files[0]
      if (!image) return

      const reader = new FileReader()
      reader.onload = e => {
        this.isUploadMode = true
        setTimeout(() => {
          this.$cropper.cropper('replace', e.target.result)
          this.$cropper._fileType = image.type
        })
      }
      reader.readAsDataURL(image)
    },
    upload() {
      this.$emit(
        'on-upload',
        this.$cropper
          .cropper('getCroppedCanvas')
          .toDataURL(this.$cropper._fileType),
        this
      )
    },
    cancel(e) {
      $(e.target)
        .closest('.cropper')
        .siblings('.photo')
        .find('.preview')
        .html('')
      this.$cropper.attr('src', '')
      this.isUploadMode = false
    }
  }
}
</script>

<style lang="scss">
.upload-avatar {
  padding: 15px;
  text-align: center;
  .photo {
    position: relative;
    margin: 0 auto;
    width: 150px;
    height: 150px;
    border: 4px solid #eee;
    border-radius: 50%;
    overflow: hidden;
    transform: translateZ(0);
    transition: all 0.25s ease-in-out;
    &:hover {
      border-color: #800080;
    }
    img {
      width: 100%;
      height: 100%;
      transition: all, 0.5s ease-in-out;
      &:hover {
        transform: scale(1.2, 1.2) translate(-5%, 7%);
      }
    }
    input[type='file'] {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 50%;
      opacity: 0;
      cursor: pointer;
      z-index: 3;
    }
    .preview {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: auto !important;
      height: auto !important;
      z-index: 2;
    }
  }
  .cropper-btns {
    margin-top: 10px;
    text-align: center;
    button:first-child {
      margin-right: 10px;
    }
  }
  .cropper {
    & > img {
      max-width: 100%;
      max-height: 250px;
    }
  }
}
</style>
