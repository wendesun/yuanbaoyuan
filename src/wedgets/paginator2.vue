<template><div>
    <nav class="text-right">
        <ul class="pagination" style="margin: 0">
            <li :class="{'disabled':hasPrev}"><a @click="prev">&laquo;</a></li>
            <li :class="1 == page ? 'active' : ''"><a @click="toPage(1)">1</a></li>
            <li v-show="hasPrevPoint"><a>...</a></li>
            <template v-for="p in pages">
                <li :class="p == page ? 'active' : ''"><a @click="toPage(p)">{{p}}</a></li>
            </div></template>
            <li v-show="hasNextPoint"><a>...</a></li>
            <li :class="totalPages == page ? 'active' : ''" v-if="totalPages!=1"><a @click="toPage(totalPages)">{{totalPages}}</a></li>
            <li :class="{'disabled':hasNext}"><a @click="next">&raquo;</a></li>
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
            prev(){
                let prev = parseInt(this.pagination.current_page) - 1
                this.$set('page', prev > 1 ? prev : 1)
            },
            next(){
                let next = parseInt(this.pagination.current_page) + 1
                let total = this.totalPages
                this.$set('page', next > total ? total : next )
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
              let total = parseInt(_this.pagination.total_pages);
              let current = parseInt(_this.pagination.current_page);
              let prev = 2;
              let after = 2;
              let start, end;
              if(total <= 7 && total >=2){
                start = 2;
                end = total-1
              }
              if(total > 7){
                start = current - prev;
                start = start > 2 ? start : 2 ;
                end = current + after;
                end = end < total-1 ? end : total-1 ;
                if( current <= 4){
                  end = 6
                }
                if( total - current < 3  ){
                   start = total - 5
                }
              }
              let result = [];
              for(let i = start;i<= end;i++){
                  result.push(i);
              }
              console.log(start + '----------------'+ end)
              return result;
            },
            hasPrev: function(){
                return this.pagination.current_page <= 1;
            },
            hasPrevPoint: function(){
              return this.pagination.current_page > 4;
            },
            hasNext: function(){
                return this.pagination.current_page >= this.pagination.total_pages;
            },
            hasNextPoint: function(){
              return this.pagination.total_pages-this.pagination.current_page > 3;
            },
            totalPages: function(){
              return this.pagination.total_pages;
            }
        }
    }
</script>
