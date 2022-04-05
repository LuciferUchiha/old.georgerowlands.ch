
## Pointers

[//]: # (CLEANUP REQUIRED)

Every variable is a memory location and every memory location has its address defined which can be accessed using ampersand (&) operator which denotes an address in memory. A pointer is a variable whose value is the address of another variable. Thsi address is internally represented as an unsigned int on most systems however you shouldn't think of it as such. every pointer has the type of the variable it is pointing to so the compiler knows how much memory is occupied by that variable. the asteriks denotes a pointer. you can initiate it by pointing to no location in memory with NULL, so called null pointer. to access the value a pointer is pointign to is so called dereferencing which is using the asterik again. *pointer + 5. to output a pointers value in hex use %p, pointers always use 8 bytes. pointers also have addresses so can output that aswell &pnumber warning by compiler because expected a pointer but it is a pointer to a pointer of itn so cast to void\*.

pointer arithmetic: + or - to increment or decrement a pointer by one which is usefull when working with arrays to go to the next or previous element.

pointer - pointer is space between the pointers so could find out if they point to same value?

never dereference uninitialized pointer as value could go anywhere could maybe overwrite data or cause the program to crash. NULL is same as zero which is same as false so can do if(!pointer) to do soemthign if the pointer is not NULL.

const long *pvalue = &value defines a pointer to a constant. so the value cant be changed so*pvalue=99; is not possible. but we can still change it via value=99 can also still change to waht the pointer is pointing to so long number and then pvalue=&number is still possible.

not allowing the address to change then you write int *const pConst, cant change the address, but can change the values???? can then also combine the 2.

void pointers: void* can store an address of any type. can not be dereferenced as it doesn't know the size of waht it is pointign to so must first be cast to anotehr pointer type.

pointers and array, can point an int*pointer to the first elemenet because an array always points to the first address. does the same as &values[0]
arr[i] is the same as*(arr+i) if arr is a pointer you can also arr++ to go to next element.

interesting example is arraySum from video

swap example from book with pass by value and pass by reference.

pointers also allow then to have multiple returns, so called output parameters.

dynamic memory allocation. when creating variables or pointers compilers assigns memory on the stack which normally does not stay aroudn for very long when no longer needed is cleared, leaves block. dynamic memory allocation reserves space on heap which is around for the entire program but then needs to be freed by you the developer.

malloc from stdlib.h, specify number of bytes to reserve on heap and returns addres of first byte as a void pointer so to use needs to be cast. if it fails will return NULL.
programmer is responsible so need to release the memory, otherwise memory leak which is when you allocate memory but can no longer access it without releasing it.
free(pointer); pointer=NULL. calloc() number of data items and then the size of each item so for example for arrays, advantage is it initializes all the bits to zero. realloc realocates memory to resize some already allocated memory. it preserves the contents which is very important.
