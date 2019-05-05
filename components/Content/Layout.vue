<template>
  <div :class="className" v-if="success === true">
    <component 
      v-for="(column, index) in columns"
      :key="index"
      :is="column.cmpName"
      :data="column"
    />
  </div>
  <NotFound v-else-if="success === false"/>
</template>

<script>
    import blocks from '../blocks'
    import { getLangByRoute } from '../../util/GetLang'
    import { getColumnAmountAndPrefix, layoutNameToCmpName, prepareColumnToRow } from '../../util/Filters'
    import NumberToWord from '../../util/NumberToWord'

    export default {
        name: 'ColLayout',
        components: blocks,
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                columns: [],
                columnAmount: null,
                success: null,
                className: null
            }
        },
        created () {
            try {
                const { columns, prefix } = getColumnAmountAndPrefix(this.data)
                const columnsKey = prefix + 'content'
                this.columnAmount = columns
                this.className = NumberToWord(this.columnAmount).toLowerCase() + '-col-section'

                for(let i = 1; i <= this.columnAmount; i++) {
                    this.columns.push(
                        prepareColumnToRow(this.data[columnsKey][prefix + i], this.columnAmount)
                    )
                }

                this.success = true
            } catch(e) {
                this.success = false
                console.error(e.message)
            }
        }
    }

</script>

<style>
    .col_layout {
        width: 100%;
        display: flex;
    }
</style>