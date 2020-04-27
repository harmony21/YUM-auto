$(document).ready(function() {

  var sliderMain = $("#sliderMain");
  sliderMain.lightSlider({
    item: 1,
    speed: 800,
    pause: 6000,
    mode: 'fade',
    loop: true,
    auto: true,
    enableDrag: false,
    onSliderLoad: function () {
      var currentItem = $('.slider').find('li.lslide.active');
      //появление текста
      currentItem.find("h2").animate({
        'marginLeft': '0',
      }, 300 );
      currentItem.find("p").animate({
        'marginLeft': '0',
      }, 300 );
      currentItem.find("a").animate({
        'marginLeft': '0',
      }, 300 );

    },
    onAfterSlide: function () {
      var currentItem = $('.slider').find('li.lslide.active');
      //анимация текста
      currentItem.find("h2").animate({
        'marginLeft': '0',
      }, 300 );
      currentItem.siblings().find("h2").css('marginLeft', '-100%');

      currentItem.find("p").animate({
        'marginLeft': '0',
      }, 300 );
      currentItem.siblings().find("p").css('marginLeft', '-100%');

      currentItem.find("a").animate({
        'marginLeft': '0',
      }, 300 );
      currentItem.siblings().find("a").css('marginLeft', '-100%');

    },
      
  }); 

  $('.arrow-main-slide-left').on('click', function (e) {
    sliderMain.goToPrevSlide();
  })
  $('.arrow-main-slide-right').on('click', function (e) {
    sliderMain.goToNextSlide();
  })


  var sliderReviews = $("#sliderReviews");
  sliderReviews.lightSlider({
    item: 2,
    speed: 900,
    pause: 5000,
    loop: true,
    slideMargin: 20,
    auto: true,
    pauseOnHover: true,
    enableDrag: false,
    responsive : [
      {
          breakpoint: 768,
          settings: {
              item: 1,
          }
      },
  ],
  }); 

  $('.arrow-left-reviews').on('click', function (e) {
    sliderReviews.goToPrevSlide();
  })
  $('.arrow-right-reviews').on('click', function (e) {
    sliderReviews.goToNextSlide();
  })

  var sliderOffers = $("#sliderOffers");
  sliderOffers.lightSlider({
    item: 5,
    speed: 800,
    pause: 4000,
    loop: true,
    auto: true,
    pauseOnHover: true,
    pager: false,
    enableDrag: false,
    responsive : [
      {
          breakpoint: 1367,
          settings: {
              item: 4,
            }
      },
      {
          breakpoint: 1201,
          settings: {
              item: 3,
            }
      },
      {
          breakpoint: 1025,
          settings: {
              item: 2,
              pager: true,
            }
      },
      {
          breakpoint: 540,
          settings: {
              item: 1.2,
              pager: true,
          }
      },
  ],
  }); 

  $('.arrow-left-catalog').on('click', function (e) {
    sliderOffers.goToPrevSlide();
  })
  $('.arrow-right-catalog').on('click', function (e) {
    sliderOffers.goToNextSlide();
  })

  //слайдер команды (страница "Контакты")
  var sliderTeam = $("#sliderTeam");
  sliderTeam.lightSlider({
    item: 5,
    speed: 900,
    pause: 5000,
    loop: true,
    pager: false,
    pauseOnHover: true,
    enableDrag: false,
    responsive : [
      {
          breakpoint: 1600,
          settings: {
              item: 4,
          }
      },
      {
        breakpoint: 1025,
        settings: {
            item: 3,
        }
      },
      {
        breakpoint: 769,
        settings: {
            item: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
            item: 1,
            pager: true,
        }
      },
  ],
  }); 

  $('.arrow-team-left').on('click', function (e) {
    sliderTeam.goToPrevSlide();
  })
  $('.arrow-team-right').on('click', function (e) {
    sliderTeam.goToNextSlide();
  })
});



  
