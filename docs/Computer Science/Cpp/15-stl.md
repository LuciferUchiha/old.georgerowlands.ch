---
title: Standard Template Library - STL
description: Standard Template Library - STL
tags: [cpp, templates]
---

## Limits

The numeric_limits class template provides a standardized way to query various properties of arithmetic types.

```cpp
cout << boolalpha;
cout << "Minimum value for int: " << numeric_limits<int>::min() << '\n';
cout << "Maximum value for int: " << numeric_limits<int>::max() << '\n';
cout << "int is signed: " << numeric_limits<int>::is_signed << '\n';
cout << "Non-sign bits in int: " << numeric_limits<int>::digits << '\n';
cout << "int has infinity: " << numeric_limits<int>::has_infinity << '\n';
```

## Chrono

The chrono library is a flexible collection of types that track time with varying degrees of precision (system_clock, steady_clock, high_resolution_clock)

```cpp
using Clock = chrono::system_clock;
Clock::time_pointstart = Clock::now();
Clock::durationd = Clock::now() - start;
int64_t ns = chrono::nanoseconds(d).count();
using ms_t = chrono::duration<double, milli>; // new durationtype
double ms = chrono::duration_cast<ms_t>(d).count();
```

## Pair and Tuple

Pairs hold pairs of values as you would expect and tuples are like the mathematical tuples that are generalized pairs for any amount of values.

```cpp
pair<int, double> id;
int i = id.first; 
double d = id.second;
id = make_pair(3, 5.5);

tuple<int, double, string> tup(1, 2.2, "drei");
auto val= get<0>(tup); // read
get<1>(tup) = 1.5; // update
size_ts = tuple_size<decltype(tup)>::value; // number of elements
tup = make_tuple(2, 3.3, "vier");
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
  variant<int, float> v, w;
v = 12;                              
int i = get<int>(v);
w = get<int>(v);                
w = std::get<0>(v);                  
w = v;                            
// get<double>(v); error
// get<3>(v); error
try{
    get<float>(w);
}
catch (bad_variant_access&) {}
```

## Container

A Container is an object used to store other objects and taking care of the management of the memory used by the objects it contains.

Attributes a Container<T> needs to have:

- `value_type` container-element, T.
- `reference` reference of container-element.
- `const_reference` same but read-only.
- `iterator` the iterator for the container.
- `const_iterator` same but read-only.
- `size_type`

Functions a Container should have:

- Standard-, copy and moveconstruktor, destructor
- begin() and end() iterators, cbegin() and  cend() for read only
- max_size(), size(), empty()

Bitsets are a fixed-size sequence of N bits.

```cpp
constexpr bitset<4> b1;
constexpr bitset<4> b2{0xA}; // == 0B1010
bitset<4> b3{"0011"}; // can't be constexpr yet
bitset<8> b4{"ABBA", /*length*/4, /*0:*/'A', /*1:*/'B'}; // == 0B0000'0110
```

Half dynamic structures like `vector`

```cpp
vector<int> vec = {1,2,3};
cout << vec.size() << endl;
vec.push_back(5);
cout << vec[3] << endl;
vec[1] = 10;
cout << vec.front() << endl;
cout << vec.capacity() << endl;
vec.pop_back();
cout << vec.size() << endl;
```

List structures like normal linked lists `forward_list`, doubly linked lists `list` and double ended queues `deque`, also known as head-tail linked list.

```cpp
std::deque<int> d = {7, 5, 16, 8};
d.push_front(13);
d.pop_back(25);
for(int n : d) {
    std::cout << n << ' ';
}
```

A `set` in C++ is a container that contains a sorted set of unique objects of type Key. Sorting is done using the key comparison function. Search, removal, and insertion operations have logarithmic complexity as they are usually implemented as red-black trees. `multiset` is the same except multiple keys with equivalent values are allowed.

```cpp
set<string> mySet;
mySet.insert("first");
mySet.insert("second");
mySet.insert("third");
mySet.insert("first");
cout << "Set Size = " << mySet.size() << endl; // 3
mySet.erase("third");
```

A map is a sorted associative container that contains key-value pairs with unique keys. Multimap is the same except multiple keys with equivalent values are allowed.

```cpp
map<string, int> m { {"CPU", 10}, {"GPU", 15}, {"RAM", 20}, };
for (const auto& [key, value] : m) {
    cout << '[' << key << "] = " << value << "; ";
}
m.erase("GPU");
m.insert("HDD", 50);
```

There are also unordered versions of sets and maps where the keys are not sorted: `unordered_set`, `unordered_multiset`, `unordered_map`, `unordered_multimap`

### Iterators

#### Special Iterators

## Algorithm

## Exceptions
