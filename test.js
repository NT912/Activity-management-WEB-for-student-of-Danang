const originalDate = "Mon May 27 2024 00:00:00 GMT+0700 (Indochina Time)";

// Parse the date string into a Date object
const dateObject = new Date(originalDate);

// Define the desired format string (year-month-day)
const formatString = "yyyy-MM-dd";

// Use Intl.DateTimeFormat (locale is not relevant for yyyy-MM-dd format)
const formatter = new Intl.DateTimeFormat("en", { // Any locale works here
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const formattedDate = formatter.format(dateObject);

console.log(formattedDate);
