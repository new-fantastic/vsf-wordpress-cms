<template>
    <div class="two_col_layout">
        <component 
            :is="leftColumnComponent"
            :data="leftColumn"
            />
        <component 
            :is="rightColumnComponent"
            :data="rightColumn"
            />
    </div>
</template>

<script>
    import sections from '../sections'

    export default {
        name: 'TwoColLayout',
        components: sections,
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        computed: {
            leftColumn () {
                return Array.isArray(this.data.wp_2_col_layout_content.wp_2_col_layout_left)
                    ? this.data.wp_2_col_layout_content.wp_2_col_layout_left[0]
                    : this.data.wp_2_col_layout_content.wp_2_col_layout_left
            },
            leftColumnComponent () {
                return this.leftColumn.acf_fc_layout
                    .replace("wp", "")
                    .replace(/(\_\w)/g, function(k) {
                        return k[1].toUpperCase();
                    })
            },
            rightColumn () {
                return Array.isArray(this.data.wp_2_col_layout_content.wp_2_col_layout_right)
                    ? this.data.wp_2_col_layout_content.wp_2_col_layout_right[0]
                    : this.data.wp_2_col_layout_content.wp_2_col_layout_right
            },
            rightColumnComponent () {
                return this.rightColumn.acf_fc_layout
                    .replace("wp", "")
                    .replace(/(\_\w)/g, function(k) {
                        return k[1].toUpperCase();
                    })
            }
        }
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