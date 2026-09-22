import { Component } from '@angular/core';

@Component({
  selector: 'page1',
  imports: [],
  templateUrl: './page1.html',
  styleUrl: './page1.css',
})
export class Page1 {
  FirstName : string = "Yosef"
  LastName : string = "Kasas"
  name : string = "Yosef"
  age : number = 19
  stringArr : string[] = ['Bo','Erik','Bodil','Eriksonn'];
  numberArr : number[] = [41, 23, 55]
  sand : boolean = true;

  Create():void{
    console.log(this.FirstName)
    console.log(this.LastName)
  }
}
