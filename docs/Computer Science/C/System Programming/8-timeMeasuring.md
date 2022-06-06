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

With the following functions you can get and set the time as well as a timezone of the program:

- `int gettimeofday(struct timeval *restrict tv, struct timezone *restrict tz);`
- `int settimeofday(const struct timeval *tv, const struct timezone *tz);`

With the corresponding structs:

```c
struct timeval {
    time_t      tv_sec;     /* seconds */
    suseconds_t tv_usec;    /* microseconds */
};
struct timezone {
    int tz_minuteswest;     /* minutes west of Greenwich */
    int tz_dsttime;         /* type of DST correction */
};
```

However, the timezone structure is obsolete and should therefore normally be specified as NULL.

### Locale

Locale is a set of parameters that defines the user's language, region and how numbers, dates and times etc. should be represented. You can set the program's locale with the `char *setlocale(int category, const char *locale);`. The category could be `LC_ALL`, `LC_TIME`, `LC_NUMERIC` amongst others. If you pass LC_ALL and NULL you can read the current locale.

Some possible locales could be: en_US, de_DE, de_CH etc.

### Broken-down time

Calendar time represents absolute time as elapsed time since the epoch. This is convenient for computation but has no relation to the way people normally think of calendar time. By contrast, broken-down time is a binary representation of calendar time separated into year, month, day, and so on. Broken-down time values are not useful for calculations, but they are useful for printing human-readable time information. A broken-down time value is always relative to a choice of time zone.

```c
struct tm {
    int tm_sec; // seconds [0..60]
    int tm_min; // minutes [0..59]
    int tm_hour; // hours [0..23]
    int tm_mday; // day of the month [1..31]
    int tm_mon; // month [0..11]
    int tm_year; // years since 1900
    int tm_wday; // weekday [0..6], Sunday = 0
    int tm_yday; // day of year [0..365]
    int tm_isdst; // daylight saving time flag
}
```

With `struct tm *gmtime(const time_t *t);` you can convert a time_t to a broken-down time in UTC. Or you can use `struct tm *localtime(const time_t *t);` to convert a time_t to a broken-down time in local time.

With `time_t mktime(struct tm *timeptr);` you can convert broken-down time into time_t since the Epoch. tm_wday and tm_yday components of the structure are ignored

### Time and Strings

When not computing we want times to be in human-readable form which is why there are lots of functions to convert times to strings:

- `char *ctime(const time_t *timep);` returns a 26-byte string representing the time in locale and DST: "Wed Jun 8 14:22:34 2011".
- `char *asctime(const struct tm *t);` does the same as `ctime()` without changing the timezone or DST.

Often we also want to be able to format the string for this we can use `size_t strftime(char *restrict s, size_t max, const char *restrict format, const struct tm *restrict tm);` which formats the time and stores it in s. For example "%Y-%m-%dT%H:%M:%SZ" becomes "2018-12-29T12:17:25Z" where Z is only if UTC.

There are also cases for example when getting input from users we want to parse a string to a time for this we can use `char *strptime(const char *restrict s, const char *restrict format, struct tm *restrict tm);` which parses the string s using the format to the time and stores it in tm.

Some key formats being:

| Format                 | Description                             |
| ---------------------- | --------------------------------------- |
| %a / %A                | abbreviated / full weekday name         |
| %b / %B                | abbreviated / full month name           |
| %d / %m / %w / %W / %u | day / month / weekday / week as decimal |
| %y / %y                | year with or without century            |
| %H / %M / %S           | hour / minute / second as decimal       |

### Timezones

Timezones define the time and region of a program. Timezones are stored in the environment variable `TZ` for Unix systems. To find out urs you can type:

With the `void tzset(void);` you can initialize the timezone which in turn sets the following global variables:

- `extern char *tzname[2];` zone and DST zone.
- `extern long timezone;` difference to UTC in seconds.
- `extern int daylight;` non-null if DST.

## Process time

is the cpu time that a process has used since creation consisting of two parts. Uesr CPU time which is the amount of time spent in user mode, also commonly reffered to as virual time. And System cpu time which is the amount of time spent in kernel mode whilst doing for example system calls.

times() function and tms struct. sysconf???

clock() iis total time of user and kernel time. different clock resoultion???? CLOCKS_PER_SEC?

### Unix Timers and Sleeping

Ein Timer erlaubt es einem Prozess, Notifikationen
für sich einzuplanen, auf einen späteren Zeitpunkt.
Schlafen (sleeping) suspendiert einen Prozess oder
Thread für eine zuvor festgelegte Zeitdauer.

#### Interval timer

with setitimer sends signal and uses itimerval struct. getitimer return remaining time.

#### One-time Timer - Alarm

with alarm()

#### Timer precision

Je nach Prozessorlast kann es sein, dass ein Prozess
erst kurz nach Ablauf eines Timers wieder läuft.
Dies hat aber keinen Einfluss auf das nächste Signal,
Intervalle werden genau eingehalten, ohne Drift.
Die Genauigkeit eines Timers ist auf modernen Linux
Systemen durch die Frequenz der Hardware Clock
beschränkt, und erreicht ca. eine Mikrosekunde.

#### Suspend processes - sleeping

sleep and nanosleep.
