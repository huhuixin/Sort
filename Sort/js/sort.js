//排序工具
//想要达到排序算法能够接着上一次的执行步骤继续执行,需要将循环上一次执行的状态记录下来,如下:


var len = 100;
//自动运行的速度
var time = 100;
var state = new Object();


function changeLen(newLen){
    len = newLen;
    $("#showLength").text("length : "+len);
    reset();
}

function changeTime(newTime){
    time = newTime;
    $("#showTime").text("time : " + newTime);
}

//生成一定长度的数组
function range(len){
	var arr = new Array(len);
	for(var i = 0; i < len ; i++){
		arr[i] = i;
	}
	return arr;
}

//生成随机整数0-len之间,包含0但不包含len
function getRandomInt(len){
	return Math.floor(Math.random()*len)
}

//交换数组中两个元素的位置
function exch(arr,m,n){
	var temp = arr[m];
	arr[m] = arr[n];
	arr[n] = temp;
}

//不含0
function brakeRange(len){
	var arr = new Array(len);
	for(var i = 0; i < len ; ){
		arr[i] = ++i;
	}
	brakeArr(arr);
	return arr;
}

//打乱数组
function brakeArr(arr){
	var len = arr.length;
	for(var i = 0; i < len ;i++){
		var index = getRandomInt(len);
		//交换 i和index 的位置
		exch(arr,i,index);
	}
}

function show(arr){
	alert(arr);
	// var str = "数组内容:";
	// for(i in arr){
	// 	str += i+",";
	// }
	// alert(str.substring(0,str.length-1));
}

//休眠的假象
function sleep(numberMillis) { 
    $.getJSON('http://localhost/Test/Sleep',{'ms':numberMillis},function(data){
        console.log(sleep);
    })
}

var option = {
    title:{
        text:'选择排序,每次选择最小的元素放到前面',
        textStyle : {
            color: ['#888888'],
            fontWeight : 'normal',
            fontSize:16
        },
    },
    color: ['#3398DB'],
    tooltip : {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            data : [],//index
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'index',
            //type:'line',
            type:'bar',
            barWidth: '60%',
            data:[]//value
        }
    ]
};

