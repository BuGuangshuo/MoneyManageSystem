export const initParams = {
    page: 1,
    size: 10,
    sorts: [{ propetryName: "createTime", direction: "desc" }],
    search: [
        { propetryName: 'approveName', operator: 'EQ', value: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '').username : '' },
        { propetryName: 'approveStatus', operator: 'EQ', value: 'RUNNING' }
    ]
}