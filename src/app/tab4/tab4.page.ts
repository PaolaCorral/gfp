import { Component, OnInit, ViewChild } from '@angular/core';
import {Chart } from 'chart.js';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Key } from 'protractor';
import { CrudService } from '../services/crud.service';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas1') lineCanvas1;
  lineChart: any;
  lineChart1: any;
 
  constructor(public navCtrl: NavController, private db: AngularFirestore, private crudService: CrudService ) {}

    /*return this.usersCollection.doc(this.userId).collection('income').doc<Income>(id).valueChanges();
    this.items.on('value',(snapshot)=>{
        this.xArray.splice(0, this.xArray.length);
        this.yArray.splice(0, this.yArray.length);
        snapshot.forEach((childSnapshot)=>{
          this.xArray.push(childSnapshot.key);
          this.yArray.push(childSnapshot.val());
        });
        this.lineChartMethod(this.xArray, this.yArray);
    });
   }*/

  ngOnInit() {
    this.lineChartMethod();
    this.lineChartMethod1();

  }
  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Beca', 'Loteria'],
        datasets: [
          {
            label: 'Ingresos',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [10000, 5000],
            spanGaps: false,
          }
        ]
      }
    });
  }
  lineChartMethod1() {
    this.lineChart1 = new Chart(this.lineCanvas1.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Sell per week',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          }
        ]
      }
    });
  }

}