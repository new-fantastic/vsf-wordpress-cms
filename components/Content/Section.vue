<template>
    <section
        class="section container"
        v-if="success === true && anyFilledColumn"
    >
        <div
            class="container__inner"
            :class="[
                sectionName,
                { 
                    'container__inner--boxed' : data.section_options.margins.margins_x === true,
                    'margin__y--sm' : data.section_options.margins.margins_y === 'sm',
                    'margin__y--md' : data.section_options.margins.margins_y === 'md',
                    'margin__y--lg' : data.section_options.margins.margins_y === 'lg',
                    'height--100vh' : data.section_options.height === '100vh',
                    'height--50vh' : data.section_options.height === '50vh',
                    'height--xs' : data.section_options.height === 'xs',
                    'height--sm' : data.section_options.height === 'sm',
                    'height--md' : data.section_options.height === 'md',
                    'height--lg' : data.section_options.height === 'lg',
                    'height--xl' : data.section_options.height === 'xl'
                }
            ]"
        >
            <div
                class="column flex"
                :class="{
                    'column__mobile--sm' : data.section_content['column_' + (index+1)].column_options.height.mobile === 'sm', 
                    'column__mobile--md' : data.section_content['column_' + (index+1)].column_options.height.mobile === 'md', 
                    'column__mobile--lg' : data.section_content['column_' + (index+1)].column_options.height.mobile === 'lg', 
                    'column__mobile--xl' : data.section_content['column_' + (index+1)].column_options.height.mobile === 'xl', 
                    'column__mobile--100vh' : data.section_content['column_' + (index+1)].column_options.height.mobile === '100vh', 
                }"
                v-for="(column, index) in columns"
                :key="index"
            >
                <component
                    :is="column.cmpName"
                    v-if="column !== false"
                    :data="column"
                    :class="{
                        'width--100' : columnAmount === 1,
                        'desktop--hidden' : data.section_content['column_' + (index+1)].column_options.visibility.desktop === 'hidden',
                        'mobile--hidden' : data.section_content['column_' + (index+1)].column_options.visibility.mobile === 'hidden'
                    }"
                />
                <div 
                    v-else
                    class='empty-column'
                />
            </div>
        </div>
  </section>
  <NotFound v-else-if="success === false"/>
</template>

<script>
    import blocks from '../blocks'
    import { getLangByRoute } from '../../util/Lang'
    import { getColumnAmount, layoutNameToCmpName, prepareColumnToRow } from '../../util/Layout'
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
                sectionName: null,
                sectionOptions: null,
                anyFilledColumn: false
            }
        },
        created () {
            try {
                // console.log(this.data)
                this.columnAmount = getColumnAmount(this.data.acf_fc_layout)
                this.sectionName = NumberToWord(this.columnAmount).toLowerCase() + '-col-layout'
                const columns = this.data['section_content']

                for(let i = 1; i <= this.columnAmount; i++) {
                    const prepared = prepareColumnToRow(columns['column_' + i], this.columnAmount)
                    if(prepared === false) {
                        this.columns.push(false)
                    } else {
                        this.columns.push(prepared)
                        if(!this.anyFilledColumn) {
                            this.anyFilledColumn = true
                        }
                    }
                }

                this.success = true
            } catch(e) {
                this.success = false
                console.error('H', e.message)
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
    @import '../../styles/components/Content/Section.scss';
</style>