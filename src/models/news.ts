export class News {

    constructor(fields: any) {
      for (const f in fields) {
        // @ts-ignore
        this[f] = fields[f];
      }
    }
  
  }
  
  export interface News {
    [prop: string]: any;
  }
  