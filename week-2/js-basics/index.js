// const object = { food: [10, 20, 30], travel: [5, 15], bills: [40, 60] };


// function sumValue (object) {
//     let result = {};

//     for(let key in object){

//         let currentArray = object[key];
//         let sum = 0;

//         for(let i = 0; i < currentArray.length; i++){
//             sum = sum + currentArray[i]
//         }

//         result[key] = sum;
//     }

//     return result;
// }

// console.log(sumValue(object));


// const arr = ["apple", "banana", "apple", "orange", "banana", "apple"];

// function wordCount () {
//     const arr1 = {};

//     for(let i = 0; i < arr.length; i++){
//         let currentArray = arr[i];

//         if(arr1[currentArray]){
//             arr1[currentArray] += 1;
//         } else {
//             arr1[currentArray] = 1
//         }

//     }

//     return arr1;
// }

// console.log(wordCount(arr))

// const swamp = { a: "x", b: "y", c: "z" };

// function swapped () {
//     let swampped = {};

//     for(let key in swamp) {

//         let value = swamp[key];

//         swampped[value] = key;
//     }

//     return swampped;
// }

// console.log(swapped(swamp));


// const values = { a: 10, b: 50, c: 20 };

// function finder () {
//     let greater = null;

//     for(let key in values){
//         let value = values[key];

//         if(greater == null || value > values[greater]){
//             greater = key;
//         }
//     }

//     return greater;
// }

// console.log(finder(values));

// const arr = { fruits: ["apple", "banana"], veggies: ["carrot", "pea"] };

// const flatten = () => {

//  let result = [];

//  for(let key in arr) {
    
//     let value = arr[key];

//     result = result.concat(value);
//  }

//  return result
// }

// console.log(flatten(arr));


// const obj = [
//                 { name: "A", city: "Delhi" },
//                 { name: "B", city: "Mumbai" },
//                 { name: "C", city: "Delhi" }
//             ];

//     function jitender () {
//         let obj1 = {};

//         for(let key of obj) {
//             let city = key["city"];
//             let name = key["name"];

//             if(!obj1[city]){
//                 obj1[city] = [];
//             }

//             obj1[city].push(name)
//         }

//         return obj1
//     }

//     console.log(jitender(obj));


// const bg = { a: 20, b: 60, c: 40, d: 90 }

// function bomb () {
//     let result = {};

//     for (let key in bg){
//         let value = bg[key];

//         if(value > 50){
//             result[key] = value;
//         }

//     }

//     return result;
// }

// console.log(bomb(bg));



// const obj = { A: [80, 90], B: [70, 75, 85] };
 
// function highest () {
//     let topStudent = null;

//     let highestAvg = 0;

//     for(let key in obj) {

//         let marks = obj[key];

//         let total= 0;
//         for(let mark of marks){
//             total += mark;
//         }

//         let avg = total / marks.length;

//         if(avg > highestAvg){
//             highestAvg = avg;
//             topStudent = key;
//         }
//     }

//     return topStudent;
// }

// console.log(highest(obj));


// const value = { x: [1,2,3], y: [2,3,4], z: [4,5] };

// function uniqlo () {
//     let result = [];

//     for(let key in value){
//         let val = value[key];

//         for(let num of val){
//             if(!result.includes(num)){
//                 result.push(num);
//             }
//         }
//     }

//     return result;
// }

// console.log(uniqlo(value));


// const obj = { name: "Rahul", age: 23, city: "Noida" }
// const bund =  ["name","city"]

// function bundel () {
//     let result = {};

//     for(let item of bund){
//         if(obj[item] !== undefined){
//             result[item] = obj[item];
//         }
//     }

//     return result;
// }

// console.log(bundel(obj, bund));




// const obj = { A: [80, 90], B: [70, 75, 85] };

// function findTopper () {
//     let topperStudent = null;
//     let max = 0;

//     for(let student in obj){
//         let marks = obj[student];

//         let sum = 0;
//         for(let m of marks){
//             sum += m;
//         }

//         let avg = sum/marks.length;

//         if(avg > max){
//             max = avg;
//             topperStudent = student;
//         }
//     }

//     return topperStudent;
// }

// console.log(findTopper(obj));


// const ibj = { a: 3, b: 1, c: 2 };

// function ascending () {
//     const arr = Object.entries(ibj);

//     arr.sort((a, b) => {
//        return a[1] - b[1]
//     })

//     return arr;
// }

// console.log(ascending(ibj));


// const obj = { a: 1, b: 2, c: 3 };

// function count () {
//     let result = 0;

//     for(let key in obj){
//          result += key.length
//     }
//     return result;
// }   

// console.log(count(obj));


// const obj = { name: "alice", city: "delhi" };

// function capital () {
//     let result = {};

//     for(let name in obj){
//         let val = obj[name];

//         let big = val.charAt(0).toUpperCase() + val.slice(1);

//         result[name] = big;
//     }

//     return result
// }

// console.log(capital(obj));



// const obj = { name: "Alice", age: 25 };


// function stringy () {
//     let format = "";

//     for(let key in obj){
//         let val = obj[key];

//         if(format.length > 0) {
//             format = format + "&"
//         }

//         format += key + '=' + val;
//     }

//     return format
// }

// console.log(stringy(obj));


// const val = [1,2,3,4,5,6]

// function evenOdd () {
//     let result = {even : 0, odd : 0}

//     for(let i = 0; i < val.length; i++){

//         if(val[i] % 2 === 0){
//             result['even'] ++
//         } else {
//             result['odd']++
//         }
//     }

//     return result;
// }


// console.log(evenOdd(val));








// const obj1 = { a: 1, b: 2, c: 3 };
// const obj2 = { b: 4, c: 5, d: 6 };

// function check () {
//     let result = [];

//     for(let key in obj1){

//         if(obj2[key] !== undefined){
//             result.push(key)
//         }
//     }

//     return result
// }

// console.log(check(obj1, obj2));



// const arr = [{ id: 1, name: "A" }, { id: 2, name: "B" }];

// function bund() {
//     let result = {};

//     for(let i = 0; i < arr.length; i ++){
//         let currentObj = arr[i];

//         let key = currentObj.id;

//         result[key] = currentObj;
//     }

//     return result
// }

// console.log(bund(arr));



// const obj = { a: 1, b: "hello", c: 3 };

// function bund () {
 

//     for(let key in obj){
        

//         let val = obj[key];

//         if(typeof val === "string"){
//             return false
//         }
//     }
// }


// console.log(bund(obj));
