const switcher = {
  init: function() {
    switcher.changeTheme()
  },
  changeTheme: function() {
    const switcherButton = $('#switch-toggle-btn')
    switcherButton.on('click', function() {
      console.log($(this).is(":checked"))
    })
  }
}

$(document).ready(function() {
  switcher.init()
})