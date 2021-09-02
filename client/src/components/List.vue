<template>
    <div id="list">
        <h1>Friends Table :) </h1>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Activity</th>
                        <th>Food</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="friend in friends" v-bind:friend="friend" v-bind:key="friend._id">
                        <td>{{ friend.name }}</td>
                        <td>{{ friend.activity }}</td>
                        <td>{{ friend.food }}</td>
                        <td><button id="edit-button" v-on:click="linkToEdit(friend._id)">Edit</button></td>
                        <td><button id="delete-button" v-on:click="confirmDelete(friend._id)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <button id="back" v-on:click="goBack">Back</button>
        </div>
    </div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Modal, message } from 'ant-design-vue'
Vue.use(Modal)
import "ant-design-vue/lib/modal/style/css"


export default {
    name: 'list',
    data () {
        return {
            friends: [],
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        goBack() {
            this.$router.push('/')
        },
        fetchData() {
            axios
                .get('http://localhost:40320/api/friends/index')
                .then((res) => {
                    this.friends = res.data
                })
                .catch(err => console.log(err))
        },
        linkToEdit(id) {
            this.$router.push(`/edit/${id}`)
        },
        confirmDelete(id) {
            const friend_id = id
            const refreshData = this.fetchData
            Modal.confirm({
                title: 'Are you sure you want to delete?',
                onOk() {
                    axios
                        .post('http://localhost:40320/api/friends/delete', { id: friend_id })
                        .then(() => {
                            refreshData()
                        })
                        .then(() => message.success('Successfully deleted'))
                        .catch((err) => {
                            console.log(err)
                            message.error('Failed to delete')
                        })
                }
            })
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

    input[type=text] {
        width: 15%;
        padding: 4px 5px;
    }

    input[type=submit]:hover {
        background-color: teal;
        cursor: pointer;
    }

    #back:hover {
        background-color: steelblue;
        cursor: pointer;
    }

    table, th, td {
        border: 1px solid black;
    }

    table {
        margin-bottom: 10px;
    }

    #edit-button {
        border-radius: 5px;
    }

    #edit-button:hover {
        background-color: teal;
        cursor: pointer;
    }

    #delete-button {
        border-radius: 5px;
    }

    #delete-button:hover {
        background-color: red;
        cursor: pointer;
    }
</style>
