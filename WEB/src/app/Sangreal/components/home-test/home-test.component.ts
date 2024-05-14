import { Component, NgZone, OnInit } from '@angular/core';
import { SangrealService } from '../../sangreal.service';
import { Observable, Subject, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-test',
  templateUrl: './home-test.component.html',
  styleUrl: './home-test.component.css',
})
export class HomeTestComponent implements OnInit {
  constructor(private readonly ss: SangrealService , private http: HttpClient) {}
  public sseResponse: any;
  public testObservable = of(() => {return Math.random()});

  public products:any 

  ngOnInit(): void {
 
    this.ss.sseResponse$.subscribe({
      next: (data) => {
        this.sseResponse = data;
      },
    });

    this.ss.methodIVan()

  }

  sseCall() {
    this.ss.readWithSSe();


  }



async makeCall(): Promise<void> {
   const obserFromHttp = await this.ss.makeCall()
    

 obserFromHttp.subscribe({
  next:(data) => {
    console.log(data)
    this.products = data
  },
  error:(error) => {
    console.log("ERROR")
    console.log(error)
  }
 })


  }
   

}
