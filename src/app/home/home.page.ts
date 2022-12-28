import { Component, OnInit } from '@angular/core';
import { CurrencyConverterService } from '../services/currencyconverter.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    convertedValue: number = 0;
  constructor(private currencyConverter: CurrencyConverterService) {}

  ngOnInit() {}

  setRates(form: any) {
    // Set the current, selling rate, and buying rate in the conversion service
    this.currencyConverter.current = form.value.current;
    this.currencyConverter.sellingRate = form.value.sellingRate;
    this.currencyConverter.buyingRate = form.value.buyingRate;


    this.currencyConverter.setRates(form.value.current, form.value.sellingRate, form.value.buyingRate);
  }

  convertCurrency(form: any) {
    // Call the convert method in the conversion service and set the converted value
    this.convertedValue = this.currencyConverter.convert(form.value.amount);
  }
}
