---
title: Essentials
description: TO BE DONEEEEE
tags: [cpp]
---

## Variables and data types

In C++ you pretty much have the same data types as in C and they work the same as C++ in an extension of C. If you want specific sized data types you can just as in C include from the standard library `cstdint.h`.

### Custom types

In C++ you can create your own types using typedef just as in C but you can also use the `using` keyword. Later you can also use structures and classes.

```cpp
typedef int int32_t;// in <cstdint>
typedef unsigned long long uint64_t;// in <cstdint>
using INT32 = int;
using UINT64 = unsigned long long;
```

### Placeholder type specifiers

The `auto` keyword specifies that the type of the variable that is being declared will be automatically deducted from its initializer. In the case of functions, if their return type is auto then that will be evaluated by return type expression at runtime.

The decltype function/operator lets you extract the type of the passed expression.

```cpp
#include <iostream>
#include <string>
using namespace std;
auto foo() { return "foo"; }
int main()
{
    auto x = 7;
    auto f = foo();
    decltype(69) y = x;
    // decltype(69) z = f; doesn't work
    cout << x << endl;
    cout << y << endl;
    cout << f << endl;

    return 0;
}
```

### Constant values

The `const` keyword can be used just like in C and makes a variable read only same goes for the `define` preprocessor directive. New in C++ however is the `constexpr` keyword. The constant expression allows us to create expressions and functions that are evaluated at compile time to speed things up.

```cpp
#include <iostream>
using namespace std;
constexpr int product(int x, int y){return (x * y);}
constexpr size_t length = 100;

int main()
{
    constexpr int x = product(10, 20);
    cout << x << endl << length << endl;
    return 0;
}
```

## Namespaces

### Scope operator and using

::

## Class, Struct, Union

### Constructors

primitve data types dont have cosntructors so need to be initialized manually. what does explicit do?

### Destructor

### Copy elision

copy constructors???

### Anonymous/temporary objects

These objects have no name and are thrown away after use.

```cpp
#include <iostream>
using namespace std;
class Point {
    double m_x, m_y;
public:
    Point(double x = 0, double y = 0)
        : m_x(x), m_y(y)
    {}

    void print() {
        cout << "(" << m_x << "/" << m_y << ")" << endl;
    }
};

int main()
{
    Point(1, 3).print();
    return 0;
}
```

### Initializer lists

as constructors, function arguemtns, Range for loop

### Struct memory usage

alignement and padding???
bitfields???

##

## Binding of values

??? not sure it is called this jsut splitting no?

## Type conversion

normal casts, static_cast, dynamic_cast, const_cast, reinterpret_cast

## New and delete

Just as in C, C++ supports dynamic allocation and deallocation of objects using the new and delete operators. These operators allocate memory for objects from a pool called the heap which make them equivalent to malloc and free system calls in C.

## RAII - Resource Acquisition Is Initialization

 RAII is a programming idiom with its main goal being to ensure that resource acquisition occurs at the same time that the object is initialized, so that all resources for the object are created and made ready in one line of code. In practical terms, the main principle of RAII is to give ownership of any heap-allocated resource—for example, dynamically-allocated memory or system object handles—to a stack-allocated object whose destructor contains the code to delete or free the resource and also any associated cleanup code.

## Raw pointers

Raw pointers are pointers just like in C. In modern C++, raw pointers are only used in small code blocks of limited scope, loops, or helper functions where performance is critical and there is no chance of confusion about ownership otherwise you should pass the pointer to a smart pointer immediately.

## References

A reference variable is an alias, that is, another name for an already existing variable. Once a reference is initialized with a variable, either the variable name or the reference name may be used to refer to the variable.

References are often confused with pointers but three major differences between references and pointers are −

- You cannot have NULL references. You must always be able to assume that a reference is connected to a legitimate piece of storage.
- Once a reference is initialized to an object, it cannot be changed to refer to another object. Pointers can be pointed to another object at any time.
- A reference must be initialized when it is created. Pointers can be initialized at any time.

```cpp
#include <iostream>
using namespace std;
int main () {
   int    i;
   int&    r = i;
   
   i = 5;
   cout << "Value of i : " << i << endl;
   cout << "Value of i reference : " << r  << endl;
 
   return 0;
}
```

## Smart pointers

<https://docs.microsoft.com/en-us/cpp/cpp/smart-pointers-modern-cpp?view=msvc-170>

unique, shared and weak pointers
You declare a smart pointer on the stack, and initialize it by using a raw pointer that points to a heap-allocated object. Now the smart pointer is responsible for deleting the memory associated with it and because the smart pointer is declared on the stack this is done automatically.To access the encapsulated raw pointer you can still just use -> and * because the smart pointer class overloaded these operators.

