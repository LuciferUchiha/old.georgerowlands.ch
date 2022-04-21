
## Moore's Law

Moore’s law isn’t really a law but rather an observation by Gordon Moore in 1965 that the number of transistors on a microchip/CPU doubles about every year which would lead to exponential growth. We can also observe this but there is a reason why people say that Moore's law is dead.

![mooresLaw](/img/programming/mooresLaw.png)

Apart from the transistor amount everything else has slowly leveled out, meaning we can't get much more out of our CPUs, instead we can have multi-core CPUs which will have no impact on most current applications as they do not make use of concurrent programming. But if they would they could gain a massive speedup.

![concurrentProgrammingMeme](/img/programming/concurrentProgrammingMeme.png)

## Amdahl's Law

Amdahl's law is a formula to predict the maximum speedup using $N$ processors/cores based on the proportion of parallelizable components of a program $p$ and the serial components $1-p$

$$speedup  \leq \frac{1}{(1-p)+ \frac{p}{N}}$$

![amdahlsLawExample](/img/programming/amdahlsLawExample.png)

When taking a look at the the potential speedups depending on the amount of parallelizable components and processors we can see after a certain point around the 64 mark the gain get's very little.

![amdahlsLawWearoff](/img/programming/amdahlsLawWearoff.png)

## Concurrent Programming

When talking about programs there are three main subsets they can be split into, serial programs, concurrent programs and parallel programs.

![programSubsets](/img/programming/programSubsets.png)

Concurrent programs have multiple logical threads where as serial just have one. To solve a problem concurrently you have to handle events which could happen at the same time. Because of their nature concurrent programs are often non-deterministic, meaning results depend on the timing of the events. Parallel programs different parts of the computation simultaneously so in parallel. To solve a problem with parallelism you need to break the problem down into pieces that can be done in parallel.

![concurrentVsParallel](/img/programming/concurrentVsParallel.png)
