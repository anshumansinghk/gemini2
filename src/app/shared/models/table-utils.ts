export class FILTER_DATA_CONSTANTS {

    static readonly FILTER_TYPES = {
        STARTS_WITH: 'STARTS_WITH',
        CONTAINS: 'CONTAINS',
        EQUAL: 'EQUAL'
    }
}

export interface FilterDataOptions {
    filterType?: string;
}
