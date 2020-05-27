<style lang="scss"></style>

<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Meta from '@/mixins/meta'

  export default {
    mixins: [Meta],

    data () {
      return {
        appName: this.$configs.appName,
        appCompany: this.$configs.appCompany,
        appLogo: this.$configs.appLogo,
      }
    },
    props: {
      source: String
    }
  }
</script>
