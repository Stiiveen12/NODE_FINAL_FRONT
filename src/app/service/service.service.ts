import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = 'http://localhost:5000/heroes'
  constructor(private http:HttpClient) { 
 
  }

  getContact():Observable<any>{
    return this.http.get<any>(this.url)
  }
  delete(id:any){
    return this.http.delete<any>(`${this.url}/${id}`)
  }
  agregar(form:any):Observable<any>{
    const headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    return this.http.post<any>(`${this.url}`,form,{headers})
  }
  update(form:any,id:number):Observable<any>{
    const headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    console.log(`${this.url}/${id}`,form,{headers})
    return this.http.put<any>(`${this.url}/${id}`,form,{headers})
  }
}
