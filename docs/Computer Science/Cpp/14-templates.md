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

## Template of Templates

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

## Alias Templates

## Variadic Templates

## Perfect Forwarding

## Template Meta Programming - TMP
