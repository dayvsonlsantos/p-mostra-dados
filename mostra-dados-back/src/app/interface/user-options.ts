export interface UserOptions {
    cardValueID: string,
    chartType: string,
    selectedOptions: string[],
    startDate: string,
    endDate: string,
    aggregate: string,
    timeGrouping: string,
    specificFilter: string
}
export interface DataOptions {
    user_id: number,
    cardValueID: string,
    chartType: string,
    selectedOptions: string[],
    startDate: Date,
    endDate: Date,
    aggregate?: string,
    timeGrouping: string,
    specificFilter: string
}