const calcMatrix=function(arr,arr2){
    let result=[];
    for (let i = 0; i < arr.length; i++) {
        let row=[];
        for (let j = 0; j < arr[i].length; j++) {
            
            row.push(arr[i][j]+arr2[i][j]);
        }
        result.push(row);
    }
    console.log(result);
}

let Firstmatrix=[[1,2],[1,2]];
let Secondmatrix=[[2,3],[2,3]];
calcMatrix(Firstmatrix,Secondmatrix);