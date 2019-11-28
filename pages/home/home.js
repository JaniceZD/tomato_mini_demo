const {
  http
} = require("../../lib/http.js")

Page({
  updateId: '',
  updateIndex: '',
  data: {
    visibleCreateConfirm: false,
    visibleUpdateConfirm: false,
    lists: [],
    updateContent: ''
  },
  onShow() {
    http.get('/todos?completed=false').then(res => {
      this.setData({
        lists: res.data.resource
      })
    })
  },
  confirmCreate(event) {
    console.log(event)
    let content = event.detail
    if (content) {
      http.post('/todos', {
        completed: false,
        description: content
      }).then(res => {
        let todo = [...res.data.resource]
        this.data.lists = [...todo, ...this.data.lists]
        this.setData({
          lists: this.data.lists
        })
        this.hideCreateConfirm() //隐藏创建任务框
      })
    }
  },
  changeText(event) {
    let {
      content,
      id,
      index
    } = event.currentTarget.dataSet
    this.updateId = id
    this.updateIndex = index
    this.setData({
      visibleUpdateConfirm: true,
      updateContent: content
    })
  },
  confirmUpdate(event) {
    console.log(event)
    let content = event.detail
    http.put(`/todos/${this.updateId}`, {
      description: content
    }).then(res => {
      let todo = res.data.resource
      this.data.lists[updateIndex] = todo
      this.setData({
        lists: this.data.lists
      })
      this.hideUpdateConfirm()
    })
  },
  destroyTodo(event) {
    let {
      id,
      index
    } = event.currentTarget.dataSet
    http.put(`/todos/${id}`, {
      completed: true
    }).then(res => {
      let todo = res.data.resource
      this.data.lists[index] = todo
      this.setData({
        lists: this.data.lists
      })
    })
  },
  showCreateConfirm() {
    this.setData({
      visibleCreateConfirm: true
    })
  },
  hideCreateConfirm() {
    this.setData({
      visibleCreateConfirm: false
    })
  },
  hideUpdateConfirm() {
    this.setData({
      visibleUpdateConfirm: false
    })
  }
})