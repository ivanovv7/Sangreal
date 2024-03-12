import { Component, OnInit } from '@angular/core';
import { SangrealService } from '../../sangreal.service';

@Component({
  selector: 'app-home-test',
  templateUrl: './home-test.component.html',
  styleUrl: './home-test.component.css',
})
export class HomeTestComponent implements OnInit {
  constructor(private readonly ss: SangrealService) {}

  ngOnInit(): void {
    console.log('test');
  }

  // sseClose(){
  //   this.ss.closeSSE
  // }

  sseCall() {
    this.ss.readWithSSe();
  }
}
