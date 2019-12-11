const sort = field => (a, b) => {
  let fieldA = a[field];
  let fieldB = b[field];
  if (typeof field === "string") {
    fieldA = fieldA.toUpperCase();
    fieldB = fieldB.toUpperCase();
  }
  if (fieldA > fieldB) {
    return 1;
  } else if (fieldA < fieldB) {
    return -1;
  }
  return 0;
};

export default sort;
