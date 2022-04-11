
avoid throwing away temporary objects

## Lvalues and Rvalues

lvalues are things you can grab there adresses and use long time. for example int x{3};
rvalues are transient or temporary and are destoryed when no longer needed. for example z= x+y then (x+y) is an rvalue because it is temporary as as soon as it is copied to z it is destoryed and we can't get its address. some would go for z = 45; you can not do &45 so it is an rvalue.

ravlue can be split up into 2 futher, pure right which are Literal: 42, true, nullptr, arith. Ausdruck: a + b, a < b, or function calls: str.substr(1, 2)
and xValue. Funktionsaufruf mit Rückgabetype rvalue Referenz Array-oder Attributzugriff bei einem rvalue
Gl values are l and x values

![LRValues](/img/programming/LRValues.png)

rvlaue as parameter with rvalue references && to extend its life.

move constructors and assignment
std::move does not actually do any moving it just makes it a rvalue so then teh move constructor is called instead of copy when swapping.
