import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { PaymentDetail } from './payment-detail.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {


  readonly baseUrl="http://localhost:4398/api/PaymentDetail";
  constructor(private http: HttpClient) { }

  formData: PaymentDetail = new PaymentDetail();

  list: PaymentDetail[];


  postPaymentDetail()
  {
   return this.http.post(this.baseUrl,this.formData);
  }

  putPaymentDetail()
  {
   return this.http.put(`${this.baseUrl}/${this.formData.paymentDetailId}`,this.formData);
  }

  deletePaymentDetail(id: number)
  {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  refreshList()
  {
    this.http.get(this.baseUrl)
    .toPromise()
    .then(res=>{
      this.list= res as PaymentDetail[]
    });
  }

}
