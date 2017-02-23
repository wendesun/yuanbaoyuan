<template><div>

    <list-page :configs="configs" ></list-page>
</div></template>
<script>
    import listPage from '../common/list.vue'
    export default {
        components: {
            listPage: listPage
        },
        data() {
            return {
                configs: {
                    title: '抽奖',
                    uri: 'backstage/lotteries',
                    links: {
                        list: 'lottery-list',
                        add: 'lottery-add',
                        edit: 'lottery-edit'
                    }
                }
            }
        }
    }
</script>
