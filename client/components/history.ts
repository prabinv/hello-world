/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, Directive, NgIf, NgFor} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';
import {StocksService, StockInterface} from '../services/stocks';

@Component({
  selector: 'history',
  viewBindings: [HTTP_BINDINGS, StocksService]
})
@View({
  template: `
    <h1>History</h1>
    <div>{{stockHistory | json}}</div>
  `
})
export class History {
  stockHistory: any;
  routeParam: RouteParams;
  service: StocksService;
	constructor(service: StocksService, routeParam: RouteParams) {
		this.routeParam = routeParam;
    this.service = service;
    service.getHistory(routeParam.params.stock)
      .subscribe(history => this.stockHistory = history)
	}
}
