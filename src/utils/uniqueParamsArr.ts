// 筛选参数去重
const uniqueAfterArr = (arr: any, name: string) => {
    let hash: any = {};
    return arr.reduce((acc: any, cru: any, index :any) => {
      if (!hash[cru[name]]) {
        hash[cru[name]] = { index: acc.length };
        acc.push(cru);
      } else {
        acc.splice(hash[cru[name]].index, 1, cru);
      }
      return acc;
    }, []);
};

export { uniqueAfterArr };