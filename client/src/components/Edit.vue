<template>
    <div id='edit'>
        <h1>Edit Info</h1>
        <label for="name">Your Name: </label>
        <input v-model="name"><br><br>
        <label for="activity">Update Activity: </label>
        <input v-model="activity"><br><br>
        <label for="food">Update Food: </label>
        <input v-model="food"><br><br>
        <button class="see-friends" v-on:click="goBack">Back</button>
        <button class="submit" v-on:click="handleSubmit">Submit</button>
    </div>
</template>

<script>
import axios from 'axios'
import { message } from 'ant-design-vue';
import "ant-design-vue/lib/message/style/css"

    export default {
        name: 'edit',
        data() {
            return {
                id: null,
                name: null,
                activity: null,
                food: null,
            }
        },
        created() {
            this.getId()
            this.fetchFriend()
        },
        methods: {
            getId() {
                this.id = this.$router.history.current.params.id
            },
            fetchFriend() {
                const request = { id: this.id }
                axios
                    .post('/api/friends/friend-info', request)
                    .then((response) => {
                        const res = response.data[0]
                        this.name = res.name
                        this.activity = res.activity
                        this.food = res.food
                    })
            },
            goBack() {
                this.$router.push('/list')
            },
            handleSubmit() {
                const request =  {
                    id: this.id,
                    name: this.name,
                    activity: this.activity,
                    food: this.food,
                }
                axios
                    .post('/api/friends/edit', request)
                    .then(() => {
                        message.success('Edit successful');
                        setTimeout(() => {
                            this.$router.push('/list')
                        }, 500)
                    })
                    .catch((err) => {
                            console.log(err)
                            message.error('Edit failed')
                    })
            }
        }
    }
</script>

