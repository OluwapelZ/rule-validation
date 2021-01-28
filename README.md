# Rule Validation Service

### This service to serve a simple rule validation service```

The task:
Create a simple rule-validation API. 
(You are welcome to use ANY framework or third party library of your choice)

The response structure for your API should be fashioned after the popular JSEND pattern. 

Example:
{
  "message": "API response message",
  "status": "success",
  "data": {
    isValidForRule: true,
  }
}

"message" - Apt response message for your API. (Unless otherwise stated, this message can be anything you decide)
"status" - Status for your API response. The two possible values for this prop are "success" and "error" (PS: This isn't the response HTTP status code)
"data" - This is the meat of your API response. It should contain your actual response data.

Your rule-validation API should have just two routes.

1/ First route is the base route. HTTP GET "/"
It should return with data in the following format:

{
  "message": "My Rule-Validation API"
  "status": "success",
  "data": {
    "name": "Amos Burton",
    "github": "@amosburton",
    "email": "amosburton@rocinantecrew.com",
    "mobile": "08069920011",
    "twitter": "@amosb"
  }
}

Please note:
a/ name should be your full name
b/ github should be your github handle (the '@' symbol must be included)
c/ email should be your preferred email of contact 
d/ mobile should be your preferred mobile number of contact 
e/ twitter should be your twitter handle (the '@' symbol must be included). [PS: This field is optional, you can choose to include it in your response or not]

2/ Second route is the rule validation route. HTTP POST "/validate-rule"
The route should accept JSON data containing a rule and data field to validate the rule against. Example:
{
  "rule": {
    "field": "missions"
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": 45
  }
}

Endpoint requirements/constraints:
a/ The rule and data fields are required.

b/ The rule field should be a valid JSON object and should contain the following required fields: 
b1/ field: The field in the data passed to validate the rule against. Your implementation for the field should also support nested data objects.
e.g. if field is passed as "card.first6" it means you need to check to see if the data contains a card field, then check to see if the card field contains a first6 field.
[PS: The nesting should not be more than two levels]
b2/ condition: The condition to use for validating the rule. Accepted condition values are:
    i/ eq: Means the field value should be equal to the condition value 
    ii/ neq: Means the field value should not be equal to the condition value 
    iii/ gt: Means the field value should be greater than the condition value 
    iv/ gte: Means the field value should be greater than or equal to the condition value 
    v/ contains: Means the field value should contain the condition value
b3/ condition_value: The condition value to run the rule against. Your rule evaluation is expected to be like: 
["data.field"] ["rule.condition"] ["rule.condition_value"]

c/ The data field can be any of:
c1/ A valid JSON object 
c2/ A valid array
c3/ A string

### Setup
```
npm install
```

### Run Test
```
npm test
```

### Start App
###### Dev Environment
```
npm run dev
```

###### Dev Environment
```
npm run start
```