<template>
  <div class="recommend">
    <div v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 10px 0px 15px;
    border-bottom: 8px solid #eee;
  }

  .recommend div{
    flex: 1;
  }

  img{
    width: 70px;
    height: 70px;
    padding-bottom: 5px;
  }
</style>
