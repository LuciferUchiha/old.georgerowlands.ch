---
title: Working with Numbers
tags: [binary, integers, signed, unsigned, floating points]
---

## Integers

### Unsigned Integers

with n bits we can represent $2^n$ things. Encoding unsigned integers, i.e integers with no sign so positive numbers is pretty simple. The first bit called the LSB corresponds to 2^0, the second one 2^1. If that bit is set to 1 we add the value correspondign to that bit and receive the result. So if we have 32 bits we can represent 2^32 things, so if we start at 0 we can represent the range from 0 to 2^32-1.

This can also be described mathematically as followed if we denote our binary representation as $B=b_{n-1},b_{n-2},..,b_0$ and the function $D(B)$ which maps the Binary representation to its corresponding value.

$$
D(B)= \sum_{i=0}^{n-1}{b_i \cdot 2^i}
$$

## Signed Integers

When we involve signed integers it gets a bit more complex since now we also want to deal with negative numbers. In history there have been a few representations for encoding signed integers which often get forgotten.

### Sign Magnitude

The idea for the sign and magnitude representation is a very simple one. You have a bit (the MSB) that represents the sign, 1 for negative, 0 for positive. All the other bits are the magnitude i.e the value.

$$
D(B)= (-1)^{b_{n-1}} \cdot \sum_{i=0}^{n-2}{b_i \cdot 2^i}
$$

<img src="/img/programming/signMagnitude.png" alt="signMagnitude" width="300"/>

:::example

$$\begin{align*}
0000\,1010_2 &= 10 \\
1000\,1010_2 &= -10
\end{align*}$$

:::

Seems pretty simple. However, there are two different representations for 0 which isn't good since computers often make comparisons with 0. This could potentially double the number of comparisons needed to be made which is one reason why this sign magnitude representation is not optimal.

### One's Complement

The idea of the one's complement is also very simple, it is that we want to quickly find the negative number of the same positive value by just flipping all the bits. In other words:

$$
-B=\,\sim B
$$

And mathematically defined:

$$
D(B)= -b_{n-1}(2^{n-1}-1) + \sum_{i=0}^{n-2}{b_i \cdot 2^i}
$$

<img src="/img/programming/onesCompliment.png" alt="onesCompliment" width="300"/>

:::example

$$\begin{align*}
0000\,1010_2 &= 10 \\
1111\,0101_2 &= -10
\end{align*}$$

:::

however just like the sign magnitude representation the one's complement has the issue of having 2 representations for 0.

### Two's Complement

Finally, we have the representation that is used nowadays, the two's complement. This representation solves the issue of the double representation of 0 whilst still being able to quickly tell if a number is positive or negative. It does however lead to there not being a positive value corresponding to the lowest negative value.

$$
D(B)= -b_{n-1}(2^{n-1}) + \sum_{i=0}^{n-2}{b_i \cdot 2^i}
$$

<img src="/img/programming/twosCompliment.png" alt="twosCompliment" width="300"/>

:::example

$$\begin{align*}
0000\,1010_2 &= 10 \\
1111\,0110_2 &= -10
\end{align*}$$

:::

Any easy way to calculate the negative value of a given value with the two's complement representation is the following:

$$
\sim B + 1 \equiv -B
$$

#### Sign Extension

When using the two's complement we do need be aware of something when converting a binary number with $n$ bits to a binary number with $n+k$ bits and it is called sign extension. Put simply for the value of binary number to stay the same we need to extend the sign bit.

<img src="/img/programming/signExtension.png" alt="signExtension" width="450"/>

:::example

$$\begin{align*}
10:&\, 0000\,1010_2 \Rightarrow 0000\,0000\,0000\,1010_2 \\
-10:&\, 1111\,0110_2 \Rightarrow 1111\,1111\,1111\,0110_2
\end{align*}$$

:::

## Real Numbers
