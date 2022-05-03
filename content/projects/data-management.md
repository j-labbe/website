---
title: Data Management
date: 2022-05-02T22:57:49.974Z
description: Highly-secure, custom application that allows an organization to
  quickly search through their contracts and customers.
projectLink: ""
image: /img/dm.png
tags: javascript,nodejs,data
---
From June 2021 until April 2022, I designed and built a cloud-based data management application for a company located in Florida. To protect the privacy and security of the company, they will not be named in this post, and neither will other details that may reveal sensitive details.

The project was broken into three phases:

1. Data Cleaning
2. Software, Systems, and Database Engineering
3. Integration and Error Resolution

## Phase 1 - Data Cleaning

What a mess the data was. Thousands of rows contained errors, multiple files had redundant data, and many of the formulas holding together various calculations were broken.

I first created a plan on which files would hold specific entities and attributes. This required hours of normalizing the data. I commonly found myself asking which attributes would create the best primary key, as the only viable candidate did not always have a unique value.

It took around three months of active work to comb through all the data and ensure it was both formatted and structured properly so that Phase 2 could commence.

## Phase 2 - Enterprise Cloud Application

The second phase was the longest, as around six months were required to complete from start to finish. This phase consisted of five sub-phases:

1. Database Design
2. Database Implementation
3. Application Design
4. Application Development
5. Database & Application Deployment

### 1. Database Design

While I cannot show you the reverse-engineered schema, there are nine tables that separate the different record types (and business deal types), as well as tables for any entities that are repeatable - such as any affiliates, whose records may be used in multiple rows and tables.

### 2. Database Implementation

Not much to write here either. I chose MySQL as the DBMS, since it is an *enterprise*-level DBMS that can scale easily. MySQL's portability allows for easy future extensibility & maintenance, which is important for this specific business.

One particular feature I had to take advantage of was MySQL's `CREATE FUNCTION` feature. Various fields are *derived*, and the users' ability to query the derived fields' values was a high priority.

<details>
<summary>Click here to expand & see an example of a function I created within MySQL</summary>

This function takes two dates, both stored as a `VARCHAR` (this is due to a few limitations, the `DATE` data type was not the correct fit for this instance)

The function returns an `INT`, which is of three possible values with context:

1. `Now` is before the start date
2. `Now` is after the start date, but before the end date (active status)
3. `Now` is after the end date

The context is determined by the back-end system. When a user queries this derived field, the context is determined by the back-end system (whether the status is before, active, or after expiration). 

```sql
DELIMITER $$

CREATE FUNCTION calc_days_out (begin_date VARCHAR(100), end_date VARCHAR(100))
RETURNS INT
NO SQL
BEGIN
	DECLARE begin_as_date DATE;
    DECLARE end_as_date DATE;
    DECLARE date_now DATE DEFAULT CURDATE();
    DECLARE calcd_days_out INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION RETURN -1;
    BEGIN
		DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET begin_as_date = STR_TO_DATE(begin_date, '%m/%d/%Y');
        SET begin_as_date = STR_TO_DATE(begin_date, '%m-%d-%Y');
	END;
    BEGIN
		DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET end_as_date = STR_TO_DATE(end_date, '%m/%d/%Y');
        SET end_as_date = STR_TO_DATE(end_date, '%m-%d-%Y');
	END;
    IF date_now < begin_as_date THEN
		SET calcd_days_out = DATEDIFF(date_now, begin_as_date);
	ELSEIF date_now > end_as_date THEN
		SET calcd_days_out = DATEDIFF(date_now, end_as_date);
	ELSE
		SET calcd_days_out = DATEDIFF(date_now, end_as_date);
	END IF;
    RETURN calcd_days_out;
    
END;$$

DELIMITER ;
```

</details>

<details>
<summary>Click here to expand and see another function that is used.</summary>

This function takes a number that is in a string (`VARCHAR`), and returns the `INT` value. MySQL Community v8.0.23 does not have this function.

