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
      console.log('value' + event.detail.value)
      this.setData({
        value:event.detail.value
      })
      console.log(this.data.value)
    },
    confirm: function(e) {
      console.log(e)
      this.triggerEvent('confirm', this.data.value)
    },
    cancel: function() {
      this.triggerEvent('cancel', this.data.value)
    }
  }
})