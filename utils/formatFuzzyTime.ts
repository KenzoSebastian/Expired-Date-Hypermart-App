import { addHours } from "date-fns";
import { formatDate } from "./dateFormatter";

export const formatFuzzyTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = addHours(new Date(), 7);

  const deltaSeconds = Math.round((now.getTime() - date.getTime()) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30.5;

  let fuzzy;

  if (deltaSeconds < 30) {
    fuzzy = "just now";
  } else if (deltaSeconds < minute) {
    fuzzy = deltaSeconds + " seconds ago";
  } else if (deltaSeconds < 2 * minute) {
    fuzzy = "1 minute ago";
  } else if (deltaSeconds < hour) {
    const minutes = Math.floor(deltaSeconds / minute);
    fuzzy = minutes + " minutes ago";
  } else if (deltaSeconds < 2 * hour) {
    fuzzy = "1 hour ago";
  } else if (deltaSeconds < day) {
    const hours = Math.floor(deltaSeconds / hour);
    fuzzy = hours + " hours ago";
  } else if (deltaSeconds < 2 * day) {
    fuzzy = "1 day ago";
  } else if (deltaSeconds < 7 * day) {
    const days = Math.floor(deltaSeconds / day);
    fuzzy = days + " days ago";
  } else if (deltaSeconds < 2 * week) {
    fuzzy = "1 week ago";
  } else if (deltaSeconds < month) {
    const weeks = Math.floor(deltaSeconds / week);
    fuzzy = weeks + " weeks ago";
  } else if (deltaSeconds < 2 * month) {
    fuzzy = "1 month ago";
  } else if (deltaSeconds < 12 * month) {
    const months = Math.floor(deltaSeconds / month);
    fuzzy = months + " months ago";
  } else {
    fuzzy = formatDate(date);
  }

  return fuzzy;
};
