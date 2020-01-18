import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { StringIndexer } from '@app/shared/configs/interfaces.config';

@Injectable({
  providedIn: 'root'
})
export class EnumsUtil {
  constructor() {
    this.initialize();
  }
  private static enums: EnumIndexer = {};
  private static enumNames: StringIndexer = {};
  private static enumArrays: ArrayIndexer = {};

  public initialize(): void { }

  public getValues(columnName: string): KeyValue<number, string>[] {
    return EnumsUtil.enums[this.getEnumName(columnName)];
  }

  public getArrayValues(enumName: string): KeyValue<number, number[]>[] {
    return EnumsUtil.enumArrays[this.getEnumName(enumName)];
  }

  public getEnumName(columnName: string): string {
    if (columnName in EnumsUtil.enumNames)
      return EnumsUtil.enumNames[columnName];
    throw new Error('invalid column name provided');
  }

}

interface EnumIndexer {
  [key: string]: KeyValue<number, string>[];
}

interface ArrayIndexer {
  [key: string]: KeyValue<number, number[]>[];
}
