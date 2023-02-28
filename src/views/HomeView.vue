<template>
  <div>
    <h1>Operations</h1>
    <br>
    <div class="d-flex justify-content-center grid gap-3">
      <div name="operations" class="p-2 g-col-6">
        <div name="generateString" class="grid gap-3">
          <div class="p-2 g-col-6">
            <button v-on:click="getRandomString" class="btn btn-secondary">Generate random string</button>
          </div>
          <div class="p-2 g-col-6">The generated random string is: <b>{{ stringGerada }}</b></div>
        </div>
        <br><br><br>
        <div>
          <div class="d-flex flex-column mb-3 grid gap-3">
            <input type="number" placeholder="Operator 1" v-model="mathOperators.operator1">
            <input type="number" placeholder="Operator 2" v-model="mathOperators.operator2">
          </div>
          <div class="d-flex flex-column mb-3 grid gap-3">
            <button class="btn btn-secondary" v-on:click="sum(mathOperators)">Sum</button>
            <button class="btn btn-secondary" v-on:click="sub(mathOperators)">Sub</button>
            <button class="btn btn-secondary" v-on:click="div(mathOperators)">Div</button>
            <button class="btn btn-secondary" v-on:click="mult(mathOperators)">Mult</button>
            <button class="btn btn-secondary" v-on:click="squareRoot(mathOperators.operator1)">Square Root</button>
            <div>The result for <b>{{ operation }}</b> is : <b>{{ mathResult }}</b></div>
          </div>
        </div>
      </div>
      <div class="p-2 g-col-6">
        <div>
          Filter by operation: <input type="text" placeholder="" v-model="filter" />
        </div>
        <div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Operation</th>
                <th>Amount</th>
                <th>User Balance</th>
                <th>Operation Response</th>
                <th>Date</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in userRecords" :key="record.id">
                <td>{{ record.operation }}</td>
                <td>{{ record.amount }}</td>
                <td>{{ record.userBalance }}</td>
                <td>{{ record.operationResponse }}</td>
                <td>{{ record.date }}</td>
                <td><button v-on:click="deleteRecord(record.id)">Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div name="paginacao">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li :class="{ disabled: this.currentPage == 0 }">
                <button class="page-link"
                  v-on:click="refreshPagination(this.currentPage - 1, this.paginationSize, this.orderProperty, this.orderOrientation)">Previous</button>
              </li>
              <li class="page-item" v-for="(page, index) in pages" v-bind:key="index">
                <button class="page-link" v-on:click="refreshPagination(page - 1, this.paginationSize, this.orderProperty, this.orderOrientation)">{{ page }}</button>
              </li>
              <li :class="{ disabled: this.currentPage == this.pages.length - 1 }">
                <button class="page-link"
                  v-on:click="refreshPagination(this.currentPage + 1, this.paginationSize, this.orderProperty, this.orderOrientation)">Next</button>
              </li>
            </ul>
          </nav>
        </div>
        <div class="container">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Number of itens: {{ paginationSize }}
            </button>]
            <br>
            <select name="LeaveType" @change="getRecordList()" class="form-control" v-model="paginationSize">
              <option value="3">3</option>
              <option value="5">5</option>
            </select>
            <ul class="dropdown-menu">
              <li><button class="dropdown-item"
                  v-on:click="refreshPagination(currentPage, 2, orderProperty, orderOrientation)">2</button></li>
              <li><button class="dropdown-item"
                  v-on:click="refreshPagination(currentPage, 5, orderProperty, orderOrientation)">5</button></li>
              <li><button class="dropdown-item"
                  v-on:click="refreshPagination(currentPage, 10, orderProperty, orderOrientation)">10</button></li>
            </ul>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Order By Property
            </button>
            <ul class="dropdown-menu">
              <li><button class="dropdown-item"
                  v-on:click="refreshPagination(this.currentPage, this.paginationSize, 'operation', this.orderOrientation)">Operation</button>
              </li>
              <li><button class="dropdown-item"
                  v-on:click="refreshPagination(this.currentPage, this.paginationSize, 'userBalance', this.orderOrientation)">User
                  Balance</button></li>
              <li><button class="dropdown-item"
                  v-on:click="refreshPagination(this.currentPage, this.paginationSize, 'date', this.orderOrientation)"> Date</button></li>
            </ul>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Order By Orientation
            </button>
            <ul class="dropdown-menu">
              <li><button class="dropdown-item"
                  v-on:click="refreshPagination(this.currentPage, this.paginationSize, this.orderProperty, 'ASC')">ASC</button>
              </li>
              <li><button class="dropdown-item"
                  v-on:click="refreshPagination(this.currentPage, this.paginationSize, this.orderProperty, 'DESC')">DESC </button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
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
  watch: {
    operation (newValue, oldValue) {
      console.log(' passou no WATHCER =>>>>>> novo valor ' + newValue + ', antigo valor ' + oldValue)
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
    refreshPagination (page, paginationSizeValue, orderPropertyValue, orderOrientationValue) {
      this.currentPage = parseInt(page, 10)
      this.paginationSize = parseInt(paginationSizeValue, 10)
      console.log(this.paginationSize + 'passou')
      this.orderProperty = orderPropertyValue
      this.orderOrientation = orderOrientationValue
      console.log('antes do record list no refresh pagination')
      this.operation = 'TESTE'
      this.getRecordList()
    },
    getRecordList: function () {
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
    }
  }
}
</script>

<style>.container {
  display: flex;
}</style>
