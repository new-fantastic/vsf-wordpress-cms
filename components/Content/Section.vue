<template>
    <section
        :class="sectionName"
        v-if="success === true"
    >
        <div
            class="column"
            v-for="(column, index) in columns"
            :key="index"
        >
            <component
            :is="column.cmpName"
            :data="column"
            />
        </div>
  </section>
  <NotFound v-else-if="success === false"/>
</template>

<script>
    import blocks from '../blocks'
    import { getLangByRoute } from '../../util/GetLang'
    import { getColumnAmountAndPrefix, layoutNameToCmpName, prepareColumnToRow } from '../../util/Filters'
    import NumberToWord from '../../util/NumberToWord'

    export default {
        name: 'Section',
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
                sectionName: null
            }
        },
        created () {
            try {
                const { columns, prefix } = getColumnAmountAndPrefix(this.data)
                const columnsKey = prefix + 'content'
                this.columnAmount = columns
                this.sectionName = NumberToWord(this.columnAmount).toLowerCase() + '-col-layout'

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

<style lang="scss">
    .col_layout {
        width: 100%;
        display: flex;
    }
    @import '../../styles/main.scss';
</style>