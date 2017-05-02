function shellSort(a){
    var n = a.length;
    var darr = Array(1,5,19,41,109,209,505,929,2161,3905,8929,16001,36289,64769,146305,260609);
    for(var p=darr.length - 1; p >= 0;p--){
        var d = darr[p];
        if(d > n)continue;
        for (var i = d; i < n; i += d) {
            var temp = a[i];
            var j = i;
            while(j > 0 && temp < a[j-d]) {
                a[j] = a[j-d];
                j -= d;
            }
            a[j] = temp;
            push(a,i,j);
        }
    }
}