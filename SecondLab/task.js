function dateChecker(str){
    const checkDate = new RegExp("\\b(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\\d{4} ([01][0-9]|2[0-3]):[0-5][0-9]\\b");

    return checkDate.test(str);
}

console.log(dateChecker("01-09-2016 01:20")); 
console.log(dateChecker("01-09-2016 01;20")); 
console.log(dateChecker("01_09_2016 01:20"));
console.log(dateChecker("14-10-1066 23:00")); 
console.log(dateChecker("Tenth of January"));