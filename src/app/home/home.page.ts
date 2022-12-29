import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  baseAmount: number = 0;
  baseCurrency: string = 'USD';
  targetCurrency: string = 'EUR';
  conversionRates: any;
  convertedAmount: number = 0;
  buyingRates: any;
  sellingRates: any;
  mode: string = 'buying';

  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  convertCurrency() {
    this.db.object('rates').valueChanges().subscribe((rates: any) => {
      console.log('Rates received', rates);
      console.log('Target currency received', this.targetCurrency);
      this.conversionRates = rates;
      console.log(this.conversionRates[this.targetCurrency][this.mode]);
      this.convertedAmount = this.baseAmount * this.conversionRates[this.targetCurrency][this.mode];

      console.log('Converted Amount ',this.convertedAmount);
      this.buyingRates = {};
      this.sellingRates = {};
      for (const currency in this.conversionRates) {
        this.buyingRates[currency] = this.conversionRates[currency].buying;
        this.sellingRates[currency] = this.conversionRates[currency].selling;
      }
    });
  }
}
