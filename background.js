$(window.parent.document).ready(function() {
  var Bot = (qtdRoubo) => {
    
    // needs to create rave

    const ID_ROUBO = '18'
    const MIN_STAMINA = 50
    const QTD_ROUBO = 2
    const NIVEL_ADDICTION = 8

    const PATH_ROUBAR = $('.action_menu').eq(0).children().eq(1).attr('data-link')
    const PATH_STAMINA = $('.action_menu').eq(0).children().eq(2).attr('data-link')

    const stamina = $('#stamina-progressbar')[0].style.width.replace('%', '')
    const addiction = $('#addiction-progressbar')[0].style.width.replace('%', '')
    
    let _qtdRoubo = 1
  
    if (qtdRoubo) {
      _qtdRoubo = qtdRoubo
    }
    
    if ($('#content_middle h1').text() == 'Emergência') return false

    if (stamina >= MIN_STAMINA && _qtdRoubo <= QTD_ROUBO) {
      if (window.location.pathname != PATH_ROUBAR) {
        window.location.pathname = PATH_ROUBAR
      } else {
        console.log('https://www.thecrims.com' + PATH_ROUBAR + '/' + ID_ROUBO)

        var req = $.ajax({
          method: 'POST',
          url: 'https://www.thecrims.com' + PATH_ROUBAR + '/' + ID_ROUBO,
        })
        
        req.then(function(data) {
          _qtdRoubo++
          setTimeout(function() {
            Bot(_qtdRoubo)
          }, 100)
        }).catch(function(error) {
          _qtdRoubo++
          setTimeout(function() {
            Bot(_qtdRoubo)
          }, 100)
        })
      }
    } else {

      if (addiction >= NIVEL_ADDICTION) {
        window.location.pathname = '/hospital'
      }
      
      if (/hospital/.test(window.location.pathname)) {
        $.ajax({
          method: 'POST',
          url: 'https://www.thecrims.com/hospital/detox',
        }).then(function(data) {
          window.location.pathname = PATH_STAMINA
        }).catch(function(error) {
          window.location.pathname = PATH_STAMINA
        })
      } else {
        if (window.location.pathname.indexOf(PATH_STAMINA) != -1) {
          if (jQuery('#content_middle h1').text() == 'Vida Noturna') {
            $('#content_middle .btn.btn-inverse.btn-small').eq(1).trigger('click')
          } else {
            var beer = Math.round(addiction / 2) + 50
            
            console.log('https://www.thecrims.com' + PATH_STAMINA + '/buydrug/2/')
            
            $.post('https://www.thecrims.com' + PATH_STAMINA + '/buydrug/2/' + beer, function () {
              window.location.pathname = PATH_ROUBAR
            })
          }
        } else {
          window.location.pathname = PATH_STAMINA
        }
      }
    }
  }
  
  Bot()
})
