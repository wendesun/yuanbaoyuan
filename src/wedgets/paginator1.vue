<template><div>
    <nav class="text-right">
        <ul class="pagination" style="margin: 0">
            <li v-if="hasPrev" :class="{'disabled':}"><a @click="prev">&laquo;</a></li>
            <template v-for="p in pages">
                <li :class="{'active'}"><a @click="toPage(p)">{{current(p)}} {{p}}</a></li>
            </div></template>
            <li v-if="hasNext" ><a @click="next">&raquo;</a></li>
        </ul>
    </nav>
</div></template>
<script>
    export default{
        props: [
            'pagination',
            'page'
        ],
        methods:{
            prev (){
                this.$set('page',parseInt(this.pagination.current_page) -1 )
            },
            next(){
                this.$set('page',parseInt(this.pagination.current_page) +1 )
            },
            toPage(page){
                this.$set('page',parseInt(page))
            },
            current(page) {
                return page == this.page ? 'current' : '';
            }
        },
        computed: {
            pages: function(){
                let _this = this;
                let prev = 4;
                let after = 4;
                let start, end;
                start = parseInt(_this.pagination.current_page) - prev;
                start = start > 1 ? start : 1 ;
                end = parseInt(_this.pagination.current_page) + after;
                end = end < parseInt(_this.pagination.total_pages) ? end : parseInt(_this.pagination.total_pages) ;
                let result = [];
                for(let i = start;i<= end;i++){
                    result.push(i);
                }
                console.log(end)
                return result;
            },
            hasPrev: function(){
                return this.pagination.current_page > 1;
            },
            hasNext: function(){
                let _this = this
                return this.pagination.current_page < this.pagination.total_pages;
            }
        }
    }
</script>
