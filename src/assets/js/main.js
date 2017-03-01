var Main = {

  init: function() {
    var _this = this;
    this.$window = $(window);
    this.sidebarNav();
    this.handleWindowScroll();
    this.handleWindowResize();
    this.carouselSlider();
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
  }

};


(function() {
  Main.init();
})();
