import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class CurrencyConverterService {
    current: number = 0;
    sellingRate: number = 0;
    buyingRate: number = 0 ;

    constructor() { }

    convert(amount: number): number {
      // Calculate the converted value based on the current, selling rate, and buying rate
      const convertedValue = (amount * this.sellingRate + amount * this.buyingRate) / 2;
      return convertedValue;
    }

    setRates(current: number, sellingRate: number, buyingRate: number) {
      this.current = current;
      this.sellingRate = sellingRate;
      this.buyingRate = buyingRate;
    }

    convertCurrency(amount: number, rateType: string) {
      if (rateType === 'selling') {
        return amount * this.sellingRate;
      } else {
        return amount * this.buyingRate;
      }
    }
  }

