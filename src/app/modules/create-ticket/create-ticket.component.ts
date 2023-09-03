import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TicketService } from 'src/app/service/ticket.service';

import * as moment from "moment";
import { AuthService } from 'src/app/service/auth.service';

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
  public userDetails: any;
  public isAuthorized: boolean = false;
  public isUpdateForm: boolean = false;
public ticketId: string= "";
  constructor(private _ticketService: TicketService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _auth: AuthService) {
    this.statusOption = [
      {label: "Open",  value: "open"},
      {label: "Active", value: "active"},
      {label: "Closed", value: "closed"},
    ];
    this.isNewTicket = this.config.data.ref === "create-ticket";
    this.isUpdateForm = this.config.data.ref === "update-ticket";
    this.userDetails = this._auth.userDetails;
    this.isAuthorized = this._auth.userDetails.userRole !== 1;
   }

  ngOnInit(): void {
    if(this.isUpdateForm){
      const {ticketName, ticketDescription, ticketStatus, ticketTime, ticketRemark, _id} = this.config.data.formData;
      this.ticketName = ticketName;
      this.ticketDescription = ticketDescription;
      this.ticketTime = moment(ticketTime).format('YYYY-MM-DD HH:mm:ss');
      this.ticketRemark = ticketRemark;
      this.ticketId = _id
    }
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

  public updateTicket(): void {
    const ticket ={
      ticketName: this.ticketName,
      ticketDescription: this.ticketDescription,
      ticketStatus: this.ticketStatus,
      ticketTime: this.ticketTime,
      ticketRemark: this.ticketRemark,
    };
    const ticketId = this.ticketId;
    this._ticketService.updateTicket(ticket, ticketId).subscribe({
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
