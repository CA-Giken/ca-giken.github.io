﻿G1 X245 Y10 F7000 ;purge position
M301 P2000 I0 D0
M140 S40
M109 S90 ;pre-heat
G1 E40 F200
G1 E-2 F200

;Round 1
M104 S85
G1 X190 Y75 F7000 ;Cup#1
G1 E5 F200
G2 F500 J10 E15 ;drip 20cc
G1 E-2 F200
G1 X30 F7000 ;Cup#2
G1 E5 F200
G2 F500 J10 E15
G1 E-2 F200
G1 X245 Y10 F7000 ;purge position
M104 S0
G1 E20 F200  ;Wait and Cooling down
G4 S20

;Round 2
M104 S85
G1 X190 Y75 F7000 ;Cup#1
G1 E2 F200
G2 J8 E15 F500
G1 E-2 F200

G1 X30 F7000 ;Cup#2
G1 E2 F200
G2 J8 E15 F500
G1 E-2 F200

;Round 3
M104 S85
G1 X190 Y75 F7000 ;Cup#1
G1 E2 F200
G2 J8 E15 F600
G1 E-2 F200

G1 X30 F7000 ;Cup#2
G1 E2 F200
G2 J8 E15 F600
G1 E-2 F200

;Round 4
M104 S85
G1 X190 Y75 F7000 ;Cup#1
G1 E2 F200
G2 J12 E20 F600
G1 E-2 F200

G1 X30 F7000 ;Cup#2
G1 E2 F200
G2 J12 E20 F600
G1 E-2 F200

;Round 5
M104 S85
G1 X190 Y75 F7000 ;Cup#1
G1 E2 F200
G2 J12 E20 F700
G1 E-2 F200

G1 X30 F7000 ;Cup#2
G1 E2 F200
G2 J12 E20 F700
G1 E-2 F200

;Round 6
M104 S85
G1 X190 Y75 F7000 ;Cup#1
G1 E2 F200
G2 J12 E20 F700
G1 E-2 F200

G1 X30 F7000 ;Cup#2
G1 E2 F200
G2 J12 E20 F700
G1 E-2 F200

;Round 7
M104 S85
G1 X190 Y75 F7000 ;Cup#1
G1 E2 F200
G2 J12 E20 F700
G1 E-2 F200

G1 X30 F7000 ;Cup#2
G1 E2 F200
G2 J12 E20 F700
G1 E-2 F200

;Round 8
M104 S85
G1 X190 Y75 F7000 ;Cup#1
G1 E2 F200
G2 J12 E20 F700
G1 E-2 F200

G1 X30 F7000 ;Cup#2
G1 E2 F200
G2 J12 E20 F700
G1 E-2 F200

;Round 9
M104 S85
G1 X190 Y75 F7000 ;Cup#1
G1 E2 F200
G2 J12 E20 F700
G1 E-2 F200

G1 X30 F7000 ;Cup#2
G1 E2 F200
G2 J12 E20 F700
G1 E-2 F200

;Round 10
M104 S85
G1 X190 Y75 F7000 ;Cup#1
G1 E2 F200
G2 J12 E20 F700
G1 E-2 F200

G1 X30 F7000 ;Cup#2
G1 E2 F200
G2 J12 E20 F700
G1 E-2 F200

;Round 11
M104 S85
G1 X190 Y75 F7000 ;Cup#1
G1 E2 F200
G2 J12 E20 F700
G1 E-2 F200

G1 X30 F7000 ;Cup#2
G1 E2 F200
G2 J12 E20 F700
G1 E-2 F200



;Go to purge position
M104 S0 ;turn heater off
G1 X245 Y10 F10000;purge pos
M84 ;Motor off
