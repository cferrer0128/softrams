import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  DEBUG: Boolean = true;
  api = '';
  username: string;

  constructor(private http: HttpClient) {
    this.api = this.DEBUG?'http://localhost:3000':'http://localhost:8000'; 
  }

  // Returns all members
  getMembers() {
    
    return this.http.get(`${this.api}/members`).pipe(catchError(this.handleError));
   
  }

  getMembersByid(id:string) {
    let Paramid="";

    if(id && id !="0")
      Paramid = id.length>0?id:"";

    return this.http.get(`${this.api}/members/${Paramid}`).pipe(catchError(this.handleError));
   
  }


  setUsername(name: string): void {
    this.username = name;
  }

  addMember(memberForm) {
    return this.http.post(`${this.api}/members`,memberForm).pipe(catchError(this.handleError));
  }
  
  editMember(memberForm) {
    return this.http.put(`${this.api}/members/${memberForm.id}`,memberForm).pipe(catchError(this.handleError));
  }

  deleteMember(id) {
    return this.http.delete(`${this.api}/members/${id}`).pipe(catchError(this.handleError));
  }

  getTeams() {
    return this.http.get(`${this.api}/teams`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
