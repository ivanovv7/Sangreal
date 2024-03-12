import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SangrealService {
  constructor(private http: HttpClient) {}


  // readWithSSe(){
  //   this.http.get("http://localhost:4321/products/sse_connection").subscribe({

  //   next:(data) => {
  //     console.log(data)
  //   },
  //   error:(error) => {
  //     console.log("Error happened", error)
  //   }
  //   })
  // }

  readWithSSe() {
    const eventSource = new EventSource('http://localhost:4321/products/sse_connection');

    eventSource.onmessage = (event) => {
      console.log('data', event.data);
      //This block is executed as many times as there are responses/streams from the server. 
      //Meaning we can have if check here and close the conneection uppon a condition instead of a setInterval().
      // EX: status: faliure | success -->> close the SSE request
      console.log("happened") 
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      // Handle SSE errors here
    };

    setInterval(() => {
      eventSource.close();
    }, 16500);
  }



  //  WON'T WORK THIS WAY, HAS TO BE THE SAME EVENT INSTANCE
  closeSSE() {
    const eventSouce = new EventSource('http://localhost:4321/products/sse_connection');
    console.log('clicked');
    eventSouce.close();
  }
}
