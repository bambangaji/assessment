import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { TimeFormatPipe } from './time-format/time-format.pipe';
import { InisialNamePipe } from './inisial-name/inisial-name.pipe';


@NgModule({
  declarations:[
    TimeFormatPipe,
    InisialNamePipe
  ],
  imports:[CommonModule],
  exports:[
    InisialNamePipe,
    TimeFormatPipe
  ],
})

export class PipesModule{};
