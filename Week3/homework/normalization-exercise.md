- What columns violate 1NF?
  The columns food_code and food_description violate the 1NF because they contain two values or more in each row instead of just one. And also there is inconsistency in the dinner_date column where there are different types of data. like 2020-03-15 and Mar 25 '20. Moreover, venue_description column and member_address columns both also violate the 1NF. They contain non-atomic values.

  They should maybe be split into separate columns for each word. By doing that we will ensure that each cell contains only one value.

- What entities do you recognize that could be extracted?
  dinners, venues, foods.
- Name all the tables and columns that would make a 3NF compliant solution.

* members table
  member_id [PK] | member_name | member_address

* dinners table
  dinner_id [PK] | dinner_date

* venues table
  venue_code [PK] | venue_description

* foods table
  food_code [PK] | food_description

* members_and_dinners table
  id [PK] | member_id [FK] | dinner_id [FK]

* dinners_and_venues table
  id [PK] | dinners_id [FK] | venue_id [FK]

* dinners_and_foods
  id [PK] | dinners_id [FK] | food_id [PK]
