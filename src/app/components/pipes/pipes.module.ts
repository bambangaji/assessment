import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { TimeFormatPipe } from './time-format/time-format.pipe';
import { InisialNamePipe } from './inisial-name/inisial-name.pipe';
import { CustomCurrencyPipe } from './custom-currency/custom-currency.pipe';


@NgModule({
  declarations:[
    TimeFormatPipe,
    InisialNamePipe,
    CustomCurrencyPipe
  ],
  imports:[CommonModule],
  exports:[
    InisialNamePipe,
    TimeFormatPipe,
    CustomCurrencyPipe
  ],
})

export class PipesModule{};
