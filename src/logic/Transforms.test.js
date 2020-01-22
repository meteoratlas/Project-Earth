import Transforms from "./Transforms";
// Testing reflect, rotate and translate
test("Testing translate", () => {
  expect(Transforms.translate([1, 1, 5, 2, 2, 5], 3, -5)).toEqual([
    4,
    -4,
    8,
    -3,
    5,
    0
  ]);
  expect(Transforms.translate([0, -5, -5, 0, 0, 0], 4, -3)).toEqual([
    4,
    -8,
    -1,
    -3,
    4,
    -3
  ]);
});

test("Testing rotate", () => {
  expect(Transforms.rotate([1, 1, 5, 2, 2, 5], 30, 3, -5)).toEqual([
    4,
    1,
    8,
    0,
    7,
    4
  ]);
  expect(Transforms.rotate([0, -5, -5, 0, 0, 0], 90, 4, -3)).toEqual([
    2,
    1,
    7,
    6,
    7,
    1
  ]);
});

test("Testing reflect", () => {
  // reflectX
  expect(Transforms.reflect([1, 1, 5, 2, 2, 5], 0, 1, 0)).toEqual([
    1,
    -1,
    5,
    -2,
    2,
    -5
  ]);
  expect(Transforms.reflect([0, -5, -5, 0, 0, 0], 0, 1, 0)).toEqual([
    0,
    5,
    -5,
    0,
    0,
    -0
  ]);

  //reflectY
  expect(Transforms.reflect([1, 1, 5, 2, 2, 5], 1, 0, 0)).toEqual([
    -1,
    1,
    -5,
    2,
    -2,
    5
  ]);
  expect(Transforms.reflect([0, -5, -5, 0, 0, 0], 1, 0, 0)).toEqual([
    0,
    -5,
    5,
    0,
    -0,
    0
  ]);
});
