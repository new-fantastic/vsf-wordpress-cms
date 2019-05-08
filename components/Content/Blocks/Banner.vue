<template>
  <div
    class="banner"
  >
    <div
      class="banner__inner"
      :class="{
        'padding--xs' : data.inner_layout.padding === 'xs',
        'padding--sm' : data.inner_layout.padding === 'sm',
        'padding--md' : data.inner_layout.padding === 'md',
        'padding--lg' : data.inner_layout.padding === 'lg',
        'padding--xl' : data.inner_layout.padding === 'xl',
      }"
    >
      <div
        class="banner__background flex"
      >
        <div
          class="banner__background__inner"
        >
          <img
          class="banner__background__image desktop"
          v-if="data['background_image_desktop']"
          :src="data['background_image_desktop'].url"
          :alt="data['background_image_desktop'].alt"
        >
        <img
          class="banner__background__image mobile"
          v-if="data['background_image_mobile']"
          :src="data['background_image_mobile'].url"
          :alt="data['background_image_mobile'].alt"
        >
        </div>
      </div>
      <div
        class="banner__content padding__y--lg"
        :class="{
          'boxed--inner' : data['inner_layout']['margins_x'],
          'margin-y--sm' : data['inner_layout']['margins_y'] === 'small',
          'margin-y--lg' : data['inner_layout']['margins_y'] === 'big'
          }"
      >
        <div
          class="banner__content__inner flex"
          :class="{
            'position-x--left' :
              data['inner_layout']['text_position_x'] === 'left',
            'position-x--center' :
              data['inner_layout']['text_position_x'] === 'center',
            'position-x--right' :
              data['inner_layout']['text_position_x'] === 'right',
            'position-y--top' :
              data['inner_layout']['text_position_y'] === 'top',
            'position-y--center' :
              data['inner_layout']['text_position_y'] === 'center',
            'position-y--bottom' :
              data['inner_layout']['text_position_y'] === 'bottom',
          }"
        >
          <div
            class="banner__description"
          >
            <h2
              class="banner__title"
              :class="{
                'dark' : titleDark,
                'light' : titleLight
              }"
              v-if="data['title']"
              v-html="data['title']"
            />
            <div
              class="banner__subtitle"
              :class="{
                'dark' : subtitleDark,
                'light' : subtitleLight
              }"
              v-if="data['subtitle']"
              v-html="data['subtitle']"
            />
            <div
              class="banner__actions flex--wrap"
              :class="{
                'position-x--left' :
                  data['inner_layout']['text_position_x'] === 'left',
                'position-x--center' :
                  data['inner_layout']['text_position_x'] === 'center',
                'position-x--right' :
                  data['inner_layout']['text_position_x'] === 'right',
                'position-y--top' :
                  data['inner_layout']['text_position_y'] === 'top',
                'position-y--center' :
                  data['inner_layout']['text_position_y'] === 'center',
                'position-y--bottom' :
                  data['inner_layout']['text_position_y'] === 'bottom',
              }"
              v-if="data.actions"
            >
              <BaseButton
                v-for="(button, index) in data.actions"
                :key="button['button_link']"
                :class="{
                  'dark' : button['button_color'] === 'dark',
                  'light' : button['button_color'] === 'light',
                  'outline' : false
                }"
                :size="button['button_size']"
                :link="button['button_link']"
                v-html="button['button_label']"
                :externalLink="externalLink[index]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IsLinkExternal from '../../../util/IsLinkExternal'

export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  components: {
    BaseButton: () => import('../../Base/BaseButton.vue')
  },
  computed: {
    externalLink () {
      const links = []
      this.data.actions.forEach(el => {
        links.push(
          IsLinkExternal(el['button_link'])
        )
      })
      return links
    }
  }
}
</script>

<style lang="scss">

  @import '../../../styles/components/Content/Blocks/Banner.scss';
  // @import '../../../styles/main.scss';

</style>
