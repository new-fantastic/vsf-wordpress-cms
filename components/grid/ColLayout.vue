<template>
    <div class="two_col_layout">
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
                columnAmount: null
            }
        },
        created () {
            const key = Object.keys(this.data).filter(v => v != "acf_fc_layout")
            if(key.length < 1) {
                return
            }
            const regex = /wp_(\d+)_col_layout/.exec(key[0])
            
            if (regex === null || regex.length < 2) {
                return
            }
            this.columnAmount = regex[1]
            const prefix = regex[0] + '_'
            const columnsKey = prefix + 'content'

            if(this.columnAmount == 1) {
                const sectionData = Array.isArray(this.data[columnsKey])
                    ? this.data[columnsKey][0]
                    : this.data[columnsKey]

                sectionData.cmpName = sectionData.acf_fc_layout
                    .replace("wp", "")
                    .replace(/(\_\w)/g, function(k) {
                        return k[1].toUpperCase();
                    })

                this.columns.push(sectionData)
            } else {
                for(let i = 1; i <= this.columnAmount; i++) {
                    const sectionData = Array.isArray(this.data[columnsKey][prefix + i])
                        ? this.data[columnsKey][prefix + i][0]
                        : this.data[columnsKey][prefix + i]

                    sectionData.cmpName = sectionData.acf_fc_layout
                        .replace("wp", "")
                        .replace(/(\_\w)/g, function(k) {
                            return k[1].toUpperCase();
                        })

                    this.columns.push(sectionData)
                }
            }
        }
        // computed: {
        //     leftColumn () {
        //         return Array.isArray(this.data.wp_2_col_layout_content.wp_2_col_layout_1)
        //             ? this.data.wp_2_col_layout_content.wp_2_col_layout_1[0]
        //             : this.data.wp_2_col_layout_content.wp_2_col_layout_1
        //     },
        //     leftColumnComponent () {
        //         if(!this.leftColumn || !('acf_fc_layout' in this.leftColumn))
        //             return 'NotFound'
        //         return this.leftColumn.acf_fc_layout
        //             .replace("wp", "")
        //             .replace(/(\_\w)/g, function(k) {
        //                 return k[1].toUpperCase();
        //             })
        //     },
        //     rightColumn () {
        //         return Array.isArray(this.data.wp_2_col_layout_content.wp_2_col_layout_2)
        //             ? this.data.wp_2_col_layout_content.wp_2_col_layout_2[0]
        //             : this.data.wp_2_col_layout_content.wp_2_col_layout_2
        //     },
        //     rightColumnComponent () {
        //         if(!this.rightColumn || !('acf_fc_layout' in this.rightColumn))
        //             return 'NotFound'

        //         return this.rightColumn.acf_fc_layout
        //             .replace("wp", "")
        //             .replace(/(\_\w)/g, function(k) {
        //                 return k[1].toUpperCase();
        //             })
        //     }
        // }
    }

//     "wp_2_col_layout_content": {
        // "wp_2_col_layout_left": false,
        // "wp_2_col_layout_right": false
        // }
</script>

<style>
    .two_col_layout {
        width: 100%;
        display: flex;
    }
</style>