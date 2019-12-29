import {Injectable} from '@angular/core';
//import { Http, Response } from '@angular/';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
 
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http:HttpClient) {}

  get(url: string) {
      return this.http.get(url);//.pipe(map((res:any) => res.json()));
  }
  
//   post(url: string, postData: Object) {
//       return this.http.post(url, postData).map((res:Response) => res.json());
//   }
  put(url: string, postData: Object) {
      return this.http.put(url, postData);//.map((res:Response) => res.json());
  }

//   patch(url: string, postData: Object) {
//       return this.http.patch(url, postData).map((res:Response) => res.json());
//   }

//   delete(url: string, postData: Object) {
//       return this.http.delete(url, postData).map((res:Response) => res.json());
//   }

}
