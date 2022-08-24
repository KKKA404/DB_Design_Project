<template>
<div class="news">
    <div class="card">
        <p class="tag2">近期新闻</p>
        <ul class="list">
            <li class="item" v-for="(item,index) in NewsData" :key="index">
                <div class="tag">{{item.pubDateStr}}</div>
                <div class="content">
                    <div class="title">{{item.title}}</div>
                    <p>{{item.summary}}</p>
                </div>
                <a :href="item.sourceUrl">&gt;</a>
            </li>
        </ul>
    </div>
</div>
</template>
 
<script>
 
export default {
    name:"News",
    props:{
        NewsData:{
            type:Array,
            default:function(){
                return []
            }
        }
    }

};

</script>
 
<style scoped>
.news{
    padding: 2rem 1.6rem;
    font-size:3rem;
    background-color: #fff;
}

.card{
    border-radius: 0.04rem;
    border: 2rem solid #ebebeb;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 0.2rem 0.6rem 0 rgba(0, 0, 0, 0.05);
}

.item{
    display: flex;
    justify-content: space-between;
    padding: 2rem 3rem;
    border-bottom: 5px solid #f1f1f1;
}

.tag{
    display: flex;
    flex: none;
    align-items: center;
    height: 1.9rem;
    margin-top: 0.2rem;
    padding: 0 0.4rem;
    border-radius: 0.2rem;
    background-color: #f74c31;
    color: #fff;
    font-weight: 700;
    font-size: 1.2rem;
}
.tag2{
    display: flex;
    flex: none;
    align-items: center;
    height: 2.5rem;
    margin-top: 0.2rem;
    padding: 0 0.4rem;
    border-radius: 0.2rem;
    background-color: #f74c31;
    color: #fff;
    font-weight: 700;
    font-size: 1.5rem;
}

.content{
    display: flex;
    flex: auto;
    flex-direction: column;
    justify-content: center;
    margin: 0 5rem;
}

.title{
    color: #333;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.5rem;
}

.content p{
    margin: 0.03rem;
    color: #999;
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 1rem;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

</style>