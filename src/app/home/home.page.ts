import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  baseCurrency: string = 'USD';
  targetCurrency: string = 'EUR';
  baseAmount!: number;
  convertedAmount!: number;
  conversionRates: any;
  conversionHistory: Observable<any[]>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.conversionHistory = db.list('conversions').valueChanges();
  }

  convertCurrency() {
    const apiUrl = `https://api.exchangeratesapi.io/latest?base=${this.baseCurrency}`;
    this.http.get(apiUrl).subscribe((data: any) => {
      this.conversionRates = data.rates;
      this.convertedAmount = this.baseAmount * this.conversionRates[this.targetCurrency];

      // Save conversion to Firebase
      this.db.list('conversions').push({
        base: this.baseCurrency,
        target: this.targetCurrency,
        baseAmount: this.baseAmount,
        convertedAmount: this.convertedAmount,
        timestamp: Date.now()
      });
    });
  }

}
