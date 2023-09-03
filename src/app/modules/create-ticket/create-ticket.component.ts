import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TicketService } from 'src/app/service/ticket.service';

import * as moment from "moment";

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  public ticketName: string;
  public ticketDescription: string;
  public ticketStatus: string;
  public ticketTime: string =  moment().format('YYYY-MM-DD HH:mm:ss');
  public ticketRemark: string;
  public statusOption: {label: string; value: string}[];
  public isNewTicket: boolean = false;
  constructor(private _ticketService: TicketService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,) {
    this.statusOption = [
      {label: "Open",  value: "open"},
      {label: "Active", value: "active"},
      {label: "Closed", value: "closed"},
    ];
    this.isNewTicket = this.config.data.ref === "create-ticket";

   }

  ngOnInit(): void {

  }
  
  public submitTicket(): void {
    const ticket ={
      ticketName: this.ticketName,
      ticketDescription: this.ticketDescription,
      ticketStatus: this.ticketStatus,
      ticketTime: this.ticketTime,
      ticketRemark: this.ticketRemark,
    }
    this._ticketService.createTicket(ticket).subscribe({
      next: (response: any) => {
       console.log(response);
       this.ref.close(response)
    },
    error: (error: any) => {
        console.log(error);
    },
    })
  }


}
