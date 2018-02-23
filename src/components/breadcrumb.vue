<template>
	<ol class="breadcrumb">
      <li class="breadcrumb-item active">{{msg}}</li>
    </ol>
</template>

<script>
import Router from 'vue-router'

	export default {
  name: 'breadcrumb',
  data () {
    return {
      msg: "inicio"
    }
  },
  computed: {
    ViewComponent () {
      return msg
    }
  },
  render (h) { return h(this.ViewComponent) }
}
</script>