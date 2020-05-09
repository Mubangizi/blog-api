[![CircleCI](https://circleci.com/gh/Mubangizi/blog-api/tree/master.svg?style=svg)](https://github.com/Mubangizi/blog-api/tree/master)


# Blop Api
An Api that provides CRUD for blog posts and commenting on corresponding posts

### Table of API routes
|     URL     |     HTTP Method     |     Description     |
| ----------- | -------------------- | ------------------- |
| /posts | POST | Create a new Post |
| /posts | GET  | Get all posts |
| /posts | DELETE | Delete all posts |
| /posts/:postId | GET | Get a single post with id = postId  |
| /posts/:postId | PATCH | Update a post with id = postId |
| /posts/:postId | DELETE | Delete post with id = postId |
| /posts/:postId/comments | POST | Add a comment on post with id = postId |
| /posts/:postId/comments | GET | Get all comments under post with id = postId |
| /posts/:postId/comments | DELETE | Delete all comments under post with id = postId |
| /posts/:postId/comments/:commentId | GET | Get a single comment with id = postId |
| /posts/:postId/comments/:commentId | PATCH | Update a single comment with id = postId |
| /posts/:postId/comments/:commentId | DELETE | Delete a single comment with id = postId |


### Prerequisite for project
- Nodejs [environment](https://nodejs.org/en/)
- Text Editor [Microsoft Visual studio code](https://code.visualstudio.com/)
- Github bash [terminal](https://git-scm.com/downloads) 
- Postman API [development](https://www.getpostman.com/)

### Clone
- Clone the repo. run command `git clone https://github.com/Mubangizi/blog-api.git`

- Navigate into the folder that is cloned. run command `cd blog-api`

### Installation of prerequisites
- Nodejs [environment](https://nodejs.org/en/)
- Postman API [development](https://www.getpostman.com/)
- MySql [Server](https://dev.mysql.com/doc/refman/8.0/en/installing.html)

### Installing dependencies
 - To install the required dependencies, run the command `npm install`

### Start the app
 - To start the app run the command `npm start`
 App will start on your local host
 - To start development environment, run `npm run dev`

### To see api docs for the app
  - Once the app is running got to browser enter `<hostUrl:port>/api-docs` endpoint.

### Testing:
 - To test the app run command `npm test`
 - [Mocha](https://mochajs.org/) [Chai](https://www.npmjs.com/package/chai)


### Version
- `v1.0.0`
