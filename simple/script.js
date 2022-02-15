const switcher = {
  init: function() {
    switcher.changeTheme()
    switcher.loadTheme()
  },
  getMainTheme: function() {
    const themeDark = localStorage.getItem('theme-dark')
    return themeDark
  },
  setTheme: function(dark) {
    localStorage.setItem('theme-dark', dark)
    
    if (dark) {
      $('body').addClass('theme-dark')
    } else {
      $('body').removeClass('theme-dark')
    }
  },
  changeTheme: function() {
    const switcherButton = $('#switch-toggle-btn')

    switcherButton.on('click', function() {
      switcher.setTheme($(this).is(":checked"))
    })
  },
  loadTheme: function() {
    const switcherButton = $('#switch-toggle-btn')

    if (switcher.getMainTheme()) {
      if (switcher.getMainTheme() === 'true') {
        switcher.setTheme(true)
        switcherButton.prop('checked', true)
      } else {
        switcher.setTheme(false)
      }
    } else {
      switcher.getMainTheme(false)
    }
  }
}

$(document).ready(function() {
  switcher.init()
})