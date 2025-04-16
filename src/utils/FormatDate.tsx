/* eslint-disable @typescript-eslint/no-explicit-any */
import { Temporal } from "@js-temporal/polyfill";

export const formatDate = (date: any): string => {
  return Temporal.PlainDate.from(date).toString(); // "YYYY-MM-DD"
};

export function selectedFormatDate(dateString: string): string {
  if (!dateString) {
    console.error("Date is null or undefined.");
    return "Invalid Date";
  }
  // Split the input date string
  const [day, month, year] = dateString.split("-");

  // Format day and month with leading zeros if necessary
  const formattedDay = day.padStart(2, "0");
  const formattedMonth = month.padStart(2, "0");

  // Return the formatted date string in the desired format
  return `${year}-${formattedMonth}-${formattedDay}`;
}

export function selectedCalenderFormatDate(dateString: string): string {
  if (!dateString) {
    console.error("Date is null or undefined.");
    return "Invalid Date";
  }

  // Split the input date string
  const [year, month, day] = dateString
    .split("-")
    .map((part) => parseInt(part, 10));

  // Format day and month with leading zeros if necessary
  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");

  // Return the formatted date string in the desired format
  return `${formattedDay}-${formattedMonth}-${year}`;
}

export function formatCalenderDate(date: string): string {
  if (!date) {
    console.error("Date is null or undefined.");
    return "Invalid Date";
  }
  const [day, month, year] = date.split("-");
  const formattedDay = day.length === 1 ? `0${day}` : day;
  const formattedMonth = month.length === 1 ? `0${month}` : month;

  return `${year}-${formattedMonth}-${formattedDay}`;
}

export const formatDateToMMDDYYYY = (date: Date): string => {
  const day = `0${date.getDate()}`.slice(-2); // Get the day and pad with zero if needed
  const month = `0${date.getMonth() + 1}`.slice(-2); // Get the month (0-indexed) and pad with zero
  const year = date.getFullYear(); // Get the full year

  return `${day}-${month}-${year}`;
};

export const formatTo12Hour = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  const formattedMinute = minute.toString().padStart(2, "0");

  return `${formattedHour}:${formattedMinute} ${period}`;
};
