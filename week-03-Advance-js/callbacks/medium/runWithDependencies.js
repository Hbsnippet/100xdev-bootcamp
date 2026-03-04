// Problem Description – Task Execution with Dependencies

// You are given a set of asynchronous tasks where some tasks depend on the completion of others. 
// Your goal is to execute each task only after all of its dependencies have been successfully fulfilled. 
// The solution should ensure correct execution order and handle dependency relationships properly
async function runWithDependencies(tasks) {
    const completed = new Set();
    const results = {};
    const total = Object.keys(tasks).length;

    while(completed.size < total){

        const ready = Object.entries(tasks).filter(([name, task]) => 
            !completed.has(name) && (task.deps || task.dependencies || []).every(dep => completed.has(dep))
        )

        if(ready.length === 0){
            throw new Error("Circular Dependency Detected")
        }


        await Promise.all(
            ready.map(async ([name, task]) => {
                const result = await task.run();
                results[name] = result;
                completed.add(name)
            })
        )
    }

    return results
}

module.exports = runWithDependencies;
