var base_url = 'http://www.huhuixin.com:10000';
$(document).ready(function(){
    function accessLog()
    {
        $.ajax({
            method: "GET",
            async: false,
            url: base_url + "/log/v1/access",
            data:{
                module_name : 'algorithm',
                page_name : $("input[name=page_name]").val(),
                share_msg : $("input[name=share_msg]").val(),
                other_msg : $("input[name=other_msg]").val(),
                hardware : navigator.userAgent,
                address : remote_ip_info['province'] + remote_ip_info['city']
            },
            dataType: "jsonp",
            //jsonp: callback,
            jsonpCallback:"log",
            success: function(data){
                console.log(data);
            },
            error: function(){
                console.log('log_fail');
            }
        });
    }
    accessLog();
});


