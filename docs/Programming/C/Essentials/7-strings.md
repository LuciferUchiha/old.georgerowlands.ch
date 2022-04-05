
## Character arrays, Strings

[//]: # (CLEANUP REQUIRED)

string constant/literal is anythign between double quotes. strings in memory are arrays of char. \0 is the null character which is added by compiler at the end of each string so we know where it ends. so a length of a string is always one more. do not confuse with NULL which is a symbol that represnets a memory adress that doesnt reference anything. no datatype stirng in C can however get extensive functions for string from standard library. char myString[20] can store a string wtih up to 19 charachters. can initialize like char word[] = {'H', 'e', ...} if there is no array size given compiler compute the size and adds one for the null terminator. You can also do char word[7] = {"Hello!"} if the array is to small size=6 compiler doesnt put one there and doesn't throw error so good practice is or aynthign or let compiler figure it out. can also partially initialize char str[40] = "To be". myString= "Hello" doesnt work you could iterate over it. display entire stirng with %s no indexes or anything.

compare strings tricky because char arrays so cant jsut do == you can use functions for standard library.

string functions from standard library in string.h strlen returns size_t which is an unsigned long, strcpy, strncpy because you cant assign does not check if it fits will just copy as much as it can or throw error???? strncpy has third number which is maximum number of characters to copy check how exactly, concatenation strcat, strncat coyp of frist string is appeneded to the first second string is not altered returns where was inserted ncat only copies certain amount of characters, compararing strcmp adn strncmp if they are the same then returns 0, else -1 if "smaller on ascii" or 1 if larger, compares strings until they differ so can check for substrings at the beginning.

search strings: strchr and strstr finding string or char in string. returns pointer to where to first occurance that was found so char* if not found return NULL which is eqvl to no address.

toikeninzing string: strtok(), can use multiple delimeters, returns first token etc, seems a bit dumb????

analyzing like isLower, isUpper, isAlpha etc. can be done on characters or strings

converting char like toUpper, toLower so need to do for each for string.
 stdlib.h has functions to convert to numbers like atoi etc.
