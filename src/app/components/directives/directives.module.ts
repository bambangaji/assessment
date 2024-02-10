import { NgModule } from '@angular/core';
import { InputRuleDirective } from './input-rule/input-rule.directive';

@NgModule({
  declarations: [
    InputRuleDirective,
  ],
  exports: [
    InputRuleDirective,
  ]
})
export class DirectivesModule {}
