import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';

import {PaymentDetail} from 'src/app/shared/payment-detail.model'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService, private toastrMessage: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }


  populateForm(selectedRecord: PaymentDetail)
  {
    this.service.formData= Object.assign({},selectedRecord);
  }

  onDeletePaymentRecord(id: number)
  {
    this.service.deletePaymentDetail(id).subscribe(res=>{
        this.service.refreshList();
        this.toastrMessage.error("THis Record has been deleted","Payment Detail Record");
    },
    err=>{
      this.toastrMessage.error("Something is wrong","Payment Detail Record");
    })
  }
}
