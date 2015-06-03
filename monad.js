/*
MONAD
 */

// a monad is a pointed functor
// i.e. with a .of method

// given a, it puts it into a container
// of :: a -> F a
// aka pointed functor
// ---- it lifts things into the monad

// why not use the constructor function?
// it is better, because it will put whatever we want into the container