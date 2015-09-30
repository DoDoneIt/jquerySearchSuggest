/***
 * version:20150923
 ***/
//前提引入jquery
$(function() {
  $.fn.spotSuggest = function(options) {
    var defaults = {
      url: "",
      id: "id",
      name: "name",
	  hiddenValue:'',
	  result:'',
	  input:''
    };
    var options = $.extend(defaults, options);
    var $mhInput = $("#"+options.input);
    console.log(options);
    $mhInput.keyup(function() {
      var name = $.trim($mhInput.val()); //得到input框中的值
      if(name == ''){
        clearSpotId();
        return true;
      }
      var url = options.url + "&cache="+Math.random()+"&name=";
      $("#result").remove(); //清空ul
      $.ajax({
        dataType: 'json',
        type: "GET",
        url: url + name,
        success: function(msg) {
         var result = showResult(msg);
         $("#result").remove();//清空前一次的结果 
         $("."+options.result).after(result); //在div后显示提示结果
        }
      });
    });

    //清空
    function clearSpotId(){
      $("#"+options.hiddenValue).val('0');
    }

    function showResult(data) { // 以 li 形式装载提示结果
      var offset = getPosition();
      var name = options.name;
      var id = options.id;
      var result = "<ul id='result' style=top:" + offset.top+"px;left:"+offset.left+"px>";
      if (data.length != 0) {
        for (var i = 0; i < data.length; i++) {
          result += "<li val='" + data[i][options.id] + "'>" + data[i][options.name] + "</li>";
        }
        result += "</ul>";
      } else {
        result += "<li val='0'>没有数据</li></ul>";
      }
      return result;
    }

    //得到 input 框的位置，来确定ul的绝对定位
    function getPosition() {
      var nickOffset = $mhInput.offset();
      var top = nickOffset.top + 35;
      var left = nickOffset.left-30;
      return {
        top: top.toFixed(2),
        left: left.toFixed(2)
      };
    }

   $(document).click(function() {
        $("#result").fadeOut();
        $("#result").remove();
    });


    // 鼠标选中 li，选中后消失
    $("#result li").live("click", function() {
      var spot_name = $(this).text(); //取li中的val
      $mhInput.val(''); //清空 input框
      $mhInput.val(spot_name);
      console.log(options);
      $("#"+options.hiddenValue).val($(this).attr('val'));
      $("#result").remove(); // ul 淡出
    });
  }
});
