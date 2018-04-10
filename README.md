## Difference between `req.query` and `req.params`

### req.params
- Data comes from the URL.
- Can access data on the `req` object.
- Indicate in the endpoint path that the endpoint requires params by using a colon. 
  - An endpoint using params would look like: 
  ```js
  app.get('/api/user/:id', ctrl.getUser);
  ```
  - An HTTP request to this endpoint would look like:
  ```js
  axios.get('/api/user/3').then(res => ...)
  ```
  - Accessing this data on the `req` object would look like:
  ```js
  req.params.id // the value being '3'
  ```
- Must include params in the request URL.
- Use case: Looking at the detail view of a single product from a list of products. The id is required, you can't see that page without sending a param.

### req.query
- Data comes from the URL.
- Can access data on the `req` object
- The endpoint _does not_ need to indicate that it can accept queries.
  - An endpoint using queries would look like:
  ```js
  app.get('/api/user', ctrl.getUserByInfo)
  ```
  - An HTTP request to this enpoint would look like:
  ```js
  axios.get('/api/user?name=Jenny').then(res => ...)
  ```
  - Accessing this data on the `req` object would look like:
  ```js
  req.query.name // the value being 'Jenny'
  ```
- Including queries in the request URL is optional.
- Use case: Search functionality. A user can search by name, age and/or city. They can choose one or all three. It isn't required, it's optional. You must check in your endpoint if it's the query is there and how to use it. How do I know what query will be sent? Whatever you send from your frontend will be what you receive. You get to decide.