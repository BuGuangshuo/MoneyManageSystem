export type SortType = {
    direction: String,
    propetryName: String
}

export type UserListParamsType = {
    page: Number,
    size: Number,
    sort: SortType
}