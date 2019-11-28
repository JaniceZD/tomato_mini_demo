// pages/login/login.js
const {
  http
} = require('../../lib/http.js')
const {
  app_id,
  app_secret
} = getApp().globalData

Page({
  login(event) {
    let {
      iv
    } = event.detail
    let encrypted_data = event.detail.encryptedData
    this.wxLogin(iv, encrypted_data)
  },
  wxLogin(iv, encrypted_data) {
    wx.login({
      success: (res) => this.loginMe(res.code, iv, encrypted_data)
    })
  },
  loginMe(code, iv, encrypted_data) {
    http.post('/sign_in/mini_program_user', {
      code,
      iv,
      encrypted_data,
      app_id,
      app_secret,
    }).then((res) => {
      console.log(res)
      this.saveMessage(res)
      wx.reLaunch({
        url: '/pages/home/home',
      })
    })
  },
  saveMessage(response) {
    wx.setStorageSync("me", response.data.resource)
    wx.setStorageSync('X-token', response.header['X-token'])
  }
})