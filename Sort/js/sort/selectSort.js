function selectSort(a){
	var n = a.length;
	for(var i = 0; i < n ; i++){
		var min = i;
		for(var j = i + 1; j < n ; j++){
			if(a[j] < a[min])min = j;
		}
		exch(a,i,min);
		push(a,i,min);
	}
}

