//FIRST WAY TO EXPLAIN PROMISE WITH NORMAL CONST VARIABLE.
//RESOLVE DIRECTLY LINKED WITH THEN FUNVTION.
const PromiseOne = new Promise(function (resolve, reject) {
    setTimeout(function () {
        // DO AN ASYNS TASK
        // DB CALLS,CRYPTOCURRENCY,NETWORKING
        console.log("Async task is completed");
        resolve()
    }, 1000)
})

PromiseOne.then(function () {
    console.log("consumption completed");
})


//SECOND WAY TO EXPLAIN PROMISE WITH NO CONST VARIABLE.
//RESOLVE DIRECTLY LINKED WITH THEN FUNVTION.
new Promise(function (resolve, reject) {
    setTimeout(function () {
        console.log("Async task 2 is completed");
        resolve()
    }, 1000)

}).then(function () {
    console.log("Async task 2 is resolved");
})


//THIRD WAY TO EXPLAIN THE PROMISES WITH PARAMETERS.
//RESOLVE DIRECTLY LINKED WITH THEN FUNVTION.
const PromiseThree = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve({ username: "Mintu", email: "km4812998@gmail.com" })
    }, 1000)
})
PromiseThree.then(function (user) {
    console.log(user);
})


//FOURTH  WAY TO EXPLAIN PROMISES WITH MULTIPLE CHAINING "THEN AND CATCH" FUNCTION.
//(RESOLVE IS DIRECTLY LINKED WITH THEN) AND THE (REJECT DIRECTLY LINKED WITH CATCH) FUNCTION.
//FINALLY IS USED TO UNDERSTAND THAT WE REACHED IN OUR LAST PROCESS TO COMPLETE THE PROMISE.  
const PromiseFour = new Promise(function (resolve, reject) {
    setTimeout(function () {
        let error = true;
        if (!error) {
            resolve({ username: 'Mintu', password: '1013' })
        } else {
            reject('ERROR:SOMETIHNG WENT WRONG')
        }
    }, 1000)
})
PromiseFour
    .then(function (user) {
        console.log(user);
        return user.username;
    })
    .then(function (username) {
        console.log(username);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        console.log('THE PROMISE IS EITHER RESOLVED OR REJECTED');
    })

//FIFTH WAY TO EXPLAINN THE PROMMISES 

const PromiseFive = new Promise(function (resolve, reject) {
    setTimeout(function () {
        let error = true;
        if (!error) {
            resolve({ username: 'KingsMan', password: '2340' })
        } else {
            reject('ERROR:SOMETHING WENT WRONG')
        }
    }, 1000)
})

//CALL BACK USING ASYNC FUNCTION IN THIS FUNCTION WE USE TRY AND CATCH PROPERTY TO CALL FUNCTION
async function consumePromiseFive() {
    try {
        const response = await PromiseFive
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}
consumePromiseFive()

//NORMAL FETCH COMMAND (REMEMBER FETCH COMMAND ALWAYS BE IN THE AWAIT STATE )
//AWAIT  STATE MEANS THAT THOSE NETWORKING WHO TAKES MORE THAN ENOUGH TIME TO RUN THEN WE USE AWAIT FUNCTION AND STORE IT IN THE VARIABLE, AWAIT FUNCTION DO THER WORK WITHOUT DISTURBING THE ANOTHER FUNCTION AND RUNS SMOOTHLY... 
async function AllUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        console.log(data);

    } catch (error) {
        console.log("ERROR:", error);
    }
}
AllUsers()


//THE SECOND WAY TO DESCRIBE THE ABOVE PROGRAM

fetch('https://jsonplaceholder.typicode.com/users')
.then((response)=>{
    return response.json()
})
.then((data)=>{
    console.log(data)
})
