/***
 * version:20150923
 ***/
//前提引入jquery
$(function() {
  $.fn.spotSuggest = function(options) {
    var defaults = {
      url: "",			//必填项
      id: "id",
      name: "name",
	  hiddenValue:'',
	  result:'',		//必填项
	  input:''			//必填项
    };
    var options 	= $.extend(defaults, options);
    var $mhInput 	= $("#"+options.input); 		//当前的input框
    var domResult 	= options.result;				//input的外层DIV
    var domData		= options.domData;				//接收后台数据的UL DOM，注意前台的样式定义
    var domValue	= options.hiddenValue;			//input隐藏值
    $mhInput.keyup(function() {
      var name = $.trim($mhInput.val()); 			//得到input框中的值
      if(name == ''){
        clearSpotId();
        return true;
      }
      var url = options.url + "&cache="+Math.random()+"&name=";
      $("#"+domData).remove(); //清空ul
      $.ajax({
        dataType: 'json',
        type: "GET",
        url: url + name,
        success: function(msg) {
         var result = showResult(msg);
         $("#"+domData).remove();//清空前一次的结果 
         $("."+domResult).after(result); //在div后显示提示结果
        }
      });
    });

    //清空
    function clearSpotId(){
      $("#"+domValue).val('');
    }

    // 以 li 形式装载提示结果
    function showResult(data) { 
      var offset = getPosition();
      var name = options.name;
      var id = options.id;
      var result = "<ul id='"+domData+"' style=top:" + offset.top+"px;left:"+offset.left+"px>";
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
        $("#"+domData).fadeOut();
        $("#"+domData).remove();
    });


    //鼠标选中 li，选中后消失
   //die掉li的委托，不然会一直积累全局$mhInput
   $("#"+domData+" li").die().live("click", function() {
      var spot_name = $(this).text(); //取li中的val
      $mhInput.val(''); //清空 input框
      $mhInput.val(spot_name);
      $("#"+domValue).val($(this).attr('val'));
      $("#"+domData).remove(); // ul 淡出
    });
  }
});
