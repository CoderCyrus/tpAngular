import { Injectable } from '@angular/core';
import { HttpClient }from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _serverURL = 'http://localhost:8000';

  constructor(private _httpClient: HttpClient) { }

  loadAll() {
    return this._httpClient.get(this._serverURL+"/listCategories");
  }
}
