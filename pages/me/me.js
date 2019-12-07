const {
  http
} = require('../../lib/http.js')

Page({
  data: {
    tab: 'task',
    tomatoes: {},
    todos: {},
    me: {}
  },
  onShow() {
    this.fetchTodos()
    this.fetchTomato()
    this.setData({
      me: wx.getStorageSync('me')
    })
  },
  fetchTomato() {
    http.get('/tomatoes', {
        is_group: 'yes'
      })
      .then(res => {
        this.setData({
          tomatoes: res.data.resources
        })
      })
  },
  fetchTodos() {
    http.get('/todos', {
        is_group: 'yes'
      })
      .then(res => {
        this.setData({
          todos: res.data.resources
        })
      })
  },
  changeTab(event) {
    let name = event.currentTarget.dataset.name
    this.setData({
      tab: name
    })
  }
})