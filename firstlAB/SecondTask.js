const HightAndLow=function(numbers){
    const RegEx= /-?\d+/g;
    const num=numbers.match(RegEx);
    let biggest=num[0];
    let smallest=num[0];
    for (let i = 0; i < num.length; i++) {
        if(biggest<num[i]) biggest=num[i];
        if(smallest>num[i]) smallest=num[i];
    }
    console.log(num);
    console.log("biggest is:",biggest);
    console.log("smallest is:",smallest);
}

const str= "1 2 -3 4 5";
HightAndLow(str);