import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service: PaymentDetailService, private toastrMessage: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.paymentDetailId ==0)
    {
      this.insertPaymentOperation(form);
    }
    else
    {
      this.updatePaymentOperation(form);
    }
  }

  insertPaymentOperation(form: NgForm)
  {
    this.service.postPaymentDetail().subscribe(
      res=>{
        console.log("Succesfully Save data");
        this.reSetForm(form);

        this.toastrMessage.success("Submitted Successfully...","Payment Detaul Request");
        this.service.refreshList();
      },
      err=>{
        console.log(err);
      }
    )
  }

  updatePaymentOperation(form: NgForm)
  {
    this
    .service.putPaymentDetail().subscribe(res=>{
      this.reSetForm(form);
      this.toastrMessage.info("Updated Successfully...","Payment Detaul Request");
      this.service.refreshList();
    },
    err=>{
      this.toastrMessage.error("Something is wrong..","Payment Detaul Request");
    }
    );
  }

  reSetForm(form:NgForm)
  {
    // Form reset
    form.form.reset();

      // clearnig all the form fields..
    this.service.formData= new PaymentDetail();
  }
}
