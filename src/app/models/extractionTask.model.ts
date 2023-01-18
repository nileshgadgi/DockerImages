

export interface ExtractionTask{
  resource: string;
  customerSAPConfigurationId: number;
  sapTableCustomerId: number;
  dateStart: Date;
  dateEnd: Date;
  dataLocation: string;
  extractionStatus: string;
  totalItems: number;
  extractedItems: number;
  customerUserId: number;
  creationDate:Date;
  name:string;
}
export class ExtractionTask {

  constructor(
  ) { }

}
