import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TicketService } from 'src/app/service/ticket.service';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';

@Component({
  selector: 'app-action-tickets',
  templateUrl: './action-tickets.component.html',
  styleUrls: ['./action-tickets.component.scss']
})
export class ActionTicketsComponent implements OnInit {

  tickets = [];

  constructor(public dialogService: DialogService,
    public messageService: MessageService,
    private _ticketService: TicketService,
    private _ref: DynamicDialogRef,) { }

  ngOnInit(): void {
    this.getActionTickets();
  }

  public updateTicket(ticket: any){
    this.dialogService.open(CreateTicketComponent, {
     height: "80%",
     width: "70%",
     closeOnEscape: true,
     showHeader: true,
     header: "Update Ticket",
     data: {
       ref: "update-ticket",
       formData : ticket
     },
     closable: true,
     style: { "max-width": "100%", "max-height": "100%" },
     styleClass: "mobileView",
 });

 this._ref.onClose.subscribe((product) => {
     if (product) {
         this.messageService.add({ severity: 'info', summary: 'Ticket Raised', detail: "Ticket Raised" });
     }
 });
 }

 public getActionTickets(){
  this._ticketService.getActionTickets().subscribe({
    next: (response)=>{
      this.tickets = response;
    }
  })
 }

}
