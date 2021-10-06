# Sparkademy Frontend Assignment

#### Requirements
- NodeJS version >= v10

Technologies used: React, Typescript, Antd (UI Framework) and Jest/React Testing Library.

1. This project is a frontend application with a simple form to be validated as following:

- All fields are required
- Name should be in the form of "FirstName LastName"
- Email should be a valid email in the form of "email@domain.com" | "foo-bar@123.xy" | "plus+sign@hyphenated-domain.xy"
- Password must follow these rules:
  1. Must have at least 8 characters
  2. Must have at least 1 uppercase letter
  3. Must have at least 1 lowercase letter
  4. Must have at least 1 number
- Website should be a valid host name (http://domain.com or subdomain.domain.com)

NOTE: You should not use Antd's built in input validation features, you should write your own validation logic.

2. After all tests pass, refactor the Form component to use React Context instead of local state to track input values.

3. Submit form data to `https://formspree.io/f/xeqvdpvn` with a POST request with a body of
`x-www-form-urlencoded` data.

To start the app:
```
yarn start
```

There's a set of failing tests which needs to pass.
To run all tests:
```
yarn test
```

Feel free to write more tests!! 💪🧑‍💻🚀
