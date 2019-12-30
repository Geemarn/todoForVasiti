//sorting an array of object
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const bandA = a.band.toUpperCase();
  const bandB = b.band.toUpperCase();

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}

///to get max value of an array
function max(arr) {
  let max = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
    return max;
  }
}

///to get min value of an array
function min(arr) {
  let min = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
    return min;
  }
}
