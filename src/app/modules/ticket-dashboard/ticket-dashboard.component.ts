import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';
import { TicketService } from 'src/app/service/ticket.service';

@Component({
  selector: 'app-ticket-dashboard',
  templateUrl: './ticket-dashboard.component.html',
  styleUrls: ['./ticket-dashboard.component.scss']
})
export class TicketDashboardComponent implements OnInit {

  tickets = [];

  constructor(public dialogService: DialogService,
    public messageService: MessageService,
    private _ticketService: TicketService,
    private _ref: DynamicDialogRef,) { }

  ngOnInit(): void {
    this.getIndividualTickets();
  }

  public createTicket(){
     this.dialogService.open(CreateTicketComponent, {
      height: "80%",
      width: "70%",
      closeOnEscape: true,
      showHeader: true,
      header: "Raise Ticket",
      data: {
        ref: "create-ticket"
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

  public getIndividualTickets(){
    this._ticketService.getRaisedTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
      }
    })
  }

}
