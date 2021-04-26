<template>
  <div>
    <h1>Tst{{test}}</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        test: 'saasa'
      }
    },
    mounted () {
      console.log('進入了test頁面')
    }
  }
</script>

