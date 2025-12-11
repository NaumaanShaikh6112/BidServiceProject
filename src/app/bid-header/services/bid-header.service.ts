import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BidHeaderService {

// public apiUrl = "https://localhost:7104/VendorBidHeader";
 public apiUrl = "http://localhost:5222/VendorBidHeader";

  constructor(public http: HttpClient) {}

  // CREATE (POST)
  save(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      // Extract data from wrapper if present
      map(res => res.data ? res.data : res)
    );
  }

  // GET ALL (LIST)
  getAll(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        // Handle if response is wrapper OR direct array
        return response.data ? response.data : response;
      })
    );
  }

  // GET BY ID
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(res => res.data ? res.data : res)
    );
  }

  // UPDATE (PUT)
  update(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${data.id}`, data).pipe(
       // Extract data from wrapper if present
       map(res => res.data ? res.data : res)
    );
  }

  // DELETE
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
