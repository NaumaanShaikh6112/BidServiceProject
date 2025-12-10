// src/app/bid-version/services/bid-version.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidVersionService {
  // change base URL if your API path differs
  private api = 'http://localhost:5222/VendorBidVersion';

  constructor(private http: HttpClient) {}

  // get all versions (optionally filter by headerId query param)
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  // get versions for a given header
  getByHeader(headerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}?headerId=${headerId}`);
  }

  getById(id: string) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  create(body: any) {
    return this.http.post(this.api, body);
  }

  update(id: string, body: any) {
    return this.http.put(`${this.api}/${id}`, body);
  }

  delete(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
