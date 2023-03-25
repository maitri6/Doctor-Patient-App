import { Component ,OnInit} from '@angular/core';
import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router } from '@angular/router';
import { PatientServiceService } from '../Services/patient-service.service';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.css']
})
export class DiseaseComponent implements OnInit{
  constructor(
    private notifyService: NotficationServiceService,
    private router: Router,
    private patientService: PatientServiceService
  ) {}

  ngOnInit(): void {
     this.getAllDisease();
  }
  DiseaseList: any;
  // get all Disease
  getAllDisease() {
    this.patientService.getAllDiseasesList().subscribe(
      (res: any) => {
        this.DiseaseList = res.data;
        console.log("this.DiseaseList",this.DiseaseList)
        this.notifyService.showToastSuccess(res.statusMessage);
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/diseaseList']);
          this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }
}
