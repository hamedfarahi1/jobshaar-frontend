/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
// TODO(mmalerba): See if we can clean this up at some point.
import * as _moment from 'jalali-moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'jalali-moment';

const moment = _moment;

/** Configurable options for {@see MomentDateAdapter}. */
export interface MatMomentDateAdapterOptions {
	/**
	 * Turns the use of utc dates on or off.
	 * Changing this will change how Angular Material components like DatePicker output dates.
	 * {@default false}
	 */
  useUtc: boolean;
}

/** InjectionToken for moment date adapter to configure options. */
export const MAT_MOMENT_DATE_ADAPTER_OPTIONS = new InjectionToken<MatMomentDateAdapterOptions>(
  'MAT_MOMENT_DATE_ADAPTER_OPTIONS', {
  providedIn: 'root',
  factory: MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY
});


/** @docs-private */
export function MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY(): MatMomentDateAdapterOptions {
  return {
    useUtc: false
  };
}


/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}


/** Adapts Moment.js Dates for use with Angular Material. */
@Injectable()
export class JalaliMomentDateAdapter extends DateAdapter<Moment> {
  // Note: all of the methods that accept a `Moment` input parameter immediately call `this.clone`
  // on it. This is to ensure that we're working with a `Moment` that has the correct locale setting
  // while avoiding mutating the original object passed to us. Just calling `.locale(...)` on the
  // input would mutate the object.

  // tslint:disable-next-line:no-any
  private _localeData: any;

  constructor(@Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string,
    @Optional() @Inject(MAT_MOMENT_DATE_ADAPTER_OPTIONS)
    private _options?: MatMomentDateAdapterOptions) {

    super();
    this.setLocale(dateLocale || moment.locale());
  }

  setLocale(locale: string): void {
    super.setLocale(locale);

    const momentLocaleData = moment.localeData(locale);
    this._localeData = {
      firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
      longMonths: momentLocaleData.jMonths(),
      shortMonths: momentLocaleData.jMonthsShort(),
      dates: range(31, (i) => this.createDate(1390, 0, i + 1).locale('fa').format('D')),
      longDaysOfWeek: momentLocaleData.weekdays(),
      shortDaysOfWeek: momentLocaleData.weekdaysShort(),
      narrowDaysOfWeek: momentLocaleData.weekdaysMin(),
    };
  }

  getYear(date: Moment): number {
    return this.clone(date).year();
  }

  getMonth(date: Moment): number {

    return this.clone(date).month();
  }

  getDate(date: Moment): number {
    return this.clone(date).date();
  }

  getDayOfWeek(date: Moment): number {
    return this.clone(date).day();
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    // Moment.js doesn't support narrow month names, so we just use short if narrow is requested.
    return style === 'long' ? this._localeData.longMonths : this._localeData.shortMonths;
  }

  getDateNames(): string[] {
    return this._localeData.dates;
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (style === 'long') {
      return this._localeData.longDaysOfWeek;
    }
    if (style === 'short') {
      return this._localeData.shortDaysOfWeek;
    }
    return this._localeData.narrowDaysOfWeek;
  }

  getYearName(date: Moment): string {
    return this.clone(date).format('YYYY');
  }

  getFirstDayOfWeek(): number {
    return this._localeData.firstDayOfWeek;
  }

  getNumDaysInMonth(date: Moment): number {

    return this.clone(date).jDaysInMonth();
  }

  clone(date: Moment): Moment {
    return date.clone().locale(this.locale);
  }



  today(): Moment {
    return this._createMoment().locale(this.locale);
  }

  // tslint:disable-next-line:no-any
  parse(value: any, parseFormat: string | string[]): Moment | null {
    if (value && typeof value === 'string') {
      return this._createMoment(value, parseFormat, this.locale);
    }
    // tslint:disable-next-line:no-null-keyword
    return value ? this._createMoment(value).locale(this.locale) : null;
  }

  format(date: Moment, displayFormat: string): string {
    date = this.clone(date);
    if (!this.isValid(date)) {
      throw Error('MomentDateAdapter: Cannot format invalid date.');
    }
    return date.format(displayFormat);
  }

  addCalendarYears(date: Moment, years: number): Moment {
    return this.clone(date).add(years, 'year');
  }

  addCalendarMonths(date: Moment, months: number): Moment {
    return this.clone(date).add(months, 'month');
  }

  addCalendarDays(date: Moment, days: number): Moment {
    return this.clone(date).add(days, 'day');
  }

  toIso8601(date: Moment): string {
    return this.clone(date).format();
  }

	/**
	 * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
	 * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
	 * string into null. Returns an invalid date for all other values.
	 */
  // tslint:disable-next-line:no-any
  deserialize(value: any): Moment | null {
    let date;
    if (value instanceof Date) {
      date = this._createMoment(value).locale(this.locale);
    } else if (this.isDateInstance(value)) {
      // Note: assumes that cloning also sets the correct locale.
      return this.clone(value);
    }
    if (typeof value === 'string') {
      if (!value) {
        // tslint:disable-next-line:no-null-keyword
        return null;
      }
      date = this._createMoment(value, moment.ISO_8601).locale(this.locale);
    }
    if (date && this.isValid(date)) {
      return this._createMoment(date).locale(this.locale);
    }
    return super.deserialize(value);
  }

  // tslint:disable-next-line:no-any
  isDateInstance(obj: any): boolean {
    return moment.isMoment(obj);
  }

  isValid(date: Moment): boolean {
    return this.clone(date).isValid();
  }

  invalid(): Moment {
    return moment.invalid();
  }


  createDate(year: number, month: number, date: number): Moment {
    // Moment.js will create an invalid date if any of the components are out of bounds, but we
    // explicitly check each case so we can throw more descriptive errors.


    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    const result = this._createMoment({ year, month, date });
    // If the result isn't valid, the date must have been out of bounds for this month.
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result;
  }

  /** Creates a Moment instance while respecting the current UTC settings. */
  // tslint:disable-next-line:no-any
  private _createMoment(...args: any[]): Moment {
    let arg = '';
    if (args[0]) {
      if (args[0].year)
        arg += args[0].year + '/';
      if (args[0].month !== null)
        arg += args[0].month + 1 + '/';
      if (args[0].date !== null)
        arg += args[0].date;
    }
    moment.locale('fa');
    let date = moment();
    if (arg.length > 0)
      date = moment(arg, 'YYYY/M/D');
    return (this._options && this._options.useUtc) ? moment.utc(...args) : date;
  }
}
