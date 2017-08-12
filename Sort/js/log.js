const base_url = 'http://localhost:8080';
$(document).ready(function(){
    function accessLog()
    {
        $.ajax({
            method: "POST",
            async: false,
            url: base_url + "/log/v1/access",
            data:{
                module_name : 'algorithm',
                page_name : $("input[name=page_name]").val(),
                share_msg : $("input[name=share_msg]").val(),
                other_msg : $("input[name=other_msg]").val(),
            },
            dataType: "jsonp",
            //jsonp: true,
            jsonpCallback:"log",
            success: function(data){
                alert(data.name);
            },
            error: function(){
                alert('fail');
            }
        });
    }
    accessLog();
});
