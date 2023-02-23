<template>
  <div>
<<<<<<< HEAD
    <h1>Operações</h1>
=======
    <h1>Operations</h1>
>>>>>>> 273ac02 (Inicial commit)
    <br><br><br>
    <div class="container">
      <div name="operations" class="myDiv">
        <div name="generateString">
          <div>The generated random string: <b>{{ stringGerada }}</b></div>
          <button v-on:click="getRandomString">Generate random string</button>
        </div>
        <br><br><br>
        <div>
          <div>
            <input type="number" placeholder="Operator 1" v-model="mathOperators.operator1" >
            <input type="number" placeholder="Operator 2" v-model="mathOperators.operator2" >
          </div>
          <div>
            <button v-on:click="sum(mathOperators)">Sum</button>
            <button v-on:click="sub(mathOperators)">Sub</button>
            <button v-on:click="div(mathOperators)">Div</button>
            <button v-on:click="mult(mathOperators)">Mult</button>
            <button v-on:click="squareRoot(mathOperators.operator1)">Square Root</button>
            <div>The result for <b>{{ operation }}</b> is : <b>{{ mathResult }}</b></div>
          </div>
        </div>
      </div>
      <div class="myDiv">
        <table border="1px">
          <tr>
            <th>Operation</th>
            <th>Amount</th>
            <th>User Balance</th>
            <th>Operation Response</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
          <tr v-for="record in userRecords" :key="record.id">
            <td>{{ record.operation }}</td>
            <td>{{ record.amount }}</td>
            <td>{{ record.userBalance }}</td>
            <td>{{ record.operationResponse }}</td>
            <td>{{ record.date }}</td>
            <td><button v-on:click="deleteRecord(record.id)" >Delete</button></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../main.js'

const fetchClient = () => {
  const defaultOptions = {
    baseURL: 'http://ec2-52-90-4-159.compute-1.amazonaws.com:8080/api/v1',
    baseURL: 'http://localhost:8080/api/v1',
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
      userRecords: this.getRecordList(),
      operation: '',
      mathResult: '',
      mathOperators: {
        operator1: '',
        operator2: ''
      }
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
    getRecordList () {
      fetchClient().get('/records').then((response) => {
        this.userRecords = response.data
      })
    },
    deleteRecord (id) {
      console.log('teste: passou delete ' + api.delete)
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

<style>
.myDiv {
  display: inline-block;
  text-align: center;
  width: 40%;
  padding: 5px;
}

.container {
  display: flex;
}

</style>
