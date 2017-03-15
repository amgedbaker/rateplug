var Main = {

  init: function() {
    var _this = this;
    this.$window = $(window);
    this.sidebarNav();
    this.handleWindowScroll();
    this.handleWindowResize();

    // bootstrap javascript init
    this.carouselSlider();
    this.dropdown();
    this.popover();
    // this.modal();
  },

  navShrink: function() {

    // if you scroll up 60px, shrink the nav. scroll down 60px, return nav to regular height
    var $nav = $('.navbar-fixed-top');
    this.$window.scrollTop() > 60 ? $nav.addClass('shrink') : $nav.removeClass('shrink');
  },

  sidebarNav: function() {
    var sideslider = $('[data-toggle=collapse-side]');
    var sel = sideslider.attr('data-target');
    var sel2 = sideslider.attr('data-target-2');
    sideslider.click(function(event){
      $(sel).toggleClass('in');
      $(sel2).toggleClass('out');
      $('body').toggleClass('locked');
    });
  },

  handleWindowResize: function() {
    var _this = this;
    this.$window.on('resize', function() {
      if(_this.$window.width() <= 768) {
        $('.navbar-fixed-top').removeClass('shrink');
      }
    });
  },

  handleWindowScroll: function() {
    var _this = this;
    this.$window.on('scroll', function() {
      if(_this.$window.width() >= 768) {
        _this.navShrink();
      }
    });
  },

  carouselSlider: function() {
    $('.carousel').carousel();
    // for every slide in carousel, copy the next slide's item in the slide.
    // Do the same for the next, next item.

    if($(window).width() >= 768) {
      $('.carousel .item').each(function(){
        var next = $(this).next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
        
        if (next.next().length>0) {
          next.next().children(':first-child').clone().appendTo($(this));
        } else {
          $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
        }
      });
    }
  },

  dropdown: function() {
    $('.dropdown-toggle').dropdown();
  },

  popover: function() {
    $('[data-toggle="popover"]').popover();
  },

  modal: function() {
    // $('#sample-modal').modal();
    $('#signup-modal').modal();
  }

};


(function() {
  Main.init();
})();
