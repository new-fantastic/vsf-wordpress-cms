  import NumberToWord from '../util/NumberToWord'
  import ColLayout from './Content/Layout.vue'

  export default {
    functional: true,
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

        const sections = []
        context.props.data.acf.section.forEach((el, index) => {

          sections.push(
            h(ColLayout, {
              props: {
                data: el
              }
            })
          )

        })

        return sections.length > 1 ? sections : sections[0]
        
      }
    }
  }
