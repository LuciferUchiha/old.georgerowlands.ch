---
title: Stream I/O
description: Stream I/O
tags: [cpp, file io, streams]
---

## Standard I/O

In C the standard input and output work with the functions `scanf()` and `printf()`.

In C++ this works over byte streams which are objects of the class `istream` for input and `ostream` for output.

The objects `cin` and `cout` are such objects and are most commonly used. There are however also `cerr` for the standard error output and `clog` for buffered standard error output.

## Formatted I/O

### Stream Manipulators

## C++ Stream Classes

## Stream States

something iostate

## File I/O

### Text Files

#### Unformatted

Very C-like.

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;
void main(){
    ifstream inData;
    string fileName;
    cout << "Enter the file name: ";
    cin >> fileName;
    inData.open(fileName, ios::in); // open file
    if( !inData ) {
        cerr<< "Couldn't open file!" << endl;
    } else {
        while(!inData.eof()) {
            cout << static_cast<char>(inData.get()); // read char for char.
        }
        inData.close(); // close file
    }
}
```

#### Formatted

```cpp
#include<fstream>
#include<iostream>

using namespace std;
int main() {
    // Create file
    fstream inOutFile("fstream.txt", ios::out | ios::trunc);
    inOutFile.close();

    // open for read and write
    inOutFile.open("fstream.txt", ios::in | ios::out);

    // write
    for(int j = 1; j <= 20; ++j)
        inOutFile<< j << ' ';
    inOutFile<< endl;
    // jump to start
    inOutFile.seekg(0);
    // read
    int i;
    while(inOutFile >> i) {
        cout << i << ' '; 
    }
    inOutFile.clear(); // remove EOF status
    inOutFile.seekg(25); // jump to position 25
    
    while(inOutFile.get() != ' '); // go to start again
    
    while(inOutFile>> i) {
        cout << i << ' ';
    }
}
```

### Binary Files
