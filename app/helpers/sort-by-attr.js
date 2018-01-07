export default function sortByAttr(attr, list) {
  const clone = list.slice();

  return clone.sort((a, b) => {
    if (a[attr] < b[attr]) {
      return -1;
    }

    if (a[attr] > b[attr]) {
      return 1;
    }

    return 0;
  });
}
