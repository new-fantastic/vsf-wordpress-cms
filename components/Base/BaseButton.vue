<template>
  <button 
    v-bind="$attrs"
    class="flex position-x--center position-y--center"
    :class="{
    'btn': true,
    'btn--sm': size === 'sm',
    'btn--lg': size === 'lg',
    'btn--full': size === 'full',
    'btn--bordered': type === 'bordered'
  }">
    <router-link
      v-if="link !== '' && externalLink === false"
      :to="link"
    >
      <slot />
    </router-link>
    <a
      v-else-if="link !== '' && externalLink === true"
      :href="link"
    >
      <slot />
    </a>
    <div
      v-else
      class="btn__inner"
      @click="emit"
    >
      <slot />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'sm'
    },
    link: {
      type: String,
      default: ''
    },
    externalLink: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    event: {
      type: String,
      default: ''
    }
  },
  methods: {
    emit () {
      this.$bus.$emit(this.event)
    }
  }
}
</script>

<style lang="scss">

  @import '../../styles/components/Base/BaseButton.scss';

</style>
