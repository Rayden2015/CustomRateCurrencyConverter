import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';



@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss']
})
export class AdminPage {

  baseCurrency: string = 'USD';
  exchangeRates: any = {};

  constructor(private db: AngularFireDatabase) {}

  saveExchangeRates() {
    this.db.object('exchangeRates').set({
      [this.baseCurrency]: this.exchangeRates
    });
  }

}
