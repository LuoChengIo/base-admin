<template>
  <transition name="list-up" mode="out-in">
    <span class="span" :key="activeIndex" @mouseover="clear" @mouseout="start">
      {{activeItem}}
    </span>
  </transition>
</template>

<script>
export default {
  name: 'scroll-msg',
  data() {
    return {
      timeout: null,
      items: ['这是第一条消息', '这是第二条消息', '这是第三条消息', '这是第四条消息'],
      activeIndex: 0
    }
  },
  props: {
  },
  computed: {
    activeItem() {
      return this.items[this.activeIndex]
    }
  },
  methods: {
    countIndex() {
      if (this.activeIndex < (this.items.length - 1)) {
        this.activeIndex++
      } else {
        this.activeIndex = 0
      }
    },
    clear() {
      clearInterval(this.timeout)
    },
    start() {
      this.timeout = setInterval(this.countIndex, 2000)
    }
  },
  mounted() {
    this.start()
  },
  beforeDestroy() {
    this.clear()
  }
}
</script>

<style scoped>
.span{
  display: inline-block;
}
.list-up-enter-active {
  transition: all .5s ease;
}
.list-up-leave-active {
  transition: all .5s ease;
}
.list-up-enter{
  transform: translateY(20px);
  opacity: 0;
}

.list-up-leave-to
/* .list-up-leave-active for below version 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
