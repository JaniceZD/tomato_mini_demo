const { http } = require('../../lib/http.js')

Page({
  timer: null,
  data: {
    defaultSecond: 1500,
    time: '',
    timerStatus: 'stop',
    againButtonVisible: false,
    confirmVisible: false,
    finishConfirmVisible: false,
    tomato: {}
  },
  onShow() {
    this.startTimer()
    http.post('/tomatoes')
      .then(res => {
        this.setData({
          tomato: res.data.resource
        })
      })
  },
  startTimer() {
    this.setData({
      timerStatus: 'start'
    })
    this.changeTime()
    this.timer = setInterval(() => {
      this.data.defaultSecond -= 1
      this.changeTime()
      if (this.data.defaultSecond <= 0) {
        this.setData({ againButtonVisible: true })
        this.setData({ finishConfirmVisible: true })
        return this.clearTimer()
      }
    }, 1000)
  },
  changeTime() {
    let m = Math.floor(this.data.defaultSecond / 60)
    let s = Math.floor(this.data.defaultSecond % 60)
    let time = `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`
    this.setData({
      time: time
    })
  },
  clearTimer() {
    clearInterval(this.timer)
    this.timer = null
    this.setData({ timerStatus: 'stop' })
  },
  againTimer() {
    this.data.defaultSecond = 1500
    this.setData({
      againButtonVisible: false
    })
    this.startTimer()
  },
  confirmAbandon(event) {
    let content = event.detail
    http.put(`/tomato/${this.data.tomato.id}`, {
      description: content,
      aborted: true
    }).then(res => {
      wx.navigateBack({ to: -1 })
    })
  },
  confirmFinish(event) {
    let content = event.detail
    http.put(`/tomato/${this.data.tomato.id}`, {
      description: content
    }).then(res => {
      wx.navigateBack({ to: -1 })
    })
  },
  showConfirm() {
    this.setData({ confirmVisible: true })
    this.clearTimer()
  },
  hideConfirm() {
    this.setData({ confirmVisible: false })
    this.startTimer()
  },
  onHide() {
    this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: "退出放弃",
      aborted: true
    })
  },
  onUnload() {
    this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: "退出放弃",
      aborted: true
    })
  }
})