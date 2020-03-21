import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private _serverURL = 'http://localhost:8000';

  constructor(private _httpClient: HttpClient) { }

  loadAll() {
    return this._httpClient.get(this._serverURL + "/listAuctions");
  }

  saveNew(auctionTitle: string, auctionAuthor: string, auctionBody: string, auctionCategory: string) {
    var newObject = {
      "id": -1,
      "title": auctionTitle,
      "author": auctionAuthor,
      "body": auctionBody,
      "category":auctionCategory
    }
    var result = this._httpClient.post(this._serverURL+"/addAuctions", newObject);
    return result;
  }
}
