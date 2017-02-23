<template><div>
    <nav class="text-right" v-show=" totalPages > 1 ">
        <ul class="pagination" style="margin: 0">
            <li :class="{'disabled':hasPrev}"><a @click="prev">&laquo;</a></li>
            <li :class="1 == page ? 'active' : ''"><a @click="toPage(1)">1</a></li>
            <li v-show="hasPrevPoint"><a>...</a></li>
            <template v-for="p in pages">
                <li :class="p == page ? 'active' : ''"><a @click="toPage(p)">{{p}}</a></li>
            </div></template>
            <li v-show="hasNextPoint"><a>...</a></li>
            <li :class="totalPages == page ? 'active' : ''" v-if="totalPages > 1"><a @click="toPage(totalPages)">{{totalPages}}</a></li>
            <li :class="{'disabled':hasNext}"><a @click="next">&raquo;</a></li>
        </ul>
    </nav>
</div></template>
<script>
    export default{
        props: {
            pagination: {
              type: Object,
              default:{
                  total:100,
                  count:100,
                  per_page:20,
                  current_page:1,
                  total_pages:5
              }
            },
            page:{
                type: Number,
                default: 1
            }
        },
        methods:{
            prev(){
                let prev = parseInt(this.pagination.current_page) - 1
                this.$set('page', prev > 1 ? prev : 1)
            },
            next(){
                let next = parseInt(this.pagination.current_page) + 1
                let total = this.totalPages
                if(total > 1 ){
                  this.$set('page', next < total ? next : total )
                }
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
              //@todo 进一步优化
              //总页数小于等于2（由于首页和最后一页单独拎出来了，所以不需要中间的页码）
              if(total <= 2){
                return;
              }
              //总页数小于等于7大于2（始终全部显示所有页）
              if(total <= 7 && total >2){
                start = 2;
                end = total-1
              }
              //总页数大于7且当前页小于5（始终显示总页数前6页）
              if(total >7 && current < 5){
                start = 2;
                end = 6
              }
              //总页数大于7且总页数减去当前页小于3（始终显示总页数后6页）
              if(total >7 && (total-current < 3)){
                start = total - 5;
                end = total-1
              }
              //排除以上情况
              if(total > 7 && current >= 5 && (total-current >= 3)){
                start = current - prev;
                start = start > 2 ? start : 2 ;
                end = current + after;
                end = end < total-1 ? end : total-1 ;
              }
              let result = [];
              for(let i = start;i<= end;i++){
                  result.push(i);
              }
              return result;
            },
            hasPrev: function(){
              return parseInt(this.pagination.current_page) <= 1;
            },
            hasPrevPoint: function(){
              return (parseInt(this.pagination.current_page)  > 4) && (parseInt(this.pagination.total_pages)>7);
            },
            hasNext: function(){
              return parseInt(this.pagination.current_page) >= parseInt(this.pagination.total_pages);
            },
            hasNextPoint: function(){
              return (parseInt(this.pagination.total_pages) - parseInt(this.pagination.current_page) > 3) && (parseInt(this.pagination.total_pages)>7);
            },
            totalPages: function(){
              return parseInt(this.pagination.total_pages);
            }
        }
    }
</script>
