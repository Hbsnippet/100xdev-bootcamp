// const arr = [
//   { user: "A", amount: 100 },
//   { user: "B", amount: 200 },
//   { user: "A", amount: 50 }
// ];

// function bund () {
//     let result = {};

//     for(let key of arr){

//         let user = key.user;
//         let amt = key.amount;

//         if(result[user]){
//             result[user] += amt;
//         } else {
//             result[user] = amt;
//         }
//     }

//     return result;
// }

// console.log(bund(arr));




// const api = [
//                 { id: 1, name: "Alice" },
//                 { id: 2, name: "Bob" }
//             ];


// function bund () {
//     let result = {};

//     for(let key of api){

//             let id = key.id;
//             let name = key.name;

//             result[id] = name

//     }

//     return result
// }

// console.log(bund(api));


// const obj = { a: 0, b: null, c: "hello", d: undefined, e: 5 };

// function bund () {
//     const result = {};

//     for(let key in obj){
//         let val = obj[key];

//         if(val){
//             result[key] = val 
//         }
//     }

//     return result
// }

// console.log(bund(obj));


// const roles={ admin:["read","write"], user:["read"], staff: ["write"]}
// const checkRole="user"
// const action="write"

// function bund () {

//     let permission = roles[checkRole];

//     if(permission && permission.includes(action)){
//         return true;
//     } else {
//         return false
//     }
// }

// console.log(bund(roles, checkRole, action));




// const arr = [
//   { id: 1, category: "electronics", price: 100 },
//   { id: 2, category: "clothes", price: 50 },
//   { id: 3, category: "electronics", price: 200 }
// ]


// function bund () {
//     const result = {};

//     for(let key of arr){

//         let cat = key.category;

//         let amt = key.price;

//         if(result[cat]){
//             result[cat] += amt;
//         } else {
//             result[cat] = amt
//         }
//     }

//     return result;
// }

// console.log(bund(arr));



// const arr = [
//   { id: 1, name: "A" },
//   { id: 2, name: "B" },
//   { id: 1, name: "A" }
// ];


// function bund () {
//     const result = {};

//     for(let item of arr){
//         result[item.id] = item;

//     }

//     return Object.values(result);
// }

// console.log(bund(arr));




// const obj = { a: 1, b: 2, c: 3, d: 4 };
// const size = 2;

// function bund () {
//     const result = [];
//     const entries = Object.entries(obj);

//     for(let i = 0; i < entries.length; i+=size){

//         let chunk = entries.slice(i, i + size)
//         result.push(chunk)
//     }

//     return result;
// }

// console.log(bund(obj, size));


// const obj = { a: "apple", b: "banana", c: "kiwi" };


// function bund () {
//     let result = "";

//     for(let key in obj){
        
//         let val = obj[key];

//         if(val.length > result.length){
//             result = val
//         }
//     }

//     return result
// }

// console.log(bund(obj));






// const obj = {
//   en: { hello: "Hello", bye: "Goodbye" },
//   fr: { hello: "Bonjour", bye: "Au revoir" },
//   es: { hello: "Hola" }
// };


// function bund () {
//     let result = {};

//     for(let lang in obj){
//         for(let greet in obj[lang]){

//             if(!result[greet]){
//                 result[greet] = {};
//             }

//             result[greet][lang] = obj[lang][greet]
//         }
//     }

//     return result;

// }

// console.log(bund(obj));







// const arr = [
//   { id: 1, category: "fruit" },
//   { id: 2, category: "veggie" },
//   { id: 3, category: "fruit" }
//     ];

// function bund () {

//     const result = {};

//     for(let key of arr){
//         let cat = key.category;

//         let id = key.id;

//         if(!result[cat]){
//             result[cat] = [];
//         }

//         result[cat].push(id)
//     }

//     return result
// }

// console.log(bund(arr));




// const obj = { a: { b: { c: 1, d: 2 } } }
// const remove = "c";

