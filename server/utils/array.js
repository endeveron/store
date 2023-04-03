export const isArrayIncludesObjectId = (array, objectId) => {
  const arrayOfStr = array.map((item) => item.toString());
  return arrayOfStr.includes(objectId);
};

export const removeArrayItemDuplicates = (prop, arr1, arr2) => {
  const idSet = new Set(arr1.map((el) => el[prop].toString()));
  return [...arr1, ...arr2.filter((el) => !idSet.has(el[prop].toString()))];
};
