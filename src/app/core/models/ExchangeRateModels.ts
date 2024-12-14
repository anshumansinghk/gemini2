export interface ExchangeRateResponse {

    exchangeDate: string;
    exchangeRate: number;
    reverseExchangeRate: number;
}


export interface ExchangeRateQuery {

    organizationId: number;
    exchangeDate: string;
    sourceCurrencyCode: string;
    targetCurrencyCode: string;
}
