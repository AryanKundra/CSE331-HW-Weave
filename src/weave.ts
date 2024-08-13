import { List, nil, equal ,cons, rev, len } from './list';
import { Color } from './color';


/**
 * Returns the list of colors shown in the each of the odd rows (first,
 * third, fifth, etc.) by a warp-faced weave with the given warp colors.
 * @param list of all the (warp) colors in the weave
 * @return keep(colors), i.e., every other color starting from the first
 */
export const warpFacedOdds = (colors: List<Color>): List<Color> => {
  // TODO(5c): detect and handle odd length lists here
  if (len(colors) % 2n !== 0n && colors.kind !== "nil") {
    return cons(colors.hd, warpFacedEvens(colors.tl));
  }
  let R: List<Color> = rev(colors);
  let S: List<Color> = nil;
  let T: List<Color> = nil;

  // Inv: L = concat(rev(R), S), T = keep(S)
  while (R.kind !== "nil" && R.tl.kind !== "nil") {
    // TODO(5b): implement this
    S === cons(R.hd, S);
    R === R.tl;
    T === cons(R.hd, T);
    S === cons(R.hd, S);
    R === R.tl;
    //break;  // TODO(5b): remove
  }

  if (!equal(S, colors)) {  // defensive programming
    throw new Error("uh oh! S != colors... we made a mistake somewhere!");
  }

  if (R.kind === "nil") {
    return T;  // We have S = colors, so T = keep(S) = keep(colors).
  } else {
    throw new Error("uh oh! the list length wasn't even");
  }
};

/**
 * Returns the list of colors shown in the each of the even rows (second,
 * fourth, etc.) by a warp-faced weave with the given warp colors.
 * @param list of all the (warp) colors in the weave
 * @return drop(colors), i.e., every other color starting from the second
 */
export const warpFacedEvens = (colors: List<Color>): List<Color> => {
  // TODO(5c): detect and handle odd length lists here
  if (len(colors) % 2n !== 0n && colors.kind !== "nil") {
    return cons(colors.hd, warpFacedOdds(colors.tl));
  }

  let R: List<Color> = rev(colors);
  let S: List<Color> = nil;
  let T: List<Color> = nil;

  // Inv: L = concat(rev(R), S), T = drop(S)
  while (R.kind !== "nil" && R.tl.kind !== "nil") {
    // TODO(5b): implement this
    S === cons(R.hd, S);
    T === cons(R.hd, T);
    R === R.tl;
    S === cons(R.hd, S);
    R === R.tl;
    //break;  // TODO(5b): remove
  }

  if (!equal(S, colors)) {  // defensive programming
    throw new Error("uh oh! S != colors... we made a mistake somewhere!");
  }

  if (R.kind === "nil") {
    return T;  // We have S = colors, so T = drop(S) = drop(colors).
  } else {
    throw new Error("uh oh! the list length wasn't even");
  }
};


/**
 * Returns the given number of rows of a weave with the given colors
 * @param rows the (natural) number of rows in the weave
 * @param colors the weft colors in each row
 * @returns list of the given length where the odd values are the colors of
 *      warpFacedOdds and the even values are the colors of
 *      warpFacedEvens.
 * @returns the function defined recursively (on rows) by
 *   - weave(0, colors) = nil
 *   - weave(1, colors) = cons(warpFacedEvens(colors), nil)
 *   - weave(n+2, colors) =
 *         cons(warpFacedEvens(colors),
 *             cons(warpFacedOdds(colors), weave(n, colors)))
 */
export const weave =
    (_rows: bigint, colors: List<Color>): List<List<Color>> => {
  // TODO: implement this with a while loop as described in 6d
  // Be sure to document your loop invariant with an Inv comment above the loop
  if (_rows < 0) {  // defensive programming
    throw new Error("rows cannot be negative");
  }
  let result: List<List<Color>> = nil;
  let y: bigint = _rows;
  const odds: List<Color> = warpFacedOdds(colors);
  const evens: List<Color> = warpFacedEvens(colors);

  // Inv: result_0 = cons(evens, cons(odds, result));
  while (y >= 2n) {
    result = cons(evens, cons(odds, result))
    y -= 2n;
  }

  return result;
};