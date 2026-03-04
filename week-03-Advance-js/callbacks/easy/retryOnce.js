// Problem Description – Retry Async Function Once

// You are given an asynchronous function fn. Your task is to return a new function that calls fn and retries it once if the first attempt fails. 
// If the second attempt also fails, the error should be properly propagated. 
// This problem tests error handling, retry logic, and correct use of async/await with Promises.

function retryOnce(fn) {
   return async function (...arg) {
        try {
            return await fn(...arg)
        } catch (error) {
            return await fn(...arg)
        }
    };
}

module.exports = retryOnce;
