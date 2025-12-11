import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidVersionService {
  private api = 'http://localhost:5222/VendorBidVersion';

  constructor(private http: HttpClient) {}

  // GET all (handles wrapped { data: [...] } or direct [])
  getAll(): Observable<any[]> {
    return this.http.get<any>(this.api).pipe(
      map(res => res?.data ?? res ?? [])
    );
  }

  // GET by id (handles wrapped { data: {...} } or direct object)
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`).pipe(
      map(res => res?.data ?? res)
    );
  }

  // CREATE (POST) -> returns created item (unwraps wrapper if present)
  create(data: any): Observable<any> {
    return this.http.post<any>(this.api, data).pipe(
      map(res => res?.data ?? res)
    );
  }

  // UPDATE (PUT) -> backend expects DTO in body (no id in URL)
  update(data: any): Observable<any> {
    return this.http.put<any>(this.api, data).pipe(
      map(res => res?.data ?? res)
    );
  }

  // DELETE -> unwrap if backend returns wrapper; otherwise raw
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`).pipe(
      map(res => res?.data ?? res)
    );
  }
}