// function bund (obj, remove) {

//     for(let key in obj){
//         if(key == remove){
//             delete obj[key];
//         } 
//         else if (typeof obj[key] == 'object'){
//             bund(obj[key] , remove)
//         }
//     }
//     return obj

// }


// console.log(bund(obj , remove));





// const obj1 = { a: { x: 1, y: 2 } };
// const obj2 = { a: { x: 1, y: 2 } };

// function bund (obj1, obj2) {

//     if(obj1 === obj2) {
//         return true;
//     };

//     let key1 = Object.keys(obj1);
//     let key2 = Object.keys(obj2);

//     if(key1.length !== key2.length) return false;

//     for(let key of key1){

//         if(!key2.includes(key)) return false
//     }

//     return true;

// }

// console.log(bund(obj1, obj2));





// const obj = { 
//     fruits: ["apple","apple","banana"],
//     drinks: ["apple","tea"] 
// };

// function bund () {

//     let result = "";
//     let count = {};
//     let max = 0;

//     for(let key in obj){
//         for(let words of obj[key]){

//             count[words]  = (count[words] || 0) + 1;

//             if(count[words] > max){
//                 max = count[words];
//                 result = words
//             }
//         }
//     }
//     return result
// }

// console.log(bund(obj));



// const input = { a: [1,2,3], b: [2,3,4], c: [3,4,5] }

// function bund () {
    
//     let array = Object.values(input);

//     let result = array[0];

//     for(let i = 0; i < array.length; i++){
//         result = result.filter(num => array[i].includes(num))
//     }

//     return result;
// }

// console.log(bund(input));





// const Input1 = { a: { x: 1, y: 2 } };
// const Input2 = { a: { y: 3, z: 4 } };

// function deepMerge (Input1, Input2) {
//     let result = {...Input1};

//     for(let key in Input2){

//         if(Input2[key] instanceof Object && key in Input1){
//             result[key] = deepMerge(Input1[key], Input2[key])
//         } else {

//             result[key] = Input2[key]
//         }
//     }

//     return result
// }

// console.log(deepMerge(Input1, Input2));



// const obj = { user: { profile: { name: "Alice", age: 25 } } };

// const {user: {profile: {name: bhadwa, age: moot}}} = obj;

// console.log(bhadwa, moot);




// const obj = { a: 10, b: 50, c: 30, d: 40 };
// const N = 2;

// const result = Object.entries(obj)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, N)
//     .map(x => x[0])

//     console.log(result);


// const arr = [
//   { name: "Alice", age: 30 },
//   { name: "Bob", age: 25 },
//   { name: "Alice", age: 22 }
// ]

// const sorted = arr.sort((a, b) => {

//     if(a.name !== b.name) {
//         if(a.name < b.name){
//             return -1;
//         } else return 1;
//     }

//     return a.age - b.age
// })

// console.log(sorted);


// const expected = ["a","b","c"]
// const actual= ["b","c","d"]


// function bund(arr1, arr2) {
//     let missing = [];
//     let extra = [];

//     for(let i = 0; i < arr1.length; i++){
//         let found = false;
//         for(let j = 0; j < arr2.length; j++){

//             if(arr1[i] == arr2[j]){
//                 found = true;
//                 break;
//             }
//         }

//         if(!found){
//             missing.push(arr1[i])
//         }
//     }

//     for(let i= 0; i < arr2.length; i++){
//         let found = false;
//         for(let j = 0; j < arr1.length; j++){
//             if(arr2[i] == arr1[j]){
//                 found = true;
//                 break
//             }
//         }

//         if(!found){
//             extra.push(arr2[i])
//         }
//     }

//     return{missing, extra}
// }
// console.log(bund(expected, actual));



// const obj1 = { a: 10, b: 20 }
// const obj2 = { a: 5, c: 15 }

// const result = {...obj1, ...obj2}

// console.log(result);






