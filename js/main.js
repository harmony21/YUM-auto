$(document).ready(function() {

    //калькулятор
    function round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
    function divideNumberByPieces(x, delimiter) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || " ");
    }
    function del_spaces(str) {
        return str.replace(/\s/g, '');
    }
    function getPercentArray() {
    var percents = {
      "10": {
        "DAYS": "304",
        "DAY_PERCENT": "0.37125"
      },
      "11": {
        "DAYS": "334",
        "DAY_PERCENT": "0.3403125"
      },
      "12": {
        "DAYS": "365",
        "DAY_PERCENT": "0.3196875"
      },
      "13": {
        "DAYS": "400",
        "DAY_PERCENT": "0.30512109375"
      },
      "14": {
        "DAYS": "430",
        "DAY_PERCENT": "0.29618459302326"
      },
      "15": {
        "DAYS": "460",
        "DAY_PERCENT": "0.28841372282609"
      },
      "16": {
        "DAYS": "490",
        "DAY_PERCENT": "0.2815943877551"
      },
      "17": {
        "DAYS": "520",
        "DAY_PERCENT": "0.27556189903846"
      },
      "18": {
        "DAYS": "550",
        "DAY_PERCENT": "0.2701875"
      },
      "19": {
        "DAYS": "580",
        "DAY_PERCENT": "0.26536907327586"
      },
      "20": {
        "DAYS": "610",
        "DAY_PERCENT": "0.26102459016393"
      },
      "21": {
        "DAYS": "640",
        "DAY_PERCENT": "0.25708740234375"
      },
      "22": {
        "DAYS": "670",
        "DAY_PERCENT": "0.25350279850746"
      },
      "23": {
        "DAYS": "700",
        "DAY_PERCENT": "0.25022544642857"
      },
      "24": {
        "DAYS": "730",
        "DAY_PERCENT": "0.24721746575342"
      },
      "25": {
        "DAYS": "765",
        "DAY_PERCENT": "0.23872022058824"
      },
      "26": {
        "DAYS": "795",
        "DAY_PERCENT": "0.23241391509434"
      },
      "27": {
        "DAYS": "825",
        "DAY_PERCENT": "0.2371875"
      },
      "28": {
        "DAYS": "855",
        "DAY_PERCENT": "0.2371875"
      },
      "29": {
        "DAYS": "885",
        "DAY_PERCENT": "0.226875"
      },
      "30": {
        "DAYS": "915",
        "DAY_PERCENT": "0.226875"
      },
      "31": {
        "DAYS": "945",
        "DAY_PERCENT": "0.2165625"
      },
      "32": {
        "DAYS": "975",
        "DAY_PERCENT": "0.2165625"
      },
      "33": {
        "DAYS": "1005",
        "DAY_PERCENT": "0.2165625"
      },
      "34": {
        "DAYS": "1035",
        "DAY_PERCENT": "0.20625"
      },
      "35": {
        "DAYS": "1065",
        "DAY_PERCENT": "0.19164498239437"
      },
      "36": {
        "DAYS": "1095",
        "DAY_PERCENT": "0.185625"
      },
      "06": {
        "DAYS": "182",
        "DAY_PERCENT": "0.42"
      },
      "07": {
        "DAYS": "212",
        "DAY_PERCENT": "0.41"
      },
      "08": {
        "DAYS": "243",
        "DAY_PERCENT": "0.39"
      },
      "09": {
        "DAYS": "273",
        "DAY_PERCENT": "0.38"
      }
    };
        var time = $( "#time-amount" ).val()*1;
        if (time<10) {
            time = "0"+time;
        }
        return percents[time];       
    }

    function getPercentDay() {
        var percentAr = getPercentArray();
        return percentAr["DAY_PERCENT"]/100;
    }
    function getTotalDays() {
        var percentAr = getPercentArray();
        return percentAr["DAYS"];
    }
    function printCalcTable() {
        var divToPrint=document.getElementById('table_calc');
        var newWin=window.open('','Print-Window');
        newWin.document.open();
        newWin.document.write('<html><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');
        newWin.document.close();
        setTimeout(function(){newWin.close();},10);
    }
    function calcday() {
        var percentDay = getPercentDay();
        var time = getTotalDays();
        var constAutent = Math.pow(1+ percentDay,time)-1;
        var percentAutent = (percentDay/constAutent)+ percentDay;
        var autoCost = del_spaces($( "#cost-amount" ).val());
        var autoFistPay = $( "#percent-amount" ).val()/100;
        var sumAfterFirstPay = (autoCost - autoCost * autoFistPay);
        var payDay = round(sumAfterFirstPay * percentAutent, 2);
        var payMonth = round(sumAfterFirstPay * percentAutent * 30, 2);
        $( "#summa" ).text( divideNumberByPieces(sumAfterFirstPay) );
        $( "#pay_day" ).text( divideNumberByPieces(payDay) );
        $( "#pay_month" ).text( divideNumberByPieces(payMonth) );
        $( "#first_pay" ).text( divideNumberByPieces(round(autoCost * autoFistPay, 2) ));
        $( "#cost-amount" ).text( divideNumberByPieces(autoCost));
    }
    function calctable() {
        var percentDay = getPercentDay();
        var time = getTotalDays();
        var constAutent = Math.pow(1+ percentDay,time)-1;
        var percentAutent = (percentDay/constAutent)+ percentDay;
        var autoCost = del_spaces($( "#cost-amount" ).val());
        var autoFistPay = $( "#percent-amount" ).val()/100;
        var tableStart = "<table border=1><tr><th>Месяц</th><th>Ежемесячный платеж</th><th>Аренда</th><th>Основной долг</th><th>Выкупная цена</th></tr>";
        var firstPay = (autoCost - autoCost * autoFistPay);
        var payDay = round(firstPay * percentAutent, 2);
        var mounhtPay = round(firstPay * percentAutent * 30, 2);
        var tableFirstLine = "<tr><td></td><td></td><td></td><td></td><td>"+divideNumberByPieces(firstPay.toFixed(2))+" р.</td></tr>";
        var tableEnd = "</table>";
        var tableBody = "";
        var i = 0;
        var d = 0;
        var tempMounthPay=0;
        var tempPercentPay=0;
        var tempfirstPay = firstPay;
        while (firstPay > 0) {
            var percentMonth =  round(firstPay * percentDay, 2);
            //	console.log(percentMonth);
            var vykupMonth =  round(payDay - percentMonth, 2);
            tempMounthPay = round(tempMounthPay + percentMonth, 2);
            firstPay = round(firstPay - vykupMonth, 2);
            if (firstPay < 0) {
                firstPay = 0;
            } 
            d++;
            if (d == 30) {
                i++;
                tempPercentPay = round(mounhtPay - tempMounthPay, 2);
                tempfirstPay = round(tempfirstPay - tempPercentPay, 2);
                if (i == time/30) {
                    tempfirstPay = 0;
                } 
                tableBody = tableBody +"<tr><td>"+i+"</td><td>"+divideNumberByPieces(mounhtPay.toFixed(2))+" р.</td><td>"+divideNumberByPieces(tempMounthPay.toFixed(2))+" р.</td><td>"+divideNumberByPieces(tempPercentPay.toFixed(2))+" р.</td><td>"+divideNumberByPieces(tempfirstPay.toFixed(2))+" р.</td></tr>";
                d =0;
                tempMounthPay = 0;
                if (i == time/30-1) {
                    mounhtPay = tempfirstPay;
                } 
            }
        }
        var tableCalc = tableStart + tableFirstLine + tableBody + tableEnd;
        var beforeTable = "<div><h2>График платежей за автомобиль в ЮM-АВТО</h2><p>Телефон: +7 924 200 4 200</p><a href='javascript:void(0)' onclick='printCalcTable();' class='btn transparent'>Печать</a></div>"
        var afterTable = "<div style='clear:both;'></div><div>Данный расчет не является публичной офертой, точные условия займа, Вы сможете уточнить у наших менеджеров</div>"
        $( "#table_calc" ).html(beforeTable+tableCalc+afterTable);
        var wrap = $('#wrapper'),
        modal = $('.cover, .modal, .content_modal');
        modal.fadeIn();
    }
    $( document ).ready(function() {
        var wrap = $('#wrapper');
        modal = $('.cover, .modal, .content_modal');
        $('.modal').click(function() {
        wrap.on('click', function(event) {
            var select = $('.content_modal');
            if ($(event.target).closest(select).length)
                return;
            modal.fadeOut();
            wrap.unbind('click');
        });
        });
    });
    $( function() {
        $( "#cost" ).slider({
            value:300000,
            min: 100000,
            max: 1000000,
            step: 10000,
            slide: function( event, ui ) {
                $( "#cost-amount" ).val(divideNumberByPieces(ui.value));
                calcday();
            }
        });
        $( "#percent" ).slider({
            value:10,
            min: 10,
            max: 50,
            step: 1,
            slide: function( event, ui ) {
                $( "#percent-amount" ).val( ui.value );
                calcday();
            }
        });
        $( "#time" ).slider({
            value:36,
            min: 6,
            max: 36,
            step: 1,
            slide: function( event, ui ) {
                $( "#time-amount" ).val( ui.value );
                calcday();
            }
        });
        $( "#cost-amount" ).val( divideNumberByPieces($( "#cost" ).slider( "value" ) ));
        $( "#percent-amount" ).val( $( "#percent" ).slider( "value" ) );
        $( "#time-amount" ).val( $( "#time" ).slider( "value" ) );
        calcday();
    });


    //прокрутка "подробнее"
    $(function(){
        $(".link-more").click(function(){
                var _href = $(this).attr("href");
                $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
                return false;
        });
    });


    //расчет высоты блоков в отзывах
    var mh = 0;
    $(".reviews__item.text").each(function () {
        var h_block = parseInt($(this).outerHeight());
        if(h_block > mh) {
           mh = h_block;
        };
    });
    $(".reviews__item").css('height', mh);

    //появление блока "Выбор города"
    $(".address__choice-link").click(function(e){
      $(".address__hidden").fadeIn();
    });
    $(".address__close").click(function(e){
      $(".address__hidden").fadeOut();
    });

    //Заказать звонок
    $('.btn-call-back').fancybox({
        autoFocus: false,
        closeExisting: true,
    }); 

    //Оставить отзыв
    $('.btn-leave-review').fancybox({
      autoFocus: false,
      closeExisting: true,
  });

    //калькулятор в модальном окне
    $('.calculator-link').fancybox({
      autoFocus: false,
      touch: false,
      beforeLoad: function() {
        function round(value, decimals) {
          return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
      }
      function divideNumberByPieces(x, delimiter) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || " ");
      }
      function del_spaces(str) {
          return str.replace(/\s/g, '');
      }
      function getPercentArray() {
      var percents = {
        "10": {
          "DAYS": "304",
          "DAY_PERCENT": "0.37125"
        },
        "11": {
          "DAYS": "334",
          "DAY_PERCENT": "0.3403125"
        },
        "12": {
          "DAYS": "365",
          "DAY_PERCENT": "0.3196875"
        },
        "13": {
          "DAYS": "400",
          "DAY_PERCENT": "0.30512109375"
        },
        "14": {
          "DAYS": "430",
          "DAY_PERCENT": "0.29618459302326"
        },
        "15": {
          "DAYS": "460",
          "DAY_PERCENT": "0.28841372282609"
        },
        "16": {
          "DAYS": "490",
          "DAY_PERCENT": "0.2815943877551"
        },
        "17": {
          "DAYS": "520",
          "DAY_PERCENT": "0.27556189903846"
        },
        "18": {
          "DAYS": "550",
          "DAY_PERCENT": "0.2701875"
        },
        "19": {
          "DAYS": "580",
          "DAY_PERCENT": "0.26536907327586"
        },
        "20": {
          "DAYS": "610",
          "DAY_PERCENT": "0.26102459016393"
        },
        "21": {
          "DAYS": "640",
          "DAY_PERCENT": "0.25708740234375"
        },
        "22": {
          "DAYS": "670",
          "DAY_PERCENT": "0.25350279850746"
        },
        "23": {
          "DAYS": "700",
          "DAY_PERCENT": "0.25022544642857"
        },
        "24": {
          "DAYS": "730",
          "DAY_PERCENT": "0.24721746575342"
        },
        "25": {
          "DAYS": "765",
          "DAY_PERCENT": "0.23872022058824"
        },
        "26": {
          "DAYS": "795",
          "DAY_PERCENT": "0.23241391509434"
        },
        "27": {
          "DAYS": "825",
          "DAY_PERCENT": "0.2371875"
        },
        "28": {
          "DAYS": "855",
          "DAY_PERCENT": "0.2371875"
        },
        "29": {
          "DAYS": "885",
          "DAY_PERCENT": "0.226875"
        },
        "30": {
          "DAYS": "915",
          "DAY_PERCENT": "0.226875"
        },
        "31": {
          "DAYS": "945",
          "DAY_PERCENT": "0.2165625"
        },
        "32": {
          "DAYS": "975",
          "DAY_PERCENT": "0.2165625"
        },
        "33": {
          "DAYS": "1005",
          "DAY_PERCENT": "0.2165625"
        },
        "34": {
          "DAYS": "1035",
          "DAY_PERCENT": "0.20625"
        },
        "35": {
          "DAYS": "1065",
          "DAY_PERCENT": "0.19164498239437"
        },
        "36": {
          "DAYS": "1095",
          "DAY_PERCENT": "0.185625"
        },
        "06": {
          "DAYS": "182",
          "DAY_PERCENT": "0.42"
        },
        "07": {
          "DAYS": "212",
          "DAY_PERCENT": "0.41"
        },
        "08": {
          "DAYS": "243",
          "DAY_PERCENT": "0.39"
        },
        "09": {
          "DAYS": "273",
          "DAY_PERCENT": "0.38"
        }
      };
          var time1 = $( "#time-amount1" ).val()*1;
          if (time1<10) {
              time1 = "0"+time1;
          }
          return percents[time1];       
      }
      
      function getPercentDay() {
          var percentAr1 = getPercentArray();
          return percentAr1["DAY_PERCENT"]/100;
      }
      function getTotalDays() {
          var percentAr1 = getPercentArray();
          return percentAr1["DAYS"];
      }
      function printCalcTable() {
          var divToPrint1=document.getElementById('table_calc');
          var newWin1=window.open('','Print-Window');
          newWin.document.open();
          newWin.document.write('<html><body onload="window.print()">'+divToPrint1.innerHTML+'</body></html>');
          newWin.document.close();
          setTimeout(function(){newWin1.close();},10);
      }
      function calcday() {
          var percentDay1 = getPercentDay();
          var time1 = getTotalDays();
          var constAutent1 = Math.pow(1+ percentDay1,time1)-1;
          var percentAutent1 = (percentDay1/constAutent1)+ percentDay1;
          var autoCost1 = del_spaces($( "#cost-amount1" ).val());
          var autoFistPay1 = $( "#percent-amount1" ).val()/100;
          var sumAfterFirstPay1 = (autoCost1 - autoCost1 * autoFistPay1);
          var payDay1 = round(sumAfterFirstPay1 * percentAutent1, 2);
          var payMonth1 = round(sumAfterFirstPay1 * percentAutent1 * 30, 2);
          $( "#summa1" ).text( divideNumberByPieces(sumAfterFirstPay1) );
          $( "#pay_day1" ).text( divideNumberByPieces(payDay1) );
          $( "#pay_month1" ).text( divideNumberByPieces(payMonth1));
          $( "#first_pay1" ).text( divideNumberByPieces(round(autoCost1 * autoFistPay1, 2) ));
          $( "#cost-amount1" ).text( divideNumberByPieces(autoCost1));
      }
      function calctable() {
          var percentDay1 = getPercentDay();
          var tim1e = getTotalDays();
          var constAutent1 = Math.pow(1+ percentDay1,time1)-1;
          var percentAutent1 = (percentDay1/constAutent1)+ percentDay1;
          var autoCost1 = del_spaces($( "#cost-amoun1t" ).val());
          var autoFistPay1 = $( "#percent-amount1" ).val()/100;
          var tableStart1 = "<table border=1><tr><th>Месяц</th><th>Ежемесячный платеж</th><th>Аренда</th><th>Основной долг</th><th>Выкупная цена</th></tr>";
          var firstPay1 = (autoCost1 - autoCost1 * autoFistPay1);
          var payDay1 = round(firstPay1 * percentAutent1, 2);
          var mounhtPay1 = round(firstPay1 * percentAutent1 * 30, 2);
          var tableFirstLine1 = "<tr><td></td><td></td><td></td><td></td><td>"+divideNumberByPieces(firstPay1.toFixed(2))+" р.</td></tr>";
          var tableEnd1 = "</table>";
          var tableBody1 = "";
          var i1 = 0;
          var d1 = 0;
          var tempMounthPay1=0;
          var tempPercentPay1=0;
          var tempfirstPay1 = firstPay1;
          while (firstPay1 > 0) {
              var percentMonth1 =  round(firstPay1 * percentDay1, 2);
              //	console.log(percentMonth);
              var vykupMonth1 =  round(payDay1 - percentMonth1, 2);
              tempMounthPay1 = round(tempMounthPay1 + percentMonth1, 2);
              firstPay1 = round(firstPay1 - vykupMonth1, 2);
              if (firstPay1 < 0) {
                  firstPay1 = 0;
              } 
              d1++;
              if (d1 == 30) {
                  i1++;
                  tempPercentPay1 = round(mounhtPay1 - tempMounthPay1, 2);
                  tempfirstPay1 = round(tempfirstPay1 - tempPercentPay1, 2);
                  if (i1 == time1/30) {
                      tempfirstPay1 = 0;
                  } 
                  tableBody1 = tableBody1 +"<tr><td>"+i+"</td><td>"+divideNumberByPieces(mounhtPay1.toFixed(2))+" р.</td><td>"+divideNumberByPieces(tempMounthPay1.toFixed(2))+" р.</td><td>"+divideNumberByPieces(tempPercentPay1.toFixed(2))+" р.</td><td>"+divideNumberByPieces(tempfirstPay1.toFixed(2))+" р.</td></tr>";
                  d1 =0;
                  tempMounthPay1 = 0;
                  if (i1 == time1/30-1) {
                      mounhtPay1 = tempfirstPay1;
                  } 
              }
          }
          var tableCalc1 = tableStart1 + tableFirstLine1 + tableBody1 + tableEnd1;
          var beforeTable1 = "<div><h2>График платежей за автомобиль в ЮM-АВТО</h2><p>Телефон: +7 924 200 4 200</p><a href='javascript:void(0)' onclick='printCalcTable();' class='btn transparent'>Печать</a></div>"
          var afterTable1 = "<div style='clear:both;'></div><div>Данный расчет не является публичной офертой, точные условия займа, Вы сможете уточнить у наших менеджеров</div>"
          $( "#table_calc1" ).html(beforeTable1+tableCalc1+afterTable1);
          var wrap1 = $('#wrapper1'),
          modal1 = $('.cover, .modal, .content_modal');
          modal1.fadeIn();
      }
      $( document ).ready(function() {
          var wrap = $('#wrapper');
          modal = $('.cover, .modal, .content_modal');
          $('.modal').click(function() {
          wrap.on('click', function(event) {
              var select = $('.content_modal');
              if ($(event.target).closest(select).length)
                  return;
              modal.fadeOut();
              wrap.unbind('click');
          });
          });
      });
      $( function() {
          $( "#cost1" ).slider({
              value:300000,
              min: 100000,
              max: 1000000,
              step: 10000,
              slide: function( event, ui ) {
                  $( "#cost-amount1" ).val(divideNumberByPieces(ui.value));
                  calcday();
              }
          });
          $( "#percent1" ).slider({
              value:10,
              min: 10,
              max: 50,
              step: 1,
              slide: function( event, ui ) {
                  $( "#percent-amount1" ).val( ui.value );
                  calcday();
              }
          });
          $( "#time1" ).slider({
              value:36,
              min: 6,
              max: 36,
              step: 1,
              slide: function( event, ui ) {
                  $( "#time-amount1" ).val( ui.value );
                  calcday();
              }
          });
          $( "#cost-amount1" ).val( divideNumberByPieces($( "#cost1" ).slider( "value" ) ));
          $( "#percent-amount1" ).val( $( "#percent1" ).slider( "value" ) );
          $( "#time-amount1" ).val( $( "#time1" ).slider( "value" ) );
          calcday();
      });
      },
      afterClose: function() {
        $(".modal-calculator__pic").css('display', 'flex');
        $(".modal-calculator__order").css('display', 'none');
        $(".btn.color.btn-order-call-back").css('background-color', '#E23626');
      }
    }); 


    //смена нижней части формы "Рассчитать стоимость"
    $(".btn.color.btn-order-call-back").click(function(e){
      e.preventDefault();
      $(".modal-calculator__pic").css('display', 'none');
      $(".modal-calculator__order").css('display', 'block');
      $(".btn.color.btn-order-call-back").css('background-color', '#000');

      var sumAmount1 = $('#cost-amount1').val(),
      contributionAmount1 = $("#percent-amount1").val(),
      timeAmount1 = $('#time-amount1').val();


      $("#sum-amount-hidden1").val(sumAmount1);
      $("#percent-amount-hidden1").val(contributionAmount1);
      $("#time-amount-hidden1").val(timeAmount1);
    });

    $(".btn.color.btn-order-call-calculate-auto").click(function(e){

      var sumAmount2 = $('#cost-amount2').val(),
      contributionAmount2 = $("#percent-amount2").val(),
      timeAmount2 = $('#time-amount2').val();

      $("#sum-amount-hidden2").val(sumAmount2);
      $("#percent-amount-hidden2").val(contributionAmount2);
      $("#time-amount-hidden2").val(timeAmount2);
    });

    //открытие карточки с последующим переходом в калькулятор (с подстановкой значения)
    $('.btn.btn-order-car').click(function(){
      var newPrice = $(this).closest('.catalog__item').data('calc-sum');
      var newPriceNumber = Number.parseInt(newPrice);
      var autoTitle = $(this).closest('.catalog__item').data('title');
      $('#auto-title').html(autoTitle);

        function round(value, decimals) {
            return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
        }

        function divideNumberByPieces(x, delimiter) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || " ");
        }
        function del_spaces(str) {
            return str.replace(/\s/g, '');
        }
        function getPercentArray() {
        var percents = {
          "10": {
            "DAYS": "304",
            "DAY_PERCENT": "0.37125"
          },
          "11": {
            "DAYS": "334",
            "DAY_PERCENT": "0.3403125"
          },
          "12": {
            "DAYS": "365",
            "DAY_PERCENT": "0.3196875"
          },
          "13": {
            "DAYS": "400",
            "DAY_PERCENT": "0.30512109375"
          },
          "14": {
            "DAYS": "430",
            "DAY_PERCENT": "0.29618459302326"
          },
          "15": {
            "DAYS": "460",
            "DAY_PERCENT": "0.28841372282609"
          },
          "16": {
            "DAYS": "490",
            "DAY_PERCENT": "0.2815943877551"
          },
          "17": {
            "DAYS": "520",
            "DAY_PERCENT": "0.27556189903846"
          },
          "18": {
            "DAYS": "550",
            "DAY_PERCENT": "0.2701875"
          },
          "19": {
            "DAYS": "580",
            "DAY_PERCENT": "0.26536907327586"
          },
          "20": {
            "DAYS": "610",
            "DAY_PERCENT": "0.26102459016393"
          },
          "21": {
            "DAYS": "640",
            "DAY_PERCENT": "0.25708740234375"
          },
          "22": {
            "DAYS": "670",
            "DAY_PERCENT": "0.25350279850746"
          },
          "23": {
            "DAYS": "700",
            "DAY_PERCENT": "0.25022544642857"
          },
          "24": {
            "DAYS": "730",
            "DAY_PERCENT": "0.24721746575342"
          },
          "25": {
            "DAYS": "765",
            "DAY_PERCENT": "0.23872022058824"
          },
          "26": {
            "DAYS": "795",
            "DAY_PERCENT": "0.23241391509434"
          },
          "27": {
            "DAYS": "825",
            "DAY_PERCENT": "0.2371875"
          },
          "28": {
            "DAYS": "855",
            "DAY_PERCENT": "0.2371875"
          },
          "29": {
            "DAYS": "885",
            "DAY_PERCENT": "0.226875"
          },
          "30": {
            "DAYS": "915",
            "DAY_PERCENT": "0.226875"
          },
          "31": {
            "DAYS": "945",
            "DAY_PERCENT": "0.2165625"
          },
          "32": {
            "DAYS": "975",
            "DAY_PERCENT": "0.2165625"
          },
          "33": {
            "DAYS": "1005",
            "DAY_PERCENT": "0.2165625"
          },
          "34": {
            "DAYS": "1035",
            "DAY_PERCENT": "0.20625"
          },
          "35": {
            "DAYS": "1065",
            "DAY_PERCENT": "0.19164498239437"
          },
          "36": {
            "DAYS": "1095",
            "DAY_PERCENT": "0.185625"
          },
          "06": {
            "DAYS": "182",
            "DAY_PERCENT": "0.42"
          },
          "07": {
            "DAYS": "212",
            "DAY_PERCENT": "0.41"
          },
          "08": {
            "DAYS": "243",
            "DAY_PERCENT": "0.39"
          },
          "09": {
            "DAYS": "273",
            "DAY_PERCENT": "0.38"
          }
        };
            var time2 = $( "#time-amount2" ).val()*1;
            if (time2<10) {
                time2 = "0"+time2;
            }
            return percents[time2];       
        }
        
        function getPercentDay() {
            var percentAr2 = getPercentArray();
            return percentAr2["DAY_PERCENT"]/100;
        }
        function getTotalDays() {
            var percentAr2 = getPercentArray();
            return percentAr2["DAYS"];
        }
        function printCalcTable() {
            var divToPrint2=document.getElementById('table_calc');
            var newWin2=window.open('','Print-Window');
            newWin2.document.open();
            newWin2.document.write('<html><body onload="window.print()">'+divToPrint2.innerHTML+'</body></html>');
            newWin2.document.close();
            setTimeout(function(){newWin2.close();},10);
        }
        function calcday() {
            var percentDay2 = getPercentDay();
            var time2 = getTotalDays();
            var constAutent2 = Math.pow(1+ percentDay2,time2)-1;
            var percentAutent2 = (percentDay2/constAutent2)+ percentDay2;
            var autoCost2 = del_spaces($( "#cost-amount2" ).val());
            var autoFistPay2 = $( "#percent-amount2" ).val()/100;
            var sumAfterFirstPay2 = (autoCost2 - autoCost2 * autoFistPay2);
            var payDay2 = round(sumAfterFirstPay2 * percentAutent2, 2);
            var payMonth2 = round(sumAfterFirstPay2 * percentAutent2 * 30, 2);
            $( "#summa2" ).text( divideNumberByPieces(sumAfterFirstPay2) );
            $( "#pay_day2" ).text( divideNumberByPieces(payDay2) );
            $( "#pay_month2" ).text( divideNumberByPieces(payMonth2));
            $( "#first_pay2" ).text( divideNumberByPieces(round(autoCost2 * autoFistPay2, 2) ));
            $( "#cost-amount2" ).text( divideNumberByPieces(autoCost2));
        }
        function calctable() {
            var percentDay2 = getPercentDay();
            var time2 = getTotalDays();
            var constAutent2 = Math.pow(1+ percentDay2,time2)-1;
            var percentAutent2 = (percentDay2/constAutent2)+ percentDay2;
            var autoCost2 = del_spaces($( "#cost-amount2" ).val());
            var autoFistPay2 = $( "#percent-amount2" ).val()/100;
            var tableStart2 = "<table border=1><tr><th>Месяц</th><th>Ежемесячный платеж</th><th>Аренда</th><th>Основной долг</th><th>Выкупная цена</th></tr>";
            var firstPay2 = (autoCost2 - autoCost2 * autoFistPay2);
            var payDay2 = round(firstPay2 * percentAutent2, 2);
            var mounhtPay2 = round(firstPay2 * percentAutent2 * 30, 2);
            var tableFirstLine2 = "<tr><td></td><td></td><td></td><td></td><td>"+divideNumberByPieces(firstPay1.toFixed(2))+" р.</td></tr>";
            var tableEnd2 = "</table>";
            var tableBody2 = "";
            var i2 = 0;
            var d2 = 0;
            var tempMounthPay2=0;
            var tempPercentPay2=0;
            var tempfirstPay2 = firstPay2;
            while (firstPay2 > 0) {
                var percentMonth2 =  round(firstPay2 * percentDay2, 2);
                //	console.log(percentMonth);
                var vykupMonth2 =  round(payDay2 - percentMonth2, 2);
                tempMounthPay2 = round(tempMounthPay2 + percentMonth2, 2);
                firstPay2 = round(firstPay2 - vykupMonth2, 2);
                if (firstPay2 < 0) {
                    firstPay2 = 0;
                } 
                d2++;
                if (d2 == 30) {
                    i2++;
                    tempPercentPay2 = round(mounhtPay2 - tempMounthPay2, 2);
                    tempfirstPay2 = round(tempfirstPay2 - tempPercentPay2, 2);
                    if (i2 == time2/30) {
                        tempfirstPay2 = 0;
                    } 
                    tableBody2 = tableBody2 +"<tr><td>"+i+"</td><td>"+divideNumberByPieces(mounhtPay2.toFixed(2))+" р.</td><td>"+divideNumberByPieces(tempMounthPay2.toFixed(2))+" р.</td><td>"+divideNumberByPieces(tempPercentPay2.toFixed(2))+" р.</td><td>"+divideNumberByPieces(tempfirstPay2.toFixed(2))+" р.</td></tr>";
                    d2 = 0;
                    tempMounthPay2 = 0;
                    if (i2 == time2/30-1) {
                        mounhtPay2 = tempfirstPay2;
                    } 
                }
            }
            var tableCalc2 = tableStart2 + tableFirstLine2 + tableBody2 + tableEnd2;
            var beforeTable2 = "<div><h2>График платежей за автомобиль в ЮM-АВТО</h2><p>Телефон: +7 924 200 4 200</p><a href='javascript:void(0)' onclick='printCalcTable();' class='btn transparent'>Печать</a></div>"
            var afterTable2 = "<div style='clear:both;'></div><div>Данный расчет не является публичной офертой, точные условия займа, Вы сможете уточнить у наших менеджеров</div>"
            $( "#table_calc2" ).html(beforeTable2+tableCalc2+afterTable2);
            var wrap2 = $('#wrapper2'),
            modal2 = $('.cover, .modal, .content_modal');
            modal2.fadeIn();
        }
        $( document ).ready(function() {
            var wrap = $('#wrapper');
            modal = $('.cover, .modal, .content_modal');
            $('.modal').click(function() {
            wrap.on('click', function(event) {
                var select = $('.content_modal');
                if ($(event.target).closest(select).length)
                    return;
                modal.fadeOut();
                wrap.unbind('click');
            });
            });
        });
  
        $( function() {
            $( "#cost2" ).slider({
                value:newPriceNumber,
                min: 100000,
                max: 1000000,
                step: 10000,
                slide: function( event, ui ) {
                    $( "#cost-amount2" ).val(divideNumberByPieces(ui.value));
                    calcday();
                }
            });
            $( "#percent2" ).slider({
                value:10,
                min: 10,
                max: 50,
                step: 1,
                slide: function( event, ui ) {
                    $( "#percent-amount2" ).val( ui.value );
                    calcday();
                }
            });
            $( "#time2" ).slider({
                value:36,
                min: 6,
                max: 36,
                step: 1,
                slide: function( event, ui ) {
                    $( "#time-amount2" ).val( ui.value );
                    calcday();
                }
            });
            $( "#cost-amount2" ).val( divideNumberByPieces($( "#cost2" ).slider( "value" ) ));
            $( "#percent-amount2" ).val( $( "#percent2" ).slider( "value" ) );
            $( "#time-amount2" ).val( $( "#time2" ).slider( "value" ) );
            calcday();
        });
    })

    //заказать звонок
    $('.btn-order-call').fancybox({
      autoFocus: false
    }); 

    //заказать звонок (с калькулятором)
    $('.btn-order-call-calculate').fancybox({
      autoFocus: false,
      beforeLoad: function() {
        var sumAmount = $('#cost-amount').val(),
        contributionAmount = $("#percent-amount").val(),
        timeAmount = $('#time-amount').val();
        console.log(sumAmount);

        $("#sum-amount-hidden").val(sumAmount);
        $("#percent-amount-hidden").val(contributionAmount);
        $("#time-amount-hidden").val(timeAmount);
      }
    }); 


    //Мобильное меню
    $('.menu-icon').fancybox({
      closeExisting: true,
    }); 
    //перемещение номера телефона в header
    if ($(window).width() <= 1025) {
        $('.header__bottom').append( $('.header').find('.phone') );
    }

    //слайдер фото автомобиля в модальном окне
    $('.btn-order-car').fancybox({
      closeExisting: true,
      touch: false,
      afterShow: function() {
        $('#sliderCar').sliderPro({
          autoplay: false,
        });

        var sliderCar = $('#sliderCar').data('sliderPro');
        $('.arrow-left-slider-car').on('click', function (e) {
          sliderCar.previousSlide();
        })
        $('.arrow-right-slider-car').on('click', function (e) {
          sliderCar.nextSlide();
        }) 

      },
    }); 

     //перемещение фото в конец блока
      if ($(window).width() <= 480) {
        $('.order-car__right').append($('.order-car__slider'));
        $('.order-car__left').append( $('.order-car').find('.catalog__status') );
      }

    //подгрузка данных в модальное окно каталога (заказать авто)
    $(".catalog__item").click(function(e){
      var catalogItem = $(this);
      var item_status = catalogItem.data('status');
      item_title = catalogItem.data('title'),
      item_year = catalogItem.data('year'),
      item_transmission = catalogItem.data('transmission'),
      item_privod = catalogItem.data('privod'),
      item_v = catalogItem.data('v'),
      item_probeg = catalogItem.data('probeg'),
      item_desc = catalogItem.data('desc'),
      item_new_price = catalogItem.data('new-price'),
      item_old_price = catalogItem.data('old-price'),

      item_photo_1 = catalogItem.data('photo-1');
      item_photo_2 = catalogItem.data('photo-2');
      item_photo_3 = catalogItem.data('photo-3');
      item_photo_4 = catalogItem.data('photo-4');
      item_photo_5 = catalogItem.data('photo-5');
      item_photo_6 = catalogItem.data('photo-6');
      $('#status').html(item_status);
      $('#title').html(item_title);
      $('#year').html('Год выпуска: ' + item_year);
      $('#transmission').html('Трансмиссия: ' + item_transmission);
      $('#privod').html('Привод: ' + item_privod);
      $('#v').html('Объем двигателя: ' + item_v);
      $('#probeg').html('Пробег: ' + item_probeg);
      $('#desc').html(item_desc);
      $('#new-price').html(item_new_price + ' Р' + '<span> / cут.</span>');
      $('#old-price').html(item_old_price + ' Р');


      $('#slider-car-1').find('img').attr('src', item_photo_1);
      $('#slider-car-2').find('img').attr('src', item_photo_2);
      $('#slider-car-3').find('img').attr('src', item_photo_3);
      $('#slider-car-4').find('img').attr('src', item_photo_4);
      $('#slider-car-5').find('img').attr('src', item_photo_5);
      $('#slider-car-6').find('img').attr('src', item_photo_6);

      if (item_status == 'Хит') {
        $('#status').css('background-color', '#00B1EB')
      }
      if (item_status == 'Акция') {
        $('#status').css('background-color', '#4FBD18')
      }
      if (item_status == 'Новинка') {
        $('#status').css('background-color', '#E23626')
      }
    });


    //перемещение соц.сетей (страница "Контакты")
    if ($(window).width() <= 480) {
      $('.section__top.title').append( $('.contacts__left').find('.socials') );
      $('.contacts__left').append( $('.section__top.title').find('.btn') );
    }
    
});