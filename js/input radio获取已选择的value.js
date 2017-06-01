//获取照片尺寸
  var getSize = function(){
    var size = ''; 
    var sizeNum = $('input[name="size"]');
    for(var i=0;i<sizeNum.length;i++){
      if(sizeNum[i].checked){
        size = sizeNum[i].value;
      }
    }
    return size;
  }


  // 或者
  $('input[name="size"]:checked').val();