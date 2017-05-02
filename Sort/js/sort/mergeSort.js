var aux;

function mergeSort(a){
	aux = Array(a.length);
	sort(a,0,a.length-1);
}

//归并算法-标准归并
function sort(a,lo,hi){
	if(hi <= lo)return;
	var mid = Math.floor(lo + (hi-lo)/2);
	sort(a,lo,mid);
	sort(a,mid+1,hi);
	merge(a,lo,mid,hi);
}

//归并排序二,化零为整
function mergeSort2(a){
	var n = a.length;
	aux = Array(a.length);
	for(var sz = 1; sz < n; sz = sz + sz){
		for(var lo = 0; lo < n - sz ; lo += sz +sz){
			merge(a,lo,lo+sz - 1 , getMin(lo+sz+sz -1,n-1))
		}
	}
}

function mergeSort3(a){
	aux = Array(a.length);
	sort2(a,0,a.length-1);
}

function sort2(a,lo,hi){
    //当数组小到只有1个元素时return
    if(hi - lo <= 15){
        insertSort(a,lo,hi);
        return;
    }
    var mid = Math.floor(lo + (hi-lo)/2);
    sort2(a,lo,mid);
    sort2(a,mid+1,hi);
    merge(a,lo,mid,hi);
}

function getMin(a,b){
	return a < b ? a : b;
}

function merge(a,lo,mid,hi){
	var i = lo,j = mid+1;
	for(var k = lo ; k <= hi ; k++){
		aux[k] = a[k];
	}
	for(var k = lo ; k <= hi ; k++){
		if(i > mid){
			a[k] = aux[j];
			push(a,k,j);
			j++;
		} 
		else if(j > hi){
			a[k] = aux[i];
			push(a,k,i);
			i++;
		}
		else if(aux[j] < aux[i]){
 			a[k] = aux[j];
 			push(a,k,j);
 			j++;
		}
		else{
			a[k] = aux[i];
			push(a,k,i);
			i++;
		} 
	}
}