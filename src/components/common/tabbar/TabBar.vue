<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar{
    box-sizing: border-box;
    display: flex;
    background-color: #f6f6f6;
    padding-top: 5px;
    width: 100%;
    height: 49px;

    position: fixed;
    left: 0;
    right: 0;
    top: calc(100vh - 49px);

    box-shadow: 0px -1px 1px rgba(100,100,100,0.3);
    z-index: 100;
  }
</style>
