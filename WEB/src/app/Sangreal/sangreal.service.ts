import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SangrealService {
  constructor(private readonly ngZone: NgZone) {}

  _sseResponse$: BehaviorSubject<any> = new BehaviorSubject([
    { productName: 'Value from Angular, before call' },
  ]);
  get sseResponse$() {
    return this._sseResponse$.asObservable();
  }

  readWithSSe() {
    const eventSource = new EventSource(
      'http://localhost:4321/products/sse_connection'
    );
    let parsedData: any = [];
    eventSource.onmessage = async (event) => {
      //The if check is to ignore the first data send from the SSE, we MUST USE ngZOne since the event is happening outside ANGULAR ->>
      // and we tell ANGULAR about this event with the ngZone
      if (event.data !== 'Connected') {
        this.ngZone.run(() => {
          parsedData = JSON.parse(event.data);
          this._sseResponse$.next(parsedData[0].data);
          //if status from SSE response is failure or success close the call
          if (parsedData[0].status === 'failure' || parsedData[0].status === 'success') {
            eventSource.close();
          }
        });
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      // Handle SSE errors here
    };

    setInterval(() => {
      eventSource.close();
    }, 25000);

    return of(parsedData);
  }

  //  WON'T WORK THIS WAY, HAS TO BE THE SAME EVENT INSTANCE
  closeSSE() {
    const eventSouce = new EventSource(
      'http://localhost:4321/products/sse_connection'
    );
    console.log('clicked');
    eventSouce.close();
  }
}
