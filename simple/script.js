const switcher = {
  init: function() {
    switcher.changeTheme()
  },
  changeTheme: function() {
    const switcherButton = $('#switch-toggle-btn')

    switcherButton.on('click', function() {
      $('body').toggleClass('theme-dark')
    })
  }
}

$(document).ready(function() {
  switcher.init()
})