<template>
    <div class="col_layout" v-if="success">
         <component 
            v-for="(column, index) in columns"
            :key="index"
            :is="column.cmpName"
            :data="column"
            />
    </div>
</template>

<script>
    import sections from '../sections'
    import { getLangByRoute } from '../../util/GetLang'
    import { getColumnAmountAndPrefix, layoutNameToCmpName, prepareColumnToRow } from '../../util/Filters'

    export default {
        name: 'ColLayout',
        components: sections,
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
                success: false
            }
        },
        created () {
            try {
                const { columns, prefix } = getColumnAmountAndPrefix(this.data)
            } catch(e) {
                console.error(e.message)
                return
            }
            const columnsKey = prefix + 'content'
            this.columnAmount = columns

            if(this.columnAmount == 1) {
                this.columns.push(
                    prepareColumnToRow(this.data[columnsKey], this.columnAmount)
                )
            } else {
                for(let i = 1; i <= this.columnAmount; i++) {
                    this.columns.push(
                        prepareColumnToRow(this.data[columnsKey][prefix + i], this.columnAmount)
                    )
                }
            }

            this.success = true
        }
    }

</script>

<style>
    .col_layout {
        width: 100%;
        display: flex;
    }
</style>