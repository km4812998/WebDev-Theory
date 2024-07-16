// IMMEDIATELY INVOKED FUNCTION EXPRESSIONS(IIFE)
// (function add(){ })=() IIFE ko is symbol se likhte hai
// global scope ke pollution ka problem ke karan hmlog IIFE use krte hai pollution ko hatane ke liye 
// Immediately Invoked Function Expressions (IIFE)


(function chai(){
    // named IIFE
    console.log(`DB CONNECTED`);
})(); 
// here semicolon means line ends,isko hmlog explicitely use kr rhe hai ek code ko run aur end krne ke liye

( (name) => {
    console.log(`DB CONNECTED TWO ${name}`);
} )('hitesh')