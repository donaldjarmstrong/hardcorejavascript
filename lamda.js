// Lambda calculus is Turing complete

// Lambda consists of 3 things:

// VARIABLES: x, y, z
// TERMS applied to VARIABLES: t(x)
// TERMS applied to TERMS: t(s)

// abstraction (5 + 10 * 2) ---> (x + 10 * y), the processof extracting/removing scalar values to terms
// application

// variables x, y, z... could be scalar values or other lamba expressions

// application is represented as arguments

// this is represented as applying the function F over X
// basically, invoke F with X argument.
var f = function (x) {
	return x * x;
};
console.log(f(5));

// the expression f(5) is convenient in our language javascript
// more appropriate is simply f 5 (dropping the parans)


// the lamda x is applied over 5
// \x.x*x == x(5)

// the function above, X is the parameter and f(5) is the argument

// labmda calculus expresses all mathematical computation.  but does not express threading... that is process caluculs

// these are the labda syntax
// x
// \x.x
// ()

//CHURCH NUMERALS
// invented by lambda calc guy
// the number is represented as the number of times f is applied to argument x
// 0 = \fx.x
// 1 = \fx.f(x)
// 2 = \fx.f(f(x))
// 3 = \fx.f(f(f(x)))

// basic proof
// succ == \nfx. f(nfx)
// the n above represents the number 0,1,2,3
// why fx? it is consistent with the church defination that fx is returning a function

// examples:
// succ 1 = (\nfx.f(nfx))(\nfx
// essentially we are substituting n with teh \nfx
// ah haw!!! we have the n++ postfix operator

// plus == \mnfx.mf(nfx) = \mnfx.m(succ)
// basically applying successor to m, however many times

// mult == \mn.m(nf)
// pow ==


