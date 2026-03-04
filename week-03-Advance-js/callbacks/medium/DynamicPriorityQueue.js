// Problem Description – Priority Task Queue with Dynamic Concurrency

// You are required to implement a task queue that executes asynchronous tasks based on priority. 
// Higher-priority tasks should be executed before lower-priority ones. 
// The queue must enforce a concurrency limit, ensuring only a fixed number of tasks run at the same time, and allow this limit to be updated dynamically while the system is running.
class DynamicPriorityQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  add(task, priority = 0) {
    return new Promise((resolve, reject) => {
      this.queue.push({task, priority, resolve, reject});

      this.queue.sort((a, b) => b.priority - a.priority);

      this._next();
    })
  }

  setLimit(newLimit){
    this.concurrency = newLimit;
    this._next();
  }

  _next(){
    while(
      this.running < this.concurrency &&
      this.queue.length > 0
    ) {

      const item = this.queue.shift();
      this.running++

      Promise.resolve()
      .then(() => item.task())
      .then((result) => item.resolve(result))
      .catch((err) => item.reject(err))

      .finally(() => {
        this.running--
        this._next()
      })
    }
  }
}

module.exports = DynamicPriorityQueue;
