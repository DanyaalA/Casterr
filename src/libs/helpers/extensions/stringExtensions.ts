interface String {
  toReadableDateTime(): string;
  equalsAnyOf(toCompareWith: Array<any>): boolean;
}

/**
 * Convert string of time codes to readable format.
 */
String.prototype.toReadableDateTime = function (this): string {
  let rdt = this;
  let now = new Date();

  //#region Day
  // Day of the month, 01 to 31
  if (this.includes("%d")) {
    rdt = rdt.replace("%d", now.getDate().toString());
  }

  // Abbreviated day of the week, Mon to Sun
  if (this.includes("%D"))
  {
    rdt = rdt.replace("%D", now.toLocaleString(undefined, { weekday: 'short' }));
  }

  // Full day of the week, Monday to Sunday (%l = lowercase L)
  if (this.includes("%l"))
  {
    rdt = rdt.replace("%l", now.toLocaleString(undefined, { weekday: 'long' }));
  }
  //#endregion

  //#region Month
  // Numeric representation of the month, 01 to 12
  if (this.includes("%m"))
  {
    rdt = rdt.replace("%m", now.getMonth().toString());
  }

  // Abbreviated month, Jan to Dec
  if (this.includes("%M"))
  {
    rdt = rdt.replace("%M", now.toLocaleString(undefined, { month: 'short' }));
  }

  // Full month, January to December
  if (this.includes("%F"))
  {
    rdt = rdt.replace("%F", now.toLocaleString(undefined, { month: 'long' }));
  }
  //#endregion

  //#region Year
  // Two digit representation of the year, 80 or 20
  if (this.includes("%y"))
  {
    rdt = rdt.replace("%y", now.toLocaleString(undefined, { year: 'short' }));
  }

  // Full numeric representation of the year, 1980 or 2020
  if (this.includes("%Y"))
  {
    rdt = rdt.replace("%Y", now.getFullYear().toString());
  }
  //#endregion

  //#region Time
  // Hour of the day (12-hour format), 01 to 12
  if (this.includes("%h"))
  {
    rdt = rdt.replace("%h", now.toLocaleString(undefined, { hour12: true }));
  }

  // Hour of the day (24-hour format), 00 to 23
  if (this.includes("%H"))
  {
    rdt = rdt.replace("%H", now.getHours().toString());
  }

  // Minutes since start of the hour, 00 to 59
  if (this.includes("%i"))
  {
    rdt = rdt.replace("%i", now.getMinutes().toString());
  }

  // Seconds since start of the minute, 00 to 59
  if (this.includes("%s"))
  {
    rdt = rdt.replace("%s", now.getSeconds().toString());
  }

  // Lowercase Ante Meridiem and Post Meridiem, am or pm
  if (this.includes("%a"))
  {
    // rdt = rdt.replace("%a", now.ToString("tt").ToLower());
  }

  // Uppercase Ante Meridiem and Post Meridiem, AM or PM
  if (this.includes("%A"))
  {
    // rdt = rdt.replace("%A", now.ToString("tt"));
  }
  //#endregion

  //#region Timezone
  // Difference to Greenwich time, +0100
  if (this.includes("%O"))
  {
    rdt = rdt.replace("%O", now.getTimezoneOffset().toString().replace(":", ""));
  }
  //#endregion

  return rdt.toString();
}

/**
 * Returns true if string equals any of the items in array.
 */
String.prototype.equalsAnyOf = function (this, toCompareWith: Array<any>): boolean {
  return toCompareWith.some((rdtw) => rdtw === this);
}
