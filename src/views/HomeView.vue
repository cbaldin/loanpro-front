<template>
  <div>
    <h1>Operations</h1>
    era aqui {{ paginationSize }}
    <button @click="contando"> meui botao</button>
    <br>
  </div>
</template>

<script>
import axios from 'axios'
import { range } from 'lodash'

const fetchClient = () => {
  const defaultOptions = {
    baseURL: 'https://ec2-44-212-33-47.compute-1.amazonaws.com:4443/api/v1',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const instance = axios.create(defaultOptions)

  instance.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    return config
  })

  return instance
}

export default {
  data () {
    return {
      stringGerada: '',
      contar: 0,
      filter: '',
      userRecords: this.getRecordList(),
      operation: '',
      mathResult: '',
      currentPage: 0,
      paginationSize: 10,
      orderProperty: 'userBalance',
      orderOrientation: 'ASC',
      pages: [],
      source: [],
      mathOperators: {
        operator1: '',
        operator2: ''
      }
    }
  },
  computed: {
    filteredRows () {
      return this.userRecords.filter(row => {
        const operations = row.operation.toString().toLowerCase()
        const searchTerm = this.filter.toLowerCase()

        return operations.includes(searchTerm)
      })
    }
  },
  methods: {
    getRandomString () {
      fetchClient().get('/random-string').then((response) => {
        this.stringGerada = response.data
        this.getRecordList()
      }).catch((error) => {
        console.log(error)
      })
    },
    novoMetodo () {
      fetchClient().get('/sum?x=' + 1 + '&y=' + 2).then((response) => {
        console.log('passou pelo novo metodo sem alterar variaveeis')
        this.getRecordList()
      })
    },
    refreshPagination (page, paginationSizeValue, orderPropertyValue, orderOrientationValue) {
      this.currentPage = page
      this.paginationSize = paginationSizeValue
      console.log(this.paginationSize + 'passou')
      this.orderProperty = orderPropertyValue
      this.orderOrientation = orderOrientationValue
      console.log('antes do record list no refresh pagination')
      this.getRecordList()
    },
    getRecordList () {
      console.log(this.paginationSize + 'dentro do get record')
      if (this.currentPage === undefined) {
        this.currentPage = 0
      }
      if (this.paginationSize === undefined) {
        this.paginationSize = 10
      }
      if (this.orderProperty === undefined) {
        this.orderProperty = 'userBalance'
      }
      if (this.orderOrientation === undefined) {
        this.orderOrientation = 'ASC'
      }
      console.log('current page: ' + this.currentPage +
      ', paginationSize: ' + this.paginationSize +
      ', orderProperty: ' + this.orderProperty +
      ', orderOrientation: ' + this.orderOrientation
      )
      fetchClient().get('/records?pag=' + this.currentPage +
        '&paginationSize=' + this.paginationSize +
        '&orderByProperty=' + this.orderProperty +
        '&orderBy=' + this.orderOrientation
      ).then((response) => {
        this.userRecords = response.data.content
        this.pagination = response.data
        this.pages = range(1, response.data.totalPages + 1)
      })
    },
    deleteRecord (id) {
      fetchClient().delete('/records?id=' + id).then((response) => {
        this.getRecordList()
      }).catch((error) => {
        console.log('Error' + error)
      })
    },
    sum (mathOperators) {
      fetchClient().get('/sum?x=' + mathOperators.operator1 + '&y=' + mathOperators.operator2).then((response) => {
        this.operation = 'Sum'
        this.mathResult = response.data
        this.getRecordList()
      })
    },
    sub (mathOperators) {
      fetchClient().get('/sub?x=' + mathOperators.operator1 + '&y=' + mathOperators.operator2).then((response) => {
        this.operation = 'Sub'
        this.mathResult = response.data
        this.getRecordList()
      })
    },
    mult (mathOperators) {
      fetchClient().get('/mult?x=' + mathOperators.operator1 + '&y=' + mathOperators.operator2).then((response) => {
        this.operation = 'Mult'
        this.mathResult = response.data
        this.getRecordList()
      })
    },
    div (mathOperators) {
      fetchClient().get('/div?x=' + mathOperators.operator1 + '&y=' + mathOperators.operator2).then((response) => {
        this.operation = 'Div'
        this.mathResult = response.data
        this.getRecordList()
      })
    },
    squareRoot (operator1) {
      fetchClient().get('/square-root?x=' + operator1).then((response) => {
        this.operation = 'Square Root for ' + operator1
        this.mathResult = response.data
        this.getRecordList()
      })
    },
    contando () {
      this.paginationSize = this.paginationSize + 1
    }
  }
}
</script>

<style>.container {
  display: flex;
}</style>
