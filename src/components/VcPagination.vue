<template>
    <nav aria-label="...">
        <ul class="pagination">
            <li class="page-item disabled">
                <a class="page-link">Previous</a>
            </li>
            <li class="page-item" v-for="(page, index) in pages" v-bind:key="index" :class="{ active: source.number == page }">
                <a class="page-link" href="../operations" @click="navigate(page)">{{ page }}
                  <!--<button class="page-link" @click="navigate(page)">{{ page }}</button>-->
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
import { range } from 'lodash'

export default {
  props: ['source'],
  data () {
    return {
      pages: []
    }
  },
  methods: {
    navigate (page) {
      this.$emit('getRecordList', { page })
    }
  },
  watch: {
    source () {
      this.pages = range(1, this.source.totalPages + 1)
    }
  }
}
</script>
