/* eslint-disable @typescript-eslint/no-explicit-any */
export function reverseArray(arr:any[]) {
    const n:number = arr?.length || 0;
    const temp = new Array(n);
    for (let i = 0; i < n; i++)
        temp[i] = arr[n - i - 1];
  
    for (let i = 0; i < n; i++)
        arr[i] = temp[i];

    return arr
}
