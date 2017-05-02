
//一些需要经常访问的dom,先在这里查询出来,避免多次查找
//从上至下依次为
function setProgress(){//进度更新时调用
	var progress = Math.round(state.index*100/(state.steps.length - 1));
	$("#progress").attr("aria-valuenow",progress);
	$("#progress").css("width",progress+"%");
	$("#progressDesc").text('进度'+progress+'%');
}

//修改提示框文本
function changeAlert(text){
	$("#alert").text(text);
}

var myChart = echarts.init(document.getElementById('main'));
myChart.setOption(option);
//渲染柱状图
function init(){
	var obj = state.steps[state.index];
	myChart.setOption({      
        series: [{
            itemStyle:{
                normal:{
                    color:function(params) {
                        if(state.isFinished == true){
                            return '#009100';
                        }
                        if(params.dataIndex == obj.i || params.dataIndex == obj.j ){
                            return '#C1232B';
                        }
                        return '#3398DB';    
                    },
                }
            },
            data: obj.step
        }]
    });
	setProgress()
}

reset();
//重置state状态

//采用新的动画生成方式
//state中包含一个二维数组,第二维代表当前进行到某一步
function reset(){
	changeAlert("reset...")
	state.isFinished = false;//表示排序动画是否执行完毕
	state.steps = new Array();
	state.isReady = false;//代表是否已经完成预排序
	state.index = 0;
	push(brakeRange(len),-1,-1);//重置时,将初始状态作为第一个状态
	init();
	changeAlert("reset finished...")
	$(".run").addClass('disabled');
	setProgress();
}

//预排序,每次重置数组后执行
function beforeSort(){
	getSortState(state.steps[0].step,sortType);
	state.isReady = true;
	changeAlert("sort steps isReady...");
	$(".run").removeClass('disabled');
}

//上一步
function last(){
	state.isFinished = false;
    state.index--;
    init();
}

//下一步
function next(){
    state.index++;
	console.log(state.steps[state.index]);
    init();
    if(isFinished()){
        finish();
        return;
    };
}

//自己动
function auto(){
	changeAlert("auto sort...");
    state.autoId = setInterval(function(){
    	next();
    },time)  
}

//判断是否结束
function isFinished(){
	if(state.index == state.steps.length - 1){
		return true;
	}
	return false;
}

//结束时执行操作
function finish(){
	changeAlert("sort finished...")
	state.isFinished = true;
	stop()
	init();
}

//停止
function stop(){
    clearInterval(state.autoId);
}

//自己动(定时调用next())

//初始化数组(只负责页面的初始化,排序预加载在各自的排序方法js内部实现)

//排序过程中向arr中添加状态数据
function push(a,i,j){
	state.steps.push(createState(a,i,j));
}

//获取steps中的特定下标的数组
function get(i){
	state.index = i;
	return state.steps[i];
}

//预加载时生成数组中的元素的方法
function createState(a,i,j){
	//obj代表了一个排序过程中的瞬时状态
	var obj = new Object();
	obj.step = a.slice(0)  ;//数组状态,这里要复制数组而不是引用数组
	obj.i = i;
	obj.j = j; //ij代表移动或相互比较的元素
	return obj;
}

var sortType = 11;
function changeSort(type){
	sortType = type;
	$('.sort').removeClass('active');
	$(event.target).parents('.sort').addClass('active');
	if(sortType == 11)
		setTitle('选择排序,每次选择最小的元素放到前面');
	else if(sortType == 21)
		setTitle('插入排序 - 交换法,每次将较小的元素与当前元素交换位置');
	else if(sortType == 22)
		setTitle('插入排序 - 位移元素,每次将较大的元素右移一位,最后再将最小的元素移到最左边');
	else if(sortType == 31)
		setTitle('希尔排序 - 插入排序的优化版本,将数组分成增量递减的数组先行排序,使数组变成接近有序状态');
	else if(sortType == 41)
		setTitle('归并排序 - 标准归并,将数组逐步分割为最小单元');
	else if(sortType == 42)
		setTitle('归并排序 - 逆向归并,从最小单元开始逐步将相邻数组归并');
	else if(sortType == 43)
		setTitle('归并排序 - 归并+插入,将小于一定数量的数组用小规模数组效率较高的基础排序');
	else if(sortType == 51)
		setTitle('快速排序 - 将递归的的每个子数组的第一个元素作为参照将较小的元素放在左边较大的放在右边');
	else if(sortType == 52)
		setTitle('小数组插入 - 改进方案,将切分到一定长度的小数组用插入排序法排序');
	else if(sortType == 53)
		setTitle('三向切分 - 从两边向中间查找,将左边比temp大的元素和右边比temp小的元素都与temp对换位置,处理相同数据较多的数组时效率较高');
	reset();
	reset();
}

//选择不同的排序方法
function getSortState(a,type){
	if(type == 11)selectSort(a);
	else if(type == 21)insertSort1(a);
	else if(type == 22)insertSort2(a);
	else if(type == 31)shellSort(a);
	else if(type == 41)mergeSort(a);
	else if(type == 42)mergeSort2(a);
	else if(type == 43)mergeSort3(a);
	else if(type == 51)quickSort(a);
	else if(type == 52)quickSort2(a);
	else if(type == 53)quickSort3(a);
}

function setTitle(titleText){
	myChart.setOption({
		title:{
			text : titleText
		}
	})
}



