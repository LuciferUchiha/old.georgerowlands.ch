---
title: CMOS Inverter
description: CMOS Inverter
tags: [electronics, electrical circuits, voltage, current, transistors, mosfet, cmos, nmos, pmos]
---

To understand how a CMOS works we first need to look at the two parts that you need to build a CMOS. Transistors consist mainly of 5 parts,

1. A Gate, which controls the behavior of the transistor.
2. Source end.
3. Drain end.
4. The body of the transistor.
5. An Insulating layer, which separates the gate from the body.

![MOSFETStructure](/img/electronics/MOSFETStructure.png)

## nMOS Transistors

nMOS transistors have a so-called inversion layer that will let current flow from the grounded "source" to the "drain" end if a voltage is applied to the gate.

## pMOS Transistors

pMOS transistors have a lot of things the other way around. The "source" has a current and will only let the current flow to the "drain" end when no voltage is applied to the gate.

## Putting Everything Together

A CMOS inverter combines these two components to then construct an inverter that flips the value of its input.

![CMOSInverter](/img/electronics/CMOSInverter.png)
