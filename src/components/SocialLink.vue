<template>
  <a
    target="_blank"
    :href="link"
    :class="position"
  >
    <div v-if="position === 'right'">
      <img :src="data" alt=""/>
    </div>
    <div v-else-if="position === 'left'">
      {{data}}
    </div>
  </a>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
    link: {
      type: Object,
    },
    position: {
      type: Object,
    },
  },
};
</script>
<style scoped lang="scss">
.left {
  margin-left: 80px;
  margin-right: auto;
  width: 46px;
  height: 16px;
  font-family: Work Sans, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #55BCC0;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: $clrNavHover;
  }
}
.right {
  margin-left: 28px;
}
.right:last-child {
  margin-right: 82px;
}
</style>