import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
})
export class AdminPage {
  currency: string | undefined;
  buyingRate: number | undefined;
  sellingRate: number | undefined;

  constructor(private db: AngularFireDatabase) {}

  updateRates() {
    const rate = {
      buying: this.buyingRate,
      selling: this.sellingRate
    };
    this.db.object(`rates/${this.currency}`).set(rate);
  }

}
