/***
 * 2013.11.13
 * @arthur : bding
 * version:searchSuggest.js 1.0
***/
// 前提引入jquery
// 在 FF，chrome ，IE7测试良好
$(function() {
  $.fn.searchSuggest = function(options) {
    var defaults = {
      url:"/default/index/ajaxgetuser/nick/", //参数url，传递给后台url处理
    };
    var options = $.extend(defaults,options);   
    var $mhInput = $(this);
     $mhInput.keyup(function(){
          var nick = $(this).val(); //得到input框中的值
          $("#result").empty(); //清空ul
          $.ajax({
                dataType:'json', // #返回json数据#
                type:"POST",
                url:options.url+nick,
                success:function(msg){
                    var result = showResult(msg);
                     $("#result").empty();//清空前一次的结果
                    $(".user").after(result); //在div后显示提示结果
                }
          });

        });

      function showResult(data){  // 以 li 形式装载提示结果
        var offset = getPosition();
        var result = "<ul id='result' style=left:"+offset.left+";height:10;width:200;position:absolute;top:"+offset.top+">";
          if (data.length != 0) {
              for (var i=0 ; i<data.length; i++){
                  result +="<li val="+data[i].id+">"+data[i].nick+"</li>";
              }
              result +="</ul>";
          }else{
            result += "<li>没有数据</li></ul>";
          }
          return result;
      }

      //得到 input 框的位置，来确定ul的绝对定位
      function getPosition(){
        var nickOffset = $mhInput.offset();
        var top = nickOffset.top + 30;
        var left = nickOffset.left - 20;
    //  alert(left);
        return {top:top.toFixed(2) , left:left.toFixed(2)}; //保留两位小数
      }

      // 鼠标选中 li，选中后消失
      $("#result li").live("click",function(){
          var user_name = $(this).text(); //取li中的val
          $mhInput.val(); //清空 input框
          $mhInput.val(user_name);
          $("#result").fadeOut(); // ul 淡出
      });

  }

});
