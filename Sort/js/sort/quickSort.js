function quickSort(a){
	sort(a,0,a.length-1);
}

function sort(a,lo,hi){
	if(hi <= lo) return;//当归并到最小单元时
	var j = partition(a,lo,hi);//切分数组
	//排序切分后的两个子数组
	sort(a,lo,j-1);
	sort(a,j+1,hi);
}


//改进方案,当数组切分到足够小时,用插入排序来替代继续归并
function quickSort2(a){
	sort2(a,0,a.length-1);
}

var m_quick = 15;//M的取值与系统相关,建议值 5 ~ 15
function sort2(a,lo,hi){
	if(hi <= lo + m_quick) {
		insertSort(a,lo,hi);
        return;
	}
	var j = partition(a,lo,hi);//切分数组
	//排序切分后的两个子数组
	sort2(a,lo,j-1);
	sort2(a,j+1,hi);
}


//三向切分
function quickSort3(a){
	sort3(a,0,a.length-1);
}

function sort3(a,lo,hi){
	if(hi <= lo) return;
	var lt = lo, i = lo + 1, gt = hi;
	var temp = a[lo];
	while(i <= gt){
		var cmp = a[i] - temp;
		if(cmp < 0){
			exch(a,lt++,i++);
			push(a,lt-1,i-1);
		}else if(cmp > 0){
			exch(a,i,gt--);
			push(a,i,gt+1);
		}else{
			i++;
		}
	}
	sort(a,lo,lt - 1);
	sort(a,gt + 1,hi);
}


//快速排序的核心算法 -- 切分数组
/*
	具体做法是:
	以lo作为参考,将从lo+1到hi的元素切分为以lo为界,左边比lo小右边比lo大的数组

	首先选定a[lo] = temp
	从lo + 1开始查找第一个比temp大的数字
	从hi倒序查找比temp小的数组
	交换这两个数字

	把lo放到合适的位置
	
*/
function partition(a,lo,hi){
	var i = lo;
	var j = hi + 1;
	var temp = a[lo];
	while(true){
		while(a[++i] < temp)
			//从头开始寻找第一个比lo大的元素
			if(i == hi) break;
		while(temp < a[--j])
			//从尾开始寻找第一个比temp小的元素
			if(j == lo) break;
		//如果i,j碰头则说明已经切分完毕
		if(i >= j)break;
		//否则交换找到的这两个元素,交换他们的位置,继续寻找下一对
		exch(a,i,j);
		//记录交换后的数组位置信息
		push(a,i,j);
	}
	//切分完毕后交换temp与j的位置,此时j已经处于一个正确的位置不会再变动了
	//接下来递归调用它的子数组即可完成排序
	exch(a,lo,j);
	//记录数组排序状态
	push(a,lo,j);
	//返回切分点
	return j;
}


