/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';
import {FORM_BINDINGS, FORM_DIRECTIVES, FormBuilder} from 'angular2/angular2';
import {HTTP_BINDINGS} from 'angular2/http';

import {StocksService} from '../services/stocks';

@Component({
    selector: 'trade',
    viewBindings: [FORM_BINDINGS, HTTP_BINDINGS, StocksService]
})
@View({
    directives: [NgFor, FORM_DIRECTIVES],
    template: `
  <h3>Trade</h3>
  <div class="demo-grid-1 mdl-grid">
    <div class="mdl-cell mdl-cell--4-col"></div>
    <div class="mdl-cell mdl-cell--4-col">
      <form [ng-form-model]="stockForm" style="margin-bottom: 5px;">
        <input ng-control="stock" class="mdl-textfield__input" type="text" placeholder="Quantity" />
      </form>
      <table class="mdl-data-table mdl-data-table--selectable mdl-shadow--2dp" style="width: 100%;">
        <tbody>
          <tr *ng-for="#symbol of symbols">
            <td class="mdl-data-table__cell--non-numeric">{{symbol}}</td>
            <td style="padding-top: 6px;">
              <button class="mdl-button" (click)="trade(symbol)">Trade</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mdl-cell mdl-cell--4-col"></div>

        <div class="mdl-cell mdl-cell--4-col">
<b>Trades:</b>
    <div>
      <ul>
        <li *ng-for="#trade of tradestocks">
          {{trade.symbol}} qty:{{trade.qty}}
        </li>
      </ul>
    </div>
    </div>
  </div>
`
})
export class Trade {
    symbols:Array<string>;
    tradestocks:Array<any>;
    //trades:Array<string>;

    service:StocksService;
    stockForm:any;

    constructor(service:StocksService) {
        this.service = service;
        this.symbols = service.get();
        this.tradestocks = [];
        //this.symbols.forEach(item =>{
        //    this.tradestocks.push({symbol:item, qty:0});;
        //});
        let builder = new FormBuilder();
        this.stockForm = builder.group({
            stock: ['']
        })
    }

    trade(symbol) {
        this.tradestocks.push({symbol:symbol, qty:this.stockForm.value.stock});
    }
}

//class TradeStock{
//    symbol:string;
//    qty:number;
//
//    constructor(symbol){
//        this.symbol = symbol;
//    }
//}


