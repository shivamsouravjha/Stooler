
# Stool
Ever thought of investing in stocks even though you don't know much about finances?

Ever thought of buying a costly stock of high profit returns even if your budget doesn't allow?

Do you also want someone to invest in money earning resources on your behalf even if you can invest only 100Rs per month?

Presenting you with a  **Stool** to make our finance easier and life better.

A plan to invest in a stock via group pool. Friends and strangers come
together to invest in stocks and cryptocurrency, for 
sharing the investment strategy and profit. 

If in doubt talk to our Chatbot to clarify doubts.

                                          Invest Together Grow Together.




## How it Works ?

Here you can join a group of investors, who together invest
in a stock, fix a deadline to withdraw the amount, you can 
request admin to add new resource in a group,remove a resource or change the amount of resource.

Or you can create your unique group and  add different resource in
it, and ask other users to join you and invest with you, where
you can share ideas with each other and can grow together.


## [To see live action](https://stool-front.herokuapp.com/)


# Workflow (Website Architecture)
![stool_workflow](https://user-images.githubusercontent.com/63896998/129359099-ae832998-4291-4005-9b2c-479901407191.jpeg)


# Source Flow
![Source Diagram](https://user-images.githubusercontent.com/60891544/129677169-4bf4d796-c40c-40e0-8ffd-64597dfc1817.png)


#Group Flow
![Group Schema (2)](https://user-images.githubusercontent.com/60891544/129674115-70f9a9f2-9533-4198-b937-8e250a32673b.jpeg)


# User Flow
![System Flow](https://user-images.githubusercontent.com/60891544/129672812-f4731075-d1e7-40ee-b1f3-277a66f827e2.jpeg)


# Features


 Features      |            Purpose        | 
| ------------- |:-------------------------:| 
| Groups | Create your group or join another group |
| Resources | Add or request to add new resources in group |
| Profile | See all your transaction and investment |
| Group Details| Resources in which group invest, history of profit and loss deal|
| Members | View other members and transfer of ownership |
  
## Deployment on Local System

To deploy this project run

```bash
  create an env file
  create an empty folder called storage in backend
  and in that create logs.
  npm install
  npm start in backend
```
```bash
   In frontend folder
   npm install
   npm start
```
  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`name (MongoDB_username)`

`password (MongoDB_password)`

`db (MongoDB_databasename)`

`secretcode (jwt_authentication_token)`

`cloudinary_cloud_name`

`cloudinary_api_key`

`cloudinary_api_secret`


    
## Authors

- [@shivamsouravjha](https://github.com/shivamsouravjha)
  
## [Backend Link](http://localhost:5001/)

## [Postman Requests](https://www.getpostman.com/collections/a6cc1f044a023f89a5d8)


## Tech Stack

**Client:** React

**Server:** Node, Express

**Database:** MongoDB, Redis


