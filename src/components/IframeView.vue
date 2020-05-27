<template>
  <div v-bind:class="[center ? 'center' : null]">
     <iframe v-bind:class="[responsive ? 'responsive' : 'desk']"
        :src="link" :frameBorder="0">
    </iframe>
  </div>
</template>

<script>
  export default {
    name: 'iframe-view',
    props: ['link', 'height', 'with', 'center', 'responsive']
  }

</script>

<style lang="scss">
    .desk {
        width: 100%;
    }
    .responsive{
        width: 30%;
    }
    iframe{
        height: 100vh;
    }
    .center{
        text-align: center;
    }
</style>