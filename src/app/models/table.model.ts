import { CascadingConstraint } from "./cascadingConstraint.model";

export interface Table{
  tableName: string;
  columns: string[];
  whereClause: string;
  cascadingConstraint:CascadingConstraint
}
export class Table {

  constructor(
  ) { }

}
