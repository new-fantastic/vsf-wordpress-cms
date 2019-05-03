  import NumberToWord from '../util/NumberToWord'
  import OneColLayout from './OneColLayout.vue'
  import TwoColLayout from './TwoColLayout.vue'

  const cmpsSections = {
    OneColLayout,
    TwoColLayout
  }

  export default {
    functional: true,
    components: {
      OneColLayout,
      TwoColLayout
    },
    props: {
      renderSingle: {
        type: String,
        default: ''
      },
      data: {
        type: Object,
        default: null,
        validator(value) {
          if(!('acf' in value)) {
            return false
          }
          if(!('section' in value.acf)) {
            return false
          }

          if(value.acf.section.lenght < 1) {
            return false
          }

          return true
        }
      }
    },
    render(h, context) {
      if(context.props.data && context.props.data.acf && context.props.data.acf.section) {

        if(context.props.renderSingle) {
          return h(cmpsSections[`Sections${renderSingle}`], {
            props: {
              data: context.props.data.acf.section.find(e => e.acf_fc_layout === renderSingle)
            }
          })
        } else {
          const sections = []
          context.props.data.acf.section.forEach((el, index) => {
            const cmpName = el.acf_fc_layout
            .replace("wp_", "")
            .replace(/^(.)/, k => NumberToWord(k))
            .replace(/(\_\w)/g, function(k) {
              return k[1].toUpperCase();
            })

            sections.push(
              h(cmpsSections[cmpName], {
                props: {
                  data: el
                }
              })
            )

            // sections.push(
            //   h(cmpName, {}, [h(cmpsSections[`Section${el.acf_fc_layout}`], {
            //     props: {
            //       data: el
            //     },
            //     key: `${el.acf_fc_layout}-${index}`
            //   })])
            // )
          })

          return sections
        }
      }
    }
  }