```sql
CREATE FUNCTION ExtractNumber(in_string VARCHAR(50)) 
RETURNS INT
NO SQL
BEGIN
    DECLARE ctrNumber VARCHAR(50);
    DECLARE finNumber VARCHAR(50) DEFAULT '';
    DECLARE sChar VARCHAR(1);
    DECLARE inti INTEGER DEFAULT 1;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION RETURN 0;
    IF LENGTH(in_string) > 0 THEN
        WHILE(inti <= LENGTH(in_string)) DO
            SET sChar = SUBSTRING(in_string, inti, 1);
            SET ctrNumber = FIND_IN_SET(sChar, '0,1,2,3,4,5,6,7,8,9'); 
            IF ctrNumber > 0 THEN
                SET finNumber = CONCAT(finNumber, sChar);
            END IF;
            SET inti = inti + 1;
        END WHILE;
        RETURN CAST(finNumber AS UNSIGNED);
    ELSE
        RETURN 0;
    END IF;    
END$$
```

</details>

### 3 and 4. Application Design and Development

Since this application is for internal-use, it did not need to be extremely pretty. It did, however, need to be highly modular, follow best practices as to the structure of the file-tree and engineering methods, and be extremely fast. Most of the time I spent building this application was on the speed, reliability, and structure.

There are many components to this application, too many to go over in this post, however one component took around two months of 8 hours a day (average). That component is the Advanced Search feature.

Originally I was trying to make the data search process simple. After building the Basic Search method, which is simply a Google-like search box, I recognized it would be much easier to narrow search results by having an advanced method with filters and conditions.

![Basic Search Example](/img/screen-shot-2022-05-02-at-7.10.36-pm.png)

Admittedly, I expected the Advanced Search method to be relatively easy and simple to build out. Oh boy was I wrong. I ran through a few prototypes, with my goal still to keep the interface as simple as possible. I eventually stumbled upon [this project here](https://github.com/react-querybuilder/react-querybuilder), which solved a lot of problems with the QBE interface, and allowed for extremely customizable queries.

The problem with React-Querybuilder + my somewhat complex database structure is that many related entities and attributes are a few tables away from each other, making comparisons complex.

I crafted a four step method to process the Advanced Search queries:

![Four Step Process](/img/four-step-advanced-search.png)

This four-step process took nearly two months to implement because of the speed and reliability requirements. I had it working not too long after initially building it using the first three steps, but it took 8-10x longer to query than it should have. Adding the fourth step for optimizing the query (and also generally optimizing the code) allows the entire system to produce a query result that compares the conditions across hundreds of thousands of entities in just a few seconds. The optimization made it much faster than the Basic Search method.

![Advanced Search Interface](/img/screen-shot-2022-05-02-at-7.08.15-pm.png)

### 5. Deployment

The last part of Phase 2 was the final deployment. Our platform of choice was AWS because this business already had an application deployed there. I created an automated python script using boto3. If there is ever a need to deploy a second instance, or redeploy this instance, everything is set up automagically.

This part of the project required working very closely with the President and VPs, since there were specific AWS and IT-related restrictions in place. We also worked together to put various protections in for this application.

Ultimately, though, it was up to me to design how the system would work in AWS. I constructed a basic system that isolates all resources within a VPC, and attached routing rules and security groups to limit outside access to the EC2 instance. That is about as much detail as I can go into without potentially compromising the security of the resources.

## Phase 3
Phase 3 is just general support for the application. Any revisions, tutorials, or expansions can be completed during this phase, which has a specific end date.

## Closing

It was an honor and a privilege to work on this project with the people who were involved. I had an absolute blast learning and growing myself along the way, in addition to building a really cool application which opens the door for this business to gain new insights into their data. In the future, this application could be extended to other areas of the organization and feature a full dashboard with realtime insights. That was a little above the scope of this project, however.

If you have any questions about this project, feel free to email me! If I can answer it, I will!