
When working with big objects for example an Image copying objects around can get very expensive. For example if create a factory function

```cpp
string factory() {
    string t = "text";
    return t; // t gets copied using a temp object
}
string s = factory(); // might get copy elision
s = factory() // another temp is created
```

To improve this we need to understand a few things.

## Lvalues and Rvalues

In C++ you can split values into groups.

- Lvalues are values whos adresses you can get and in most times last a long time. For example x here is a Lvalue `int x = 3;`.
- Rvalues however are transient or temporary and are destroyed when no longer needed. For example (x+y) here is a Rvalue `int z = x+y` because it is temporary and as as soon as it is copied to z it is destroyed and we can't get its address. Some goes for the 3 above you can not do `&3` so it is an Rvalue.

Rvalues can be split up into 2 further groups, pure-right values which are

- Literals: 42, true, nullptr
- Arithmetic expressions: a + b, a < b
- Function calls: str.substr(1, 2)

and Xvalues (eXpiring). Xvalues are functions calls with an Rvalue reference as return or Array-oder Attributcalls on an Rvalue.

GL values that are lValues and Xvalues.

![LRValues](/img/programming/LRValues.png)

### Rvalue reference

You can prolong the life of an Rvalue by using a Rvalue reference

```cpp
#include <iostream>
using namespace std;
int main()
{
    string s1 = "Test";
    //string&& r1 = s1; Rvalue reference cant have Lvalue
    const string& r2 = s1 + s1; // constant Lvalue referenz can have Rvalue, life prolonged
    string&& r3 = s1 + s1; // Rvalue reference has Rvalue, life prolonged
    r3 += "Test";
}
```

You can then use Rvalue references as parameters to make sure things do not get copied or wasted. You can also remember when you a returning an Rvalue reference you should always use move. [But with C++20 this becomes all irrelevant](https://stackoverflow.com/questions/17473753/c11-return-value-optimization-or-move).

```cpp
#include <iostream>
using namespace std;

string foo(string&& s) { // s becomes Lvalue in function
    s += "456";
    return move(s); // if not move then it is return by value and gets copied
}
int main()
{
    string s = "Test";
    string f = foo(s + "abc");
    // string t = foo(s); not possible because s is Lvalues
    cout << s <<endl;
    cout << f << endl;
}
```

std::move does not actually do any moving it just makes it a rvalue so then teh move constructor is called instead of copy when swapping.

## Using RValues

### Copy constructor

You often want to create copies of other objects (also commonly known as prototypes). You need to very careful with what you are doing then especially when you are working with pointers and don't want a shallow copy but a deep copy.

```cpp
#include <iostream>
using namespace std;

class Person
{
private:
    std::string last_name{};
    std::string first_name{};
    int* age{};
public:
    Person() = default;
    Person(const std::string& last_name_param, const std::string& first_name_param, int age_param)
        : last_name(last_name_param), first_name(first_name_param), age(new int(age_param)) //  age(source_p.get_age()) would have 2 pointers to same value
    {}
    // copy constructor
    Person(const Person& source_p)
        : Person(source_p.get_last_name(), source_p.get_first_name(), *(source_p.get_age())) // delegates
    {
        std::cout << "Copy constructor called" << std::endl;
    }

    ~Person() {
        delete age; // Make sure that you are not leaking memory
    }

    //Setters 
    void set_first_name(const std::string& first_name) { this->first_name = first_name; }
    void set_last_name(const std::string& last_name) { this->last_name = last_name; }
    void set_age(int age) { *(this->age) = age; } // Remember to dereference

    //Getters
    const std::string& get_first_name() const { return first_name; }
    const std::string& get_last_name() const { return last_name; }
    int* get_age() const { return age; };

    //Utilities
    void print_info() {
        std::cout << "Person object at : " << this
            << " [ Last_name : " << last_name
            << ", First_name :  " << first_name
            << " ,age : " << *age
            << " , age address : " << age
            << " ]" << std::endl;
    }
};

int main()
{
    Person  p1("John", "Snow", 25);
    p1.print_info();
    //Create a person copy
    Person p2(p1);
    p2.print_info();
}
```

### Move constructor

#### Copy operator

#### Move operator
