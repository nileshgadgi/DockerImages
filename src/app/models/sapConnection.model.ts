
export interface SAPConnection{
  id:number
  uuid: string;
  host: string;
  name: string;
  client: string;
  noSystem: string;
  customerUserId: number;
  username: string;
  password: string;
  language: string;
  sortOfSAPConnection: string;
  sapGroup: string;
  sid: string;
  libraryPath: string;
  protection: string;
}
export class SAPConnection {

  constructor(
  ) { }

}
