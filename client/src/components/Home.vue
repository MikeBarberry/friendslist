<template>
    <div id="home">
    <div class="main-header">
            <h1>Let's Get to Know You!</h1>
        </div>
        <div class="subtitle">
            <h2>Answer the Questions Below</h2>
        </div>
        <div class="questions">
                <label for="name">Preferred Name: </label>
                <input v-model="name"><br><br>
                <label for="activity">Favorite Activity: </label>
                <input v-model="activity"><br><br>
                <label for="food">Favorite Food: </label>
                <input v-model="food"><br><br><br>
                <button class="submit" v-on:click="handleSubmit">Submit</button>
                <button class="see-friends" v-on:click="goToList">See Friends</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { message } from 'ant-design-vue';

export default {
  name: 'home',
  data() {
      return {
          name: '',
          activity: '',
          food: '',
      }
  },
  methods: {
      goToList() {
          this.$router.push('/list')
      },
      handleSubmit() {
          const request = {
              name: this.name,
              activity: this.activity,
              food: this.food,
          }
          axios
                .post('http://localhost:40320/api/friends/new', request)
                .then(() => {
                    this.name = '',
                    this.activity = '',
                    this.food = ''
                    message.success('Friend added')
                    setTimeout(() => {
                        this.$router.push('/list')
                    }, 1500)
                })
                .catch(err => console.error(err))
      }
  }
}

</script>

<style>
    body {
        background-image: url(../assets/coast.jpg);
    }

    h1 {
        font-weight: bold;
    }

    input {
        width: 15%;
        padding: 4px 5px;
    }

    .submit:hover {
        background-color: teal;
        cursor: pointer;
    }

    .see-friends:hover {
        background-color: steelblue;
        cursor: pointer;
    }
</style>
