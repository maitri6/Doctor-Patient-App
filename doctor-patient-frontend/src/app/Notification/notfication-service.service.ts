import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotficationServiceService {

  constructor(private toast: ToastrService) { }
  
  showToastSuccess(message: string) {
    this.toast.success(message)
  }

  showToastError(message: string) {
    this.toast.error(message)
  }

  showToastInfo(message: string) {
    this.toast.info(message)
  }

  showToastWarning(message: string) {
    this.toast.warning(message)
  }
}
