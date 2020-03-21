import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../auction.service';
import { CategoryService  } from '../category.service';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit {

  auctions: Object;
  categories: Object;

  constructor(private _auctions: AuctionService, private _categories: CategoryService) { }

  onSave($event){
    // Get elements from the line
    var auctionTitle = ((document.getElementById("title") as HTMLInputElement).value);
    var auctionAuthor = ((document.getElementById("author") as HTMLInputElement).value); 
    var auctionBody = ((document.getElementById("body") as HTMLInputElement).value);
    var auctionCategory = ((document.getElementById("category") as HTMLSelectElement).value);
    // Save elements and get result
    this._auctions.saveNew(auctionTitle,auctionAuthor,auctionBody,auctionCategory).subscribe();

  }
  ngOnInit() {
    this._auctions.loadAll().subscribe(auctions => this.auctions = auctions);
    this._categories.loadAll().subscribe( categories => this.categories = categories);
  }

}
