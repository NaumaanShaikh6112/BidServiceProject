import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class BidVirsionService {


  // private api =  'https://localhost:7104/VendorBidVersion';
   public api = "http://localhost:5222/VendorBidHeader";

  constructor(private http: HttpClient) {}

  // GET ALL
  getAll() {
    return this.http.get<any[]>(this.api);
  }

  // GET BY ID
  getById(id: string) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  // CREATE
  create(body: any) {
    return this.http.post(this.api, body);
  }

  // UPDATE
  update(id: string, body: any) {
    return this.http.put(`${this.api}/${id}`, body);
  }

  // DELETE
  delete(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
