<template>
  <div
    v-if="data"
    id="wysiwyg"
    class="wysiwyg__wrapper"
  >
    <div
      class="wysiwyg__content"
      v-html="data.wysiwyg_content"
    />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">

  @import '../../../styles/components/Content/Blocks/Wysiwyg.scss';

</style>
