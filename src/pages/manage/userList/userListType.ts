export type SortType = {
    direction: String,
    propetryName: String
}

export type UserListParamsType = {
    page: Number,
    size: Number,
    search: any[],
    sort: SortType
}