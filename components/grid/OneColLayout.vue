<template>
  <div 
    class="one_col_layout"
    >
        <component 
            :is="contentComponentName"
            :data="cfg"
            />
 </div>
</template>

<script>
    import sections from '../sections'

    export default {
        name: 'OneColLayout',
        components: sections,
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        computed: {
            cfg () {
                return Array.isArray(this.data.wp_1_col_layout_content) 
                    ? this.data.wp_1_col_layout_content[0] 
                    : this.data.wp_1_col_layout_content
            },
            contentComponentName () {
                return this.cfg.acf_fc_layout
                    .replace("wp", "")
                    .replace(/(\_\w)/g, function(k) {
                        return k[1].toUpperCase();
                    })
            }
        }
    }
</script>

<style>
    .one_col_layout {
        width: 100%;
        overflow: hidden;
    }
</style>