import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit {

  auctions: Object;

  constructor(private _auctions: AuctionService) { }

  ngOnInit() {
    this._auctions.loadAll().subscribe(auctions => this.auctions = auctions);
  }

}
