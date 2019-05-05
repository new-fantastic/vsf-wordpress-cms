<template>
  <div
    class="banner__wrapper"
  >
    <div
      class="banner__images"
    >
      <img
        class="banner__image--desktop"
        v-if="data['background_image_desktop']"
        :src="data['background_image_desktop'].url"
        :alt="data['background_image_desktop'].alt"
      >
      <img
        class="banner__image--mobile"
        v-if="data['background_image_mobile']"
        :src="data['background_image_mobile'].url"
        :alt="data['background_image_mobile'].alt"
      >
    </div>
    <div
      class="banner__content"
      :class="{
        'boxed--inner' : data['inner_layout']['margins_x'],
        'margin-y--sm' : data['inner_layout']['margins_y'] === 'small',
        'margin-y--lg' : data['inner_layout']['margins_y'] === 'big'
        }"
    >
      <div
        class="banner__description"
      >
        <div
          class="banner__description--inner"
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
            class="banner__actions"
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
</template>

<script>
import IsLinkExternal from '../../util/IsLinkExternal'

export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  components: {
    BaseButton: () => import('../other/Button.vue')
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
  // @import '~theme/css/kubota/base/variables';
  // @import '~theme/css/kubota/base/typography';

  .section-wp {
    margin: 5rem auto;
    min-height: 400px;
  }

  .banner-fw {
    width: 100%;
    position: relative;
    margin: 0 auto !important;

    &.margins-top-bottom {
      margin: 5rem auto !important;
      @media all and (max-width: 980px) {
        margin: 3rem auto !important;
      }
    }

    .container {
      height: 100%;

      .banner-fw__content {
        
        &-wrap {

          &.container {
            padding: 10rem;
            @media all and (max-width: 980px) {
              padding: 3rem;
              width: 100%;
            }
          }
        }
      }
    }

    &--lg {
      height: 930px;
    }

    &--sm {
      height: 750px;
    }

    &__image {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
      display: none;

      @media all and (min-width: 980px) {
        display: block;
        &.mobile {
          display: none;
        }
      }
    }

    &__content-wrap {
      position: absolute;
      display: flex;
      align-items: center;
      // width: 100%;
      height: 100%;
      z-index: 2;
      // color: $color-white;
      color: #fff;
      left: 50%;
      transform: translate(-50%);

      &--left {
        justify-content: flex-start;

        .banner-fw__content {
          align-items: flex-start;
          text-align: left;
        }
      }

      &--center {
        justify-content: center;

        .banner-fw__content {
          align-items: center;
          text-align: center;
        }
      }

      &--right {
        justify-content: flex-end;

        .banner-fw__content {
          align-items: flex-end;
          text-align: right;
        }
      }
    }

    &__content {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;

      &__title {
        // @extend .heading-lg;
        font-size: 3rem;
        font-weight: 700;
        max-width: 24rem;
        padding-bottom: 9px;
        @media all and (max-width: 767px) {
          text-align: center !important;
          align-self: center !important;
          justify-self: center !important;
        }
      }

      &__description {
        margin: 1rem 0;
        p {
          // @extend .paragraph-md;
          font-size: 1.2rem;
        }

        ul, ol {
          margin: 1rem 0;
          padding-left: 2rem;
          list-style: initial !important;

          li {
            list-style: initial !important;
            padding-left: 2rem;
            margin-bottom: .6rem;
          }
        }
      }

      &__btn {
        display: block;
        margin-top: 22px;
      }
    }
  }
</style>
