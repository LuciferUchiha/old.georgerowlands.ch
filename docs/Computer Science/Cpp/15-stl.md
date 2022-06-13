---
title: Standard Template Library - STL
description: Standard Template Library - STL
tags: [cpp, templates]
---

## Limits

The numeric_limits class template provides a standardized way to query various properties of arithmetic types.

```cpp
#include <iostream>     
#include <limits>      

int main () {
    std::cout << std::boolalpha;
    std::cout << "Minimum value for int: " << std::numeric_limits<int>::min() << '\n';
    std::cout << "Maximum value for int: " << std::numeric_limits<int>::max() << '\n';
    std::cout << "int is signed: " << std::numeric_limits<int>::is_signed << '\n';
    std::cout << "Non-sign bits in int: " << std::numeric_limits<int>::digits << '\n';
    std::cout << "int has infinity: " << std::numeric_limits<int>::has_infinity << '\n';
    return 0;
}
```

## Chrono

The chrono library is a flexible collection of types that track time with varying degrees of precision (system_clock, steady_clock, high_resolution_clock)

```cpp
#include <chrono>      

int main () {
    using Clock = chrono::system_clock;
    Clock::time_pointstart = Clock::now();
    Clock::durationd = Clock::now() - start;
    int64_t ns = std::chrono::nanoseconds(d).count();
    using ms_t = std::chrono::duration<double, std::milli>; // new durationtype
    double ms = std::chrono::duration_cast<ms_t>(d).count();
}
```

## Pair and Tuple

Pairs hold pairs of values as you would expect and tuples are like the mathematical tuples that are generalized pairs for any amount of values.

```cpp
#include <utility>     
#include <tuple>      

int main () {
    pair<int, double> id;
    int i = id.first; 
    double d = id.second;
    id = make_pair(3, 5.5);

    tuple<int, double, string> tup(1, 2.2, "drei");
    auto val= get<0>(tup); // read
    get<1>(tup) = 1.5; // update
    size_ts = tuple_size<decltype(tup)>::value; // number of elements
    tup = make_tuple(2, 3.3, "vier");
}
```

## Optional, Any and Variant

The class template optional manages an optional contained value, i.e. a value that may or may not be present which is a common use case when returning a value of a function that may fail.

```cpp
optional<string> create(bool b) {
    if (b)
        return "Godzilla";
    return {}; // gleich wie nullopt;
}
auto opt = std::make_optional<std::vector<char>>({'a','b','c'});
if (opt) // or opt.has_value()
    cout << "value set to " << opt.value().value_or("nothing") << '\n'; // can also use function with or_else()
```

The class any describes a container for any single value.

```cpp
any a = 1;
auto a0 = make_any<std::string>("Hello, std::any!\n");
cout << a.type().name() << ": " << any_cast<int>(a) << '\n';
```

the class template variant represents a type-safe union.

```cpp
int main(){
  variant<int, float> v, w;
  v = 12;                              
  int i = std::get<int>(v);
  w = std::get<int>(v);                
  w = std::get<0>(v);                  
  w = v;                            
  //  std::get<double>(v); error
  //  std::get<3>(v); error
  try{
    std::get<float>(w);
  }
  catch (std::bad_variant_access&) {}
}
```

## Container

### Iterators

#### Special Iterators

## Algorithm

## Exceptions
