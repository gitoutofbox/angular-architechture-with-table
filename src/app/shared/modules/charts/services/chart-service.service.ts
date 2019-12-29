import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  constructor() { }

  deepMerge(...sources) {
    let acc = []
    for (const source of sources) {
      if (source instanceof Array) {
        if (!(acc instanceof Array)) {
          acc = []
        }
        acc = [...acc, ...source]
      } else if (source instanceof Object) {
        for (let [key, value] of Object.entries(source)) {
          if (value instanceof Object && key in acc) {
            value = this.deepMerge(acc[key], value)
          }
          acc = { ...acc, [key]: value }
        }
      }
    }
    return acc
  }
}
