# 2d-paint
A 2-dimensional graphics editor written in TypeScript

## Introduction

`2d-paint` is a TypeScript CLI which allows the user to create a two-dimensional canvas a draw different shapes on it.

### Executing
To Execute the program for the first time you will need to have NPM installed. 
You can then start the program using the following commands:

```
npm i
npm run exec
```

You should then be presented with a the following prompt which you can being interacting with:

```
?
```

### Creating a Canvas

To create a new canvas simply execute the `create` command followed by the width and height you desired, for example to create a canvas with the width of 6 and a height of 4, execute:

```
create 6 4
```

### Show a canvas

To show the canvas on the terminal, execute the `show` command. For example:

```
? create 6 4
? show

O O O O O O 
O O O O O O 
O O O O O O 
O O O O O O 
```

### Draw a point

To draw a point on the canvas, execute the `point` command followed by the x y co-ordinates of the point and optionally the 'pixel' you wish to draw. For example, to draw an `X` a position x:2, y:1, execute:

```
? create 6 4
? point 2 1 X
? show

O X O O O O 
O O O O O O 
O O O O O O 
O O O O O O 
```

### Draw a line

To draw a line on the canvas, execute the `line` command followed by the x1 y1 and x2 y2 co-ordinates of the points at the ends of the line, and optionally the 'pixel' you wish to draw. For example, to draw a line from x:1, y:1 to x:6, y:4, with a pixel of `N` execute:

```
? create 6 4
? line 1 1 6 4 N
? show

N O O O O O
O N N O O O
O O O N O O
O O O O N N 
```

If the line cannot be drawn 'straight' do to the line not occupying a whole number of pixels. The line will be drawn approximately straight (as above).

### Draw an area

To draw a square or a rectangle, execute the `area` command followed by the co-ordinates of two opposing corners of the area and optionally the 'pixel' you wish to draw. For example, to draw a square with opposing corners x:1, y:1 and x:3, y:4, with a pixel of `M` execute:

```
? create 6 4
? area 1 1 3 4 M
? show

M M M O O O
M M M O O O
M M M O O O
M M M O O O
```

### Fill an area

To fill an area which is either bounded by the canvas and/ or any non-blank pixel. Execute the `fill` command followed by the co-ordinates where to start the fill and optionally the 'pixel' to use. For example the following commands will draw a line across the canvas then fill the top section with `H` pixels:

```
? create 6 4
? line 1 3 6 3 X
? show

O O O O O O
O O O O O O
X X X X X X
O O O O O O

? fill 1 1 H
? show

H H H H H H
H H H H H H
X X X X X X
O O O O O O
```

### Clearing the canvas

To remove all drawn pixels on the canvas and return to having a blank canvas, execute the `clear` command.

```
? create 6 4
? area 1 1 3 4 M
? show

M M M O O O
M M M O O O
M M M O O O
M M M O O O

? clear
? show

O O O O O O 
O O O O O O 
O O O O O O 
O O O O O O 
```

## Pixel Coloring
A pixel is defined simply as an alpha-numeric character which is drawn to the canvas. When a pixel is drawn onto the canvas, it will be randomly assigned a background color. If the same alpha-numeric character is drawn to the canvas again, the same color will be used.

Please note, there are only a small number of background colors in use. Therefore you may have several pixels with the same background color, but different character values on the canvas at the same time e.g. you could have `X`, `Y`, `Z` pixels drawn on the canvas, all with a background color of blue.

## Pixel Positioning
All pixels will be positioned using an `x,y` co-ordinate system. Any point on the canvas will have an `x,y` co-ordinate where the pixel in the top-left corner of the screen is `1,1` and the pixel in the bottom-right of the screen is `{width}, {height}` i.e. a canvas with width `6` and height `4` will have a bottom-right pixel with co-ordinates `6,4`.