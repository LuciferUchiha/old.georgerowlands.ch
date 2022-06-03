---
title: Time Measuring
description: Time Measuring
tags: [c]
---

In programs we care about two types of time:

- Real-time or also known as calendar time is a fixed time from the calendar and is used for timestamps etc.
- Process time is the amount of time a process takes which is used for measuring performance etc.

## Calendar time

Calendar time is always in UTC(Coordinated Universal Time)/GMT(Greenwich Mean Time) no matter in which timezone the program is run. In C and most other programming languages, time is handled internally as a signed integer which is based on [Unix/epoche/POSIX time](https://en.wikipedia.org/wiki/Unix_time). The value 0 is 01.01.1970 00:00, also commonly referred to as the birth time of Unix. The integer value of time is then the number of seconds before or after this time. So if the time integer value is 60 then it corresponds to 01.01.1970 00:01.

The function `time_t time(time_t *tloc);` returns the time as the number of seconds since Unix time. If tloc is non-NULL, the return value is also stored in tloc.

### Getting and Setting system time

get/settimeofday and timeval struct.

### Broken-down time

Simple calendar times represent absolute times as elapsed times since an epoch. This is convenient for computation, but has no relation to the way people normally think of calendar time. By contrast, broken-down time is a binary representation of calendar time separated into year, month, day, and so on. Broken-down time values are not useful for calculations, but they are useful for printing human readable time information.

A broken-down time value is always relative to a choice of time zone, and it also indicates which time zone that is.

gmtime and localtime, tm struct. and back with mktime

### Time and Strings

ctime from time_t function. uses local timezone and DST???
asctime from broken down time

string format time with strftime
parse from string to time with strptime

### Timezones

environment variables

tzset function to read timezone and sets some values.

### Locale

defines how numbers, dates and times are represented

can be set with setlocale

## Process time
