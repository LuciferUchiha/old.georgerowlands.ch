---
title: Doomsday Algorithm
description: Doomsday Algorithm
tags: [doomsday algorithm, john conway]
---
:::info

This is work in progress

:::

The Doomsday algorithm was developed in 1973 by John Conway (see also [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)). The Doomsday algorithm is an algorithm that can be used to determine the day of the week (Monday, Tuesday, etc.) of a certain date like the 18/05/2003.

You can watch a video about it [here](https://www.youtube.com/watch?v=z2x3SSBVGJU&t=0s)

In short the Doomsday algorithm involves three steps to calculate the weekday for a given date:

1. Determination weekday of the doomsday.
   1. For the century.
   2. For the year from the one for the century.
2. Select the closest doomsday to the given date.
3. Count the number of days (modulo 7) between the doomsday and the given date to get the weekday.

## Doomsdays

The algorithm takes advantage of so called doomsdays or also commonly known as anchor days. These doomsdays are easy-to-remember dates that fall on to the same day of the week each year. The defintion of the word doomsday is the day of week on which the last day of february falls.

| Doomsday(month/day)         | Description                                                                                                                                                                   |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4/4, 6/6, 8/8, 10/10, 12/12 | Even numbers apart from 2 can be remembered with these dates                                                                                                                  |
| 3/14                        | Pi day                                                                                                                                                                        |
| 9/5, 5/9, 7/11, 11/7        | Can be remembered with "I work from 9 to 5 at the 7-11"                                                                                                                       |
| 1/3 or 1/4 and 2/28 or 2/29 | Due to leap years January and February are a bit tricky. If the $(\text{year}\mod 4) = 0$ the it is a leap year and you can use 1/4 and 2/29 otherwise you can subtract a day. |

The above are the minimum necessary however there are some more doomsdays. I will leave it up to you if you think it is coincidence that these dates are doomsdays or not.

| Doomsday(month/day) | Description      |
| ------------------- | ---------------- |
| 10/31               | Halloween        |
| 7/4                 | Independence day |
| 12/26               | Boxing day       |

So if you know Pi Day was on a Monday this year then you also know that all the other doomsdays were or will be a Monday this year.

## Known Doomsday

To know which day of the week a given date was or will be in a year with the knowledge of knowing which weekday doomsday falls on is pretty trivial. All you need to do is add or subtract days.

:::note Example with knowledge of doomsday

We know doomsday in 2020 was a Saturday and we want to find out on which day of the week my birthday (18th of January) was.

We start of by finding the closest doomsday to the 18th of January. 2020 is a leap year because $2020 \mod 4 = 0$, which means that the closest doomsday is the 4th of January. Between the 4th and the 18th there are 14 days which is exactly 2 weeks so we know my birthday in 2020 was a Saturday.

If my birthday was the 20th of January then we would have a difference of 16 days. If we do $16 \mod 7 = 2$ then we can say that the 20th of January is 2 days "on" doomsday so a Monday. If it was the 14th of January it would be 2 days "off" doomsday so a Thursday.

:::

## Weekdays as numbers

Like most algorithms this algorithm works best if we map days of the week to numbers. For this reason John Conway suggested thinking of the days of the week as the following

| Day of the week | Value | Mnemonic   |
| --------------- | ----- | ---------- |
| Sunday          | 0     | Sansday    |
| Monday          | 1     | Oneday     |
| Tuesday         | 2     | Twosday    |
| Wednesday       | 3     | Treblesday |
| Thursday        | 4     | Foursday   |
| Friday          | 5     | Fiveday    |
| Saturday        | 6     | Six-a-day  |

## Calculate Doomsday

First we need to found out what the doomsday is for the century. We can either just remember the table below

or calculate it using either of the following formulas where $c = \lfloor\frac{\text{year}}{100}\rfloor$

$$\text{doomsday} = 5 \times (c \mod 4) \mod 7 + \text{Tuesday}$$

$$\text{doomsday} = c \mod 4 =
 \begin{cases}
 \text{Tuesday} &\text{if } = 0\\
 \text{Sunday} &\text{if } = 1\\
 \text{Friday} &\text{if } = 2\\
 \text{Wednesday} &\text{if } = 3\\
 \end{cases}$$

### "Odd + 11" Method
