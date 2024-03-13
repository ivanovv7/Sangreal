import { Component, NgZone, OnInit } from '@angular/core';
import { SangrealService } from '../../sangreal.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-home-test',
  templateUrl: './home-test.component.html',
  styleUrl: './home-test.component.css',
})
export class HomeTestComponent implements OnInit {
  constructor(private readonly ss: SangrealService) {}
  public sseResponse: any;

  ngOnInit(): void {
  
    this.ss.sseResponse$.subscribe({
      next: (data) => {
        this.sseResponse = data;
      },
    });
  }

  sseCall() {
    this.ss.readWithSSe();
  }
}
