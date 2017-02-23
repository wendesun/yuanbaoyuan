<template lang="jade">
  #carousel
  ul(:style="{width: listWidth, transform: trackPosition}")
  li(v-for="car in images", :style="{width: itemWidth}")
  .item
  img(:src="car.img")
  #prev(@click="previous")
  img(src="../assets/images/arrow-grey-left.png")
  #next(@click="next")
  img(src="../assets/images/arrow-grey-right.png")
  #dots(v-if="dots")
  a(href="javascript:;", v-for="0 in images.length", :class="{'current-tab': $index === current}", @click="changeTab($index)")
</div></template>

<script>
  export default {
    data () {
    return {
      current: this.startAt,
      timer: ''
    }
  },
  computed: {
    listWidth () {
      return this.images.length * 100 + '%'
    },
    itemWidth () {
      return 100 / this.images.length + '%'
    },
    trackPosition () {
      return 'translateX(-' + 100 * this.current / this.images.length + '%)'
    }
  },
  props: ['images', 'dots', 'autoPlay', 'speed', 'startAt'],
    ready () {
    if (this.autoPlay) {
      this.timer = window.setInterval(() => {
        if (this.current === this.images.length - 1) {
          this.current = 0
        } else {
          this.current ++
        }
      }, this.speed)
    }
  },
  beforeDestroy () {
    this.clearInterval(this.timer)
  },
  methods: {
    previous () {
      if (this.current === 0) {
        this.current = 2
      } else {
        this.current--
      }
    },
    next () {
      if (this.current === 2) {
        this.current = 0
      } else {
        this.current++
      }
    },
    changeTab (idx) {
      this.current = idx
    }
  }
  }
</script>

<style lang="stylus">
  #carousel
  overflow hidden
  position relative
  ul
  transition transform 0.3s ease
                          list-style none
                          margin 0
  padding 0
  &:after
   content ''
  display table
  clear both
  li
  float left
  img
  max-width 100%
  #prev
  #next
  position absolute
  top 50%
  margin-top -21px
                opacity 0.7
  &:hover
   opacity 1
  #prev
  left 5px
        #next
        right 5px
               #dots
               position absolute
               bottom 10px
                        width 100%
  text-align center
  a
  width 10px
          height 10px
                   margin 0 5px
                             border-radius 50%
  background rgba(255,255,255,0.5)
  z-index 10
  display inline-block
      &.current-tab
  background #fff
</style>