Smart pointers are designed to be just as performant as raw pointers which is why they also have the same size as the encapsulated pointer, either four bytes or eight bytes. Smart pointers also have functions. For example the reset function releases the pointer which can be useful when you want to free the memory owned by the smart pointer before the smart pointer goes out of scope.

### Unique smart pointer

A unique_ptr does not share its pointer and can therefore not be copied to another unique_ptr or passed by value to a function. A unique_ptr can only be moved. This means that the ownership of the memory resource is transferred to another unique_ptr and the original unique_ptr no longer owns it. All the make_unique function does is create and return a unique_ptr.

```cpp
#include <iostream>
using namespace std;

class Point {
    double m_x, m_y;
public:
    Point(double x = 0, double y = 0)
        : m_x(x), m_y(y)
    {}
};
unique_ptr<Point> PointFactory(const double x, const double y)
{
    return make_unique<Point>(x, y);
}

int main()
{
    // Create a new unique_ptr with a new object.
    Point* p = new Point(1, 2);
    unique_ptr<Point> up1(p);

    // Move raw pointer from one unique_ptr to another.
    unique_ptr<Point> up2 = move(up1);

    // Obtain unique_ptr from function that returns by value.
    auto up3 = PointFactory(1,2);
    return 0;
}
```

### Shared smart pointer

A shared pointer is a reference-counted smart pointer meaning one raw pointer can have multiple owners, for example, when you return a copy of a pointer from a container but want to keep the original. After you initialize a shared_ptr you can copy it, pass it by value in function arguments, and assign it to other shared_ptr instances. All the instances point to the same object, and share access to one "control block" that increments and decrements the reference count whenever a new shared_ptr is added, goes out of scope, or is reset. When the reference count reaches zero, the control block deletes the memory resource and itself. You can check the amount of references by using the use_count function

![sharedPointer](/img/programming/sharedPointer.png)

```cpp
#include <iostream>
using namespace std;
struct Some {
    int x;
};

void nothing(shared_ptr<Some> p) {
    //Change the underlying object
    p->x = 20;
}

int main() {
    //Create/initialize shared_ptr<Some>
    auto one = std::shared_ptr<Some>(new Some());
    //Another shared_ptr<Some> pointing nowhere 
    std::shared_ptr<Some> two;
    //Change the underlying object
    one->x = 10;
    //Read through shared_ptr
    cout << "x: " << one->x << endl; //x: 10
    //Pass to a function by value. This increases the ref count.
    nothing(one);
    //Underlying object is changed
    cout << "x: " << one->x << " RefCount: " << one.use_count() << endl; //x: 20
    //Assign to another shared_ptr
    two = one;
    //'one' and 'two' are pointing to the same object
    cout << std::boolalpha << (one.get() == two.get()) << endl;
    cout << "RefCount: " << one.use_count() << endl; //x: 20
    // On return 'one' and 'two' are destroyed, Ref count reaches zero, Some is destroyed
    return 0;
}
```

### Weak smart pointer

The weak smart pointer is used in conjunction with shared_ptr for special cases. A weak_ptr provides access to an object that is owned by one or more shared_ptr instances, but does not participate in reference counting. Use when you want to observe an object, but do not require it to remain alive. Required in some cases to break circular references between shared_ptr instances.

```cpp
#include <memory>
#include <vector>

struct TreeNode {
    std::weak_ptr<TreeNode> parent;
    std::vector< std::shared_ptr<TreeNode> > children;
};

int main() {
    // Create a TreeNode to serve as the root/parent.
    std::shared_ptr<TreeNode> root(new TreeNode);

    // Give the parent 100 child nodes.
    for (size_t i = 0; i < 100; ++i) {
        std::shared_ptr<TreeNode> child(new TreeNode);
        root->children.push_back(child);
        child->parent = root;
    }

    // Reset the root shared pointer, destroying the root object, and
    // subsequently its child nodes.
    root.reset();
}
```

## Passing parameters

by value, by reference with pointers. by value if object isnt larger then 2 pointers

## Returning values

by value, by reference with pointers.

## Arrays

### C arrays

C arrays. with unique pointers??? make_unique??? as function paramaters need to pass first dimension?? why the fuck

pointer arithmetic

### Cpp arrays

array<T,S> is wrapper for c array with given length with a few useful functions
vector class is like arraylist in java on heap so is half dynamic.

## Strings

with  ""s includes some functions. String_view???

### String types

wide char, utf, unicode, raw string literals

## Enum classes
