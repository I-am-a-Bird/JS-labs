const reverse=function(arr){
    let ReverseArray=[];
    for (let i = arr.length-1; i > -1; i--) {
        ReverseArray.push(arr[i]);
    }
    console.log(ReverseArray);
}


const array=[1,2,3,4,5];
reverse(array);