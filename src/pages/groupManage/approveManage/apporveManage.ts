type sortTs = {
    propetryName: string,
    direction: string
}
  
type searchTs = {
    propetryName: string,
    operator: string,
    value: string
}
  
type paramsTs = {
    page: number,
    size: number,
    sorts: sortTs[],
    search: searchTs[]
}

type TableItem = {
    approveStatus: string,
    approveTime: number,
    infoName: string,
    userName: string
}