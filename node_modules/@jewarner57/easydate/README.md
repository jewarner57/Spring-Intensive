![npm (scoped)](https://img.shields.io/npm/v/@jewarner57/easydate)
![GitHub issues](https://img.shields.io/github/issues/jewarner57/JSDateLibrary)
![GitHub repo size](https://img.shields.io/github/repo-size/jewarner57/JSDateLibrary)
![Coveralls](https://img.shields.io/coveralls/github/jewarner57/JSDateLibrary)
![Travis (.com)](https://img.shields.io/travis/com/jewarner57/JSDateLibrary)

## Easy Date
### Has the default JavaScript Date object left you frustrated and sad? Then Easy Date is here to bury your sadness under another level of abstraction.

<br>

### How to get started?
* You can [download easydate on npm](https://www.npmjs.com/package/@jewarner57/easydate)

<br>

### EasyDate Docs:
* Below is a list of EasyDate's methods with examples and tips for using them.

### when()
* Returns a human readable string of when a date will happen in relation to the current date.
``` javascript
const ED = new EasyDate('April 21, 2021')

ED.when('May 20, 2021') -> "29 days from now"
ED.when('April 17, 2021') -> "4 days ago"
```

### format()
* Create a date format string using our list of valid format codes and send it as an argument to the format method. It will return a formatted date.
``` javascript
const ED = new EasyDate('March 21, 2021, 4:03')

ED.format("%M-%D-%Y") -> "03-21-2021"
ED.format('%W, %B %d, %h:%I') -> 'Sunday, March 21, 4:03'
```

### Valid format codes and their meaning:
| Code |       Meaning      |
|------|--------------------|
|  %Y  | Full Year (2021)
|  %y  | Short year (21) 
|  %B  | Full month name (August)    
|  %b  | Abrev. month name (Aug)  
|  %M  | Zero padding month number July: (07)
|  %m  | Month number July: (7) 
|  %W  | Full weekday name (Monday)   
|  %w  | Abrev. weekday name (Mon)
|  %a  | Weekday number Sun: (0)   
|  %D  | Zero padded day of the month (09) 
|  %d  | Day of the month (9)
|  %H  | Zero padded hour 5pm: (05)
|  %h  | Hour (5)
|  %I  | Zero padded minute 5:07pm: (07)
|  %i  | Minute 5:07pm: (7)
|  %S  | Zero padded seconds 5:07:08pm: (08)
|  %s  | Seconds 5:07:08pm: (8)

<br>

### zeroPadNumber()
* Takes a number the number as a string preceded with a 0 if it is less than 10.
``` javascript
new EasyDate().zeroPadNumber(9) -> "09"
new EasyDate().zeroPadNumber(23) -> "23"
```

### Accessors
* Here is a list of accessible date object properties:

| Name |     Description     |      Example    |
|------|---------------------|-----------------|
| year | Gets the full year  | ED.year -> 2010 |
| yr   | Gets the short year | ED.yr -> 10     |
| month| Gets the full month | ED.month -> July|
| mon  | Gets the short month| ED.mon -> Jul   |
| numMonth | Gets the month number | Ed.numMonth -> 7 |
| day  | Gets the full day name | Ed.day -> Tuesday |
| dy   | Gets the short day name | Ed.dy -> Tues |
| numDay | Gets the day number| Ed.numDay -> 2 |
| dom  | Gets the date of the month | Ed.dom -> 6 |
| hours| Gets the hour of day| Ed.hours -> 7   |
| mins | Gets the current minute | Ed.mins -> 30|
| secs | Gets the current second | Ed.secs -> 10| 
