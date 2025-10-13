---
title: "Display calendar using SQL"
excerpt: "Do you like solving SQL puzzles? There is a fun exercise you can try if you love racking your brain with tough SQL tasks - write a query to display current month in calendar format."
date: "2021-07-08"
---

Do you like solving SQL puzzles? There is a fun exercise you can try if you love racking your brain with tough SQL tasks - write a query to display current month in calendar format. The solution should work with months that have different week count. For example 2010-02-01 includes [only 4 weeks](https://www.timeanddate.com/calendar/monthly.html?year=2010&month=2&country=4), but 2017-10-01 includes [6 weeks](https://www.timeanddate.com/calendar/monthly.html?year=2017&month=10&country=4). Here is the example SQL output:

| Mon | Tu  | Wed | Thu | Fri | Sat | Sun |
| --- | --- | --- | --- | --- | --- | --- |
| 0   | 0   | 0   | 1   | 2   | 3   | 4   |
| 5   | 6   | 7   | 8   | 9   | 10  | 11  |
| 12  | 13  | 14  | 15  | 16  | 17  | 18  |
| 19  | 20  | 21  | 22  | 23  | 24  | 25  |
| 26  | 27  | 28  | 29  | 30  | 31  | 0   |

## Requirements

- No loops
- No stored procedures

Let's use MySQL to solve this puzzle.

## Hints

- You can use variables
- MySQL docs: [http://dev.mysql.com/doc/refman/5.0/en/date-and-time-functions.html](http://dev.mysql.com/doc/refman/5.0/en/date-and-time-functions.html)
- You can do queries without any schema, for example `SELECT 2+3, 'test'`
- You can use this online SQL Database: [https://www.db-fiddle.com/](https://www.db-fiddle.com/)

Is everything clear? Do solve it! Here I'll describe my solution.

## Step 1

We should generate a table starting from the first day of the current month and ending with the latest day of the current month. Let's find out those days:

```sql
SET @date = NOW();
SET @firstDayNumber = (SELECT WEEKDAY(DATE_FORMAT(@date,'%Y-%m-01')));
SET @daysInMonth = (SELECT DAY(LAST_DAY(@date)));
```

I've also created a variable holding the current date. Because we'll need to replace current date with other dates to test other months.

## Step 2

Now we need to generate a grid. The grid will have size 7 x 6. It's 7 days per week multiplied by maximum amount of weeks in a month. Here is an [example of such a month](https://www.timeanddate.com/calendar/monthly.html?year=2017&month=10&country=4).

How to generate a simple 3 x 3 grid:

```sql
SELECT 1, 2, 3
UNION
SELECT 4, 5, 6
UNION
SELECT 7, 8, 9
```

Let's use this approach to generate a 7 x 6 grid displaying numbers from 1 to 42:

```sql
SELECT
  startOfWeek + 1 AS 'Mon',
  startOfWeek + 2 AS 'Tue',
  startOfWeek + 3 AS 'Wed',
  startOfWeek + 4 AS 'Thu',
  startOfWeek + 5 AS 'Fri',
  startOfWeek + 6 AS 'Sat',
  startOfWeek + 7 AS 'Sun'
FROM (
    SELECT 0 startOfWeek UNION
    SELECT 7 UNION
    SELECT 14 UNION
    SELECT 21 UNION
    SELECT 28 UNION
    SELECT 35
) AS weeks
```

Here is the output:

| Mon | Tue | Wed | Thu | Fri | Sat | Sun |
| --- | --- | --- | --- | --- | --- | --- |
| 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| 8   | 9   | 10  | 11  | 12  | 13  | 14  |
| 15  | 16  | 17  | 18  | 19  | 20  | 21  |
| 22  | 23  | 24  | 25  | 26  | 27  | 28  |
| 29  | 30  | 31  | 32  | 33  | 34  | 35  |
| 36  | 37  | 38  | 39  | 40  | 41  | 42  |

## Step 3

Now we need to just shift the calendar. Make it start with the first day of month and finish with the last day of month. We have already found these values in the first step. If the number is out of range we'll put 0 instead of it.

```sql
SELECT
  IF(id + 1 < 1 OR id + 1 > @daysInMonth, 0, id + 1) 'Mon',
  IF(id + 2 < 1 OR id + 2 > @daysInMonth, 0, id + 2) 'Tue',
  IF(id + 3 < 1 OR id + 3 > @daysInMonth, 0, id + 3) 'Wed',
  IF(id + 4 < 1 OR id + 4 > @daysInMonth, 0, id + 4) 'Thu',
  IF(id + 5 < 1 OR id + 5 > @daysInMonth, 0, id + 5) 'Fri',
  IF(id + 6 < 1 OR id + 6 > @daysInMonth, 0, id + 6) 'Sat',
  IF(id + 7 < 1 OR id + 7 > @daysInMonth, 0, id + 7) 'Sun'
FROM (
    SELECT 0 - @firstDayNumber id UNION
    SELECT 7 - @firstDayNumber UNION
    SELECT 14 - @firstDayNumber UNION
    SELECT 21 - @firstDayNumber UNION
    SELECT 28 - @firstDayNumber UNION
    SELECT 35 - @firstDayNumber
) AS weeks
```

Here is the result:

| Mon | Tue | Wed | Thu | Fri | Sat | Sun |
| --- | --- | --- | --- | --- | --- | --- |
| 0   | 0   | 0   | 1   | 2   | 3   | 4   |
| 5   | 6   | 7   | 8   | 9   | 10  | 11  |
| 12  | 13  | 14  | 15  | 16  | 17  | 18  |
| 19  | 20  | 21  | 22  | 23  | 24  | 25  |
| 26  | 27  | 28  | 29  | 30  | 31  | 0   |
| 0   | 0   | 0   | 0   | 0   | 0   | 0   |

## Step 4

We're almost done! The only problem left - if current month has only 5 or 4 weeks, the last row will be empty (like in the example above). The simplest way to remove it is just to filter out an empty string:

```sql
SELECT
  IF(id + 1 < 1 OR id + 1 > @daysInMonth, 0, id + 1) 'Mon',
  IF(id + 2 < 1 OR id + 2 > @daysInMonth, 0, id + 2) 'Tue',
  IF(id + 3 < 1 OR id + 3 > @daysInMonth, 0, id + 3) 'Wed',
  IF(id + 4 < 1 OR id + 4 > @daysInMonth, 0, id + 4) 'Thu',
  IF(id + 5 < 1 OR id + 5 > @daysInMonth, 0, id + 5) 'Fri',
  IF(id + 6 < 1 OR id + 6 > @daysInMonth, 0, id + 6) 'Sat',
  IF(id + 7 < 1 OR id + 7 > @daysInMonth, 0, id + 7) 'Sun'
FROM (
    SELECT 0 - @firstDayNumber id UNION
    SELECT 7 - @firstDayNumber UNION
    SELECT 14 - @firstDayNumber UNION
    SELECT 21 - @firstDayNumber UNION
    SELECT 28 - @firstDayNumber UNION
    SELECT 35 - @firstDayNumber
) AS weeks
HAVING NOT (Mon = 0 AND Sun = 0)
```

Here is the result:

| Mon | Tue | Wed | Thu | Fri | Sat | Sun |
| --- | --- | --- | --- | --- | --- | --- |
| 0   | 0   | 0   | 1   | 2   | 3   | 4   |
| 5   | 6   | 7   | 8   | 9   | 10  | 11  |
| 12  | 13  | 14  | 15  | 16  | 17  | 18  |
| 19  | 20  | 21  | 22  | 23  | 24  | 25  |
| 26  | 27  | 28  | 29  | 30  | 31  | 0   |

We're done! Have fun and try to create your own solution.
