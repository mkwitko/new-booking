import { DefaultError } from "../DefaultError";

export type customerResponseData = {
  alphaId: string;
  customerId: number;
  name: string;
  active: boolean;
  tourAgencyId: number;
  mandatoryCostCenter: 'S' | 'N';
  allowNetRate: 'S' | 'N';
  allowCommissionedRate: 'S' | 'N';
  allowTourismTax: 'S' | 'N';
  cityRegNumber: string;
};

export interface ICustomerCtrl {
  findAgencyCustomer(companyId: number): void;
}

export interface ICustomersResponse {
  timestamp: Date;
  data: customerResponseData[];
  error?: DefaultError;
}
