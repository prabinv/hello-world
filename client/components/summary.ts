/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, NgIf, NgClass} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

import {StockInterface} from '../services/stocks';

@Component({
  selector: 'summary',
  properties: ['stock: symbol']
})
@View({
  directives: [NgIf, NgClass, RouterLink],
  template: `
<div class="mdl-card stock-card mdl-shadow--2dp" [ng-class]="{increase: isPositive(), decrease: isNegative()}" style="width: 100%;">
  <span *ng-if="stock">
    <a [router-link]="['/history', {stock: stock.symbol.toUpperCase()}]">
      <div class="mdl-card__title">
        <h4 style="color: #fff; margin: 0">
          {{stock.symbol.toUpperCase()}}<br />
          {{stock.lastTradePriceOnly | currency:'USD':true:'.2'}}<br />
          {{stock.change | currency:'USD':true:'.2'}} ({{stock.changeInPercent | percent}})
        </h4>
      </div>
    </a>
  </span>
</div>
`
})
export class Summary {
  stock: StockInterface;

  isNegative() {
    if (!this.stock || this.stock.change >= 0) {
      return false;
    }

    return true;
  }

  isPositive() {
    if (!this.stock || this.stock.change <= 0) {
      return false;
    }

    return true;
  }
}
