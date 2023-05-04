// make array of objects like {label: "", value: ""} from 1 to n where n is the parameter
export const NumberToArray = (n: number | undefined) => {
  const arr: any = [];
  if (n === undefined) return arr;
  for (let i = 1; i <= n; i++) {
    arr.push({ label: `Module ${i}`, value: `${i}` });
  }
  console.log(arr);
  return arr;
};
