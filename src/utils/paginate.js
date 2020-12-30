import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize; // formula to calculate the starting index for the itms on a page
  return _(items).slice(startIndex).take(pageSize).value();
}
