import Util from './Util'

test('Testing worldToLocal', () => {
    expect(Util.worldToLocal([1, 1, 5, 2, 2, 5])).toEqual([-9, -11, -5, -12, -8, -15]);
    expect(Util.worldToLocal([0, -5, -5, 0, 0, 0])).toEqual([-10, -5, -15, -10, -10, -10]);
    // console.log(Util.worldToLocal([0, -5, -5, 0, 0, 0]));
    // expect().toEqual();
});

test('Testing localToWorld', () => {
    expect(Util.localToWorld([1, 1, 5, 2, 2, 5])).toEqual([11, 9, 15, 8, 12, 5]);
    expect(Util.localToWorld([0, -5, -5, 0, 0, 0])).toEqual([10, 15, 5, 10, 10, 10]);
});

test('Testing checkWin', () => {
    expect(Util.checkWin([1, 1, 5, 2, 2, 5], [0, -5, -5, 0, 0, 0])).toEqual(false);
    expect(Util.checkWin([1, 1, 5, 2, 2, 5], [1, 1, 5, 2, 2, 5])).toEqual(true);
});

test('Testing checkIfInGrid', () => {
    expect(Util.checkIfInGrid([1, 1, 5, 2, 2, 5], 4)).toEqual(false);
    expect(Util.checkIfInGrid([1, 1, 5, 2, 2, 5], 10)).toEqual(true);
});

test('Testing pointInTri', () => {
    expect(Util.pointInTri([1, 1, 5, 2, 2, 5], 3, -5)).toEqual(false);
    expect(Util.pointInTri([1, 1, 5, 2, 2, 5], 2, 4)).toEqual(true);

    expect(Util.pointInTri([0, -5, -5, 0, 0, 0], 2, 4)).toEqual(false);
    expect(Util.pointInTri([0, -5, -5, 0, 0, 0], -1, -1)).toEqual(true);
});