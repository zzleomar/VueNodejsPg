<template>
  <div id="app">
    <router-view/>


  </div>
</template>

<script>
import breadcrumb from '@/components/breadcrumb'


export default {
  name: 'App',
  components: {
    'breadcrumb': breadcrumb
  },
}
</script>

