import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  serverUrl: string;

  constructor(private http: HttpClient) {
      this.serverUrl = environment.serverUrl;
  }

    public createTicket(ticket: any): Observable<Object> {
      return this.http.post(
          `${this.serverUrl}create-ticket`,
          ticket
      );
    }

    public getRaisedTickets(): Observable<any[]> {
      return this.http.get<any[]>(
          `${this.serverUrl}get-individual-ticket`
      );
    }
    public updateTicket(ticket, ticketId): Observable<any[]> {
      return this.http.put<any[]>(
          `${this.serverUrl}update-ticket`, {ticket, ticketId}
      );
    }

    public getActionTickets(): Observable<any[]> {
      return this.http.get<any[]>(
          `${this.serverUrl}get-action-ticket`
      );
    }
    

}
