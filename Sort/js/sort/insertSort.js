
function insertSort1(a){
    var n = a.length;
    for (var i = 1; i < n; i++) {
        for (var j = i; j > 0 && a[j] < a[j-1]; j--){
            exch(a,j,j-1);
            push(a,j,j-1);
        }
    }
}


function insertSort2(a){
    var n = a.length;
    for (var i = 1; i < n; i++) {
        var temp = a[i];
        var j = i;
        while(j > 0 && temp < a[j-1]) {
            a[j] = a[j-1];
            j--;
        }
        a[j] = temp;
        push(a,i,j);
    }
}

//对部分数据进行排序
function insertSort(a,lo,hi){
    for (var i = lo+1; i <= hi; i++) {
        var temp = a[i];
        var j = i;
        while(j > lo && temp < a[j-1]) {
            a[j] = a[j-1];
            j--;
        }
        a[j] = temp;
        push(a,i,j);
    }
}
