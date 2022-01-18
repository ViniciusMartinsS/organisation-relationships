# Organisation Manager
This service aims to manage organisation relationships.

## API Documentation

<details>
  <summary><b>List Organisation</b></summary>

  </br>

  > **List a specific organisation and its relationships**

  #### URL
  `/organisation/path_parameter`

  #### Method
  `GET`

  #### Path Parameter
  `organisation`

  #### Query Parameter
  `offset`

  <sub>Path Parameter is required | Query Parameter is required</sub>

  #### Success Response
  ```json
  {
    "status": true,
    "result": [
        {
            "org_name": "Black Banana",
            "relationship_type": "parent"
        }
    ]
  }
  ```

  #### Error Response
  ```json
  {
    "status": false,
    "code": "SY400",
    "message": "\"offset\" is not allowed to be empty"
  }
  ```

  OR

  ```json
  {
    "status": false,
    "code": "SY500",
    "message": "Unable to handle the list request"
  }
  ```


  #### Try it out
  ```bash
  curl --location --request GET 'localhost:3000/organisation/Phoneutria Spider?offset=0'
  ```

</details>

<details>
  <summary><b>Create Organisation</b></summary>

  </br>

  > **Creates organisation and its relations**

  #### URL
  `/organisation`

  #### Method
  `POST`

  #### Data Params
  ```json
  {
    "org_name": "Paradise Island",
    "daughters": [{
      "org_name": "Banana tree",
      "daughters": [{
            "org_name": "Yellow Banana"
        },
        {
            "org_name": "Brown Banana"
        },
        {
            "org_name": "Black Banana"
        }]
    }]
  }
  ```

  * `org_name` **Required**
  * `daughters` **Optional**

  #### Success Response
  ```json
  {
    "status": true,
    "result": {
      "rows": {
        "org_name": "Paradise Island",
        "daughters": [{
          "org_name": "Banana tree",
          "daughters": [{
            "org_name": "Yellow Banana"
            },
            {
              "org_name": "Brown Banana"
            },
            {
              "org_name": "Black Banana"
           }]
        }]
      }
    }
  }
  ```

  #### Error Response
  ```json
  {
    "status": false,
    "code": "SY400",
    "message":  "\"org_name\" is required"
  }
  ```

  OR

  ```json
  {
    "status": false,
    "code": "SY500",
    "message": "Unable to handle the list request"
  }
  ```

  #### Try it out
  ```bash
  curl --location --request POST 'localhost:3000/organisation' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "org_name": "Paradise Island",
    "daughters": [
      {
        "org_name": "Banana tree",
        "daughters": [
            {
                "org_name": "Yellow Banana"
            },
            {
                "org_name": "Brown Banana"
            },
            {
                "org_name": "Black Banana"
            }
        ]
      }
    ]
  }'
  ```

</details>

<sub>⚠️ All duplicated organizations and relations are ignored. Keeping the previous data saved.</sup>

### Run In Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c89675dd46e495620300)

## Developer Guideline

**- Clone Repository**
```
$ git clone https://github.com/ViniciusMartinsS/organisation-relationships.git
```

**- Run Application On Docker**
```
$ make start
```

**- Stop Docker**
```
$ make stop
```

**- Run Application Locally**

<sub>⚠️ Before starting, make sure to have a MySQL instance running, and a `organisation` database created. Also, set up the database configuration `ormconfig.json` on the root of the project.</sup>

**- Run Database Migration**
```
$ npm run typeorm migration:run
```

**- Run Application**
```
$ npm start
```

**- Run Tests**
```bash
$ make tests
```
