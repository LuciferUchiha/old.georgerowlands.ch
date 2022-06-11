---
title: Templates
description: Templates
tags: [cpp, templates, generics]
---

Templates are the C++ version of Java's generics. Just like with Java generics you can write generic code (a template) that is not dependent on a type.

```cpp
template<typename T> T min(T a, T b) {
    return(a < b) ? a : b;
}

template<class T> T min(T a, T b) {
    return(a < b) ? a : b;
}
```

The two definitions are identical. Using class or typename makes no difference. You can also combine this with non generic types for example when writing a type for a generic static array that has a variable length.

```cpp
template<class T, int S>
class Array {
    T m_array[S];
public:
    Array() : Array(0) {}
    template<typename E> Array(E val) {
        for (auto& a : m_array) {
            a = static_cast<T>(val);
        }
    }
    const T& operator[](int pos) const { return m_array[pos]; }
    T& operator[](int pos) { return m_array[pos]; }
    void print() const {
        cout << '[';
        cout << m_array[0];
        for (int i = 1; i < S; i++) cout << ',' << m_array[i];
        cout << ']' << endl;
    }
};
int main() {
    Array<int, 10> arr;
    arr[3] = 4;
    arr.print();
}
```

## Generic Classes

In C++ you can define generic classes and also define a default type for the generic class which you can not do in Java.

```cpp
template<typename T> class Vector {
    T* m_array;
    …
};
template<typename T = char> class String { // default is char
    T* m_string;
};
```

### Explicit Instantiation

When a template is instantiated an entire function or class is built. This happens every time the code is compiled. To reduce compilation time you can use explicit instantiation.

```cpp
template<typename T> class A {
    T m_t;
public:
    A(T t): m_t(t) {}
    void f(T t);
};
// instead of 
int main() {
    A<double> a(3.5);
}
// add to header
extern template class A<int>;
// or cpp
template class A<int>;
```

## Template of Templates

A template parameter list can take another template parameter list so we can have structures like this:

```cpp
// function that takes a template that is specialized to a Container with type T and A.
template<template<typename, typename> class Container, class T, class A>
std::ostream& operator<<(std::ostream& os, const Container<T, A>& v) {
    os<<'[';
    auto it= v.begin();
    if(it != v.end()) os<< *it++;
    for(; it != v.end(); it++) os<<", "<< *it;
    os<<']';
    return os;
}
```

## Specialization

After the template definition, you can also add a specialization for a template method.

```cpp
template<typenameT> T min(T a, T b) {
    return(a < b) ? a : b;
}
template<> char min<char>(char a, char b) {
    a = tolower(a);
    b = tolower(b);
    return (a < b) ? a : b;
}
```

### Partial Specialization

When there are multiple parameters for a generic class you can partially specialize some of them.

```cpp
template<typename T, class C> class MyClass{}; // generic
template<class C> class MyClass<char, C> {}; // partial

MyClass<int, string> c1; // generic
MyClass<char, string> c2; // partial
MyClass<char, iostream> c3; // partial
```

### Specialization vs Overloading

It is important to remember that overloaded functions are always a better match than specialized template functions.

```cpp
template<typename T> void foo(T x) { cout<<"Generic"<< endl; }
template<> void foo(int* p) { cout<<"Specialized"<< endl; }
template<typename T> void foo(T* p) { cout<<"Overloaded"<< endl; }
int i = 5;
foo(i); // Generic
foo(&i); // Overloaded
```

## Alias Templates

Generic classes and functions can have a very long definition especially when there are templates of templates involved. To shorten this you can either use `typedef` like in C for structs, or you can use the `using` keyword which is the more modern and flexible way of doing it.

```cpp
// old
typedef array<vector<uint64_t>*, 50> AV50;
// modern and flexible
template<typename T> using MA50 = array<T, 50>;
using MAV50 = MA50<vector<uint64_t>>;

int main() {
    // long
    array<vector<uint64_t>*, 50> myArray;
    AV50 myShortArray;
    MAV50 myArray;
}
```

## Variadic Templates

## Perfect Forwarding

## Template Meta Programming - TMP
