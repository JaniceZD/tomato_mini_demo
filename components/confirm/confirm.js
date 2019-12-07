Component({
  properties: {
    placeholder: {
      type: String,
      value: ''
    },
    visible: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: ""
    }
  },
  data: {
    value: ""
  },
  lifetimes: {
    attached() {
      if (this.properties.value) {
        this.properties.value = this.data.value
      }
    },
    error(e) {
      console.log(e)
    }
  },
  methods: {
    watchValue(event) {
      this.setData({
        value:event.detail.value
      })
    },
    confirm: function(e) {
      this.triggerEvent('confirm', this.data.value)
      this.setData({
        value: ''
      })
    },
    cancel: function() {
      this.triggerEvent('cancel', this.data.value)
    }
  }
})