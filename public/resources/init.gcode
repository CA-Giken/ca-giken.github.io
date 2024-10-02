M92 E2000	;1cc=100p
M200 D0
M302 ;Allow cold extruder
M301 P1000 I0 D0
G28 Y0 X0
G90 ;Abs
M83 ;Relative only Exx
G1 X245 Y10 F7000 ;Purge position
M140 S40 ;turn bed on
