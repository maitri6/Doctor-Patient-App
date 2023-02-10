import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'doctor-patient-frontend';
  isLoggedIn :any= true;
  isLoggedInsss:any= localStorage.getItem('isLogged')
  loadData(){
    console.log("runs")
  }

  ngOnInit(): void {
    this.loadData()
  }
}
