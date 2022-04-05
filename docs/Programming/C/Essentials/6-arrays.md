## Arrays

[//]: # (CLEANUP REQUIRED)

fixed size can only store values of one data type. declaration long numbers[10]; 10 being the size, so can store 10 values. to access particular element you need to use an index starting at 0. array out of bounds in C might crash your program or can cause unexpected behaviour like xxxxx memory attack. the compiler cannot check out of bounds errors. Can be initialized with values with long numbers[5] = {1,2,3,4,5}; Can also partialy initialize array rest will just take their default init value so for int, 0.

designated initializers test it!! int arr[6]={[5]=10}; so the last value will be 10 all others 0.

can also create multidimensional arrays so basically an array of arrays. same as in other language 2D can be imagined like a table, row can column can also use designated initializers. Can also go further on like 3D etc. But can quickly get confussing.

C99 introduced variable lenght arrays meaning the length can be assigned usign a variable not a constant. This does not mean the length of an array can change! Linus torvalds is not a fan of this which is why the linux kernel is VLA free. C11 it is however optional for compilers to implement
