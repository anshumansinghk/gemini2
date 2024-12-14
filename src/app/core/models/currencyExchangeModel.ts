export interface CurrencyExchangeRequest{
    organizationId: number; 
    exchangeDate: string;
    sourceCurrencyCode: string; 
    targetCurrencyCode:string;
}

export interface CurrencyExchangeResponse{
    exchangeDate: string;
    exchangeRate: number;
    reverseExchangeRate: number;
}