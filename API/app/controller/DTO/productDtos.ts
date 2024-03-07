// AT THE MOMENT THIS IS THE SAME AT CREATEDTO BUT WHEN FRONT END IS MADE WE MAY NEED TO CHANGE THIS IF WE SEND THE DATA IN A DIFFERENT WAY.
export interface createDTO {
  productName: string;
  size: number;
  color: string;
  origin: Countries;
}

export interface updateDTO {
  productName?: string;
  size?: number;
  color?: string;
  origin?: Countries;
}

export interface Product {
  id:string,
  productName: string;
  size: number;
  color: string;
  origin: Countries;
  deleted: boolean;
  deletedAt: Date | null;
}

// *** *** CAN'T DECLARE THIS AS A TYPE TO THE SCHEMA DON'T HAVE SOLUTION NOW, maybe mongooseSchemaFactory is needed to build the type ????
export type Countries =   "GERMANY" | "MACEDONIA"|"BRAZIL"| "U.S.A"

  

