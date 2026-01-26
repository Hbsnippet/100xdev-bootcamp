// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```


const fs = require('fs')

fs.readFile('./100xdev-bootcamp/week-2/01-async-js/medium/myfile.txt', 'utf8', (err, data) => {
    if(data){
       const bund = data.split('  ').join(' ')
       console.log(bund);
    }
    if(err){
        console.log("error reading the file:", err);
        return;
    }
})