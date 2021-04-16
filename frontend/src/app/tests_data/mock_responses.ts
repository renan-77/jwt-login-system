// Creating mock responses.
export const responses = {
    success: {
        message: 'Login Successful',
        login: true,
        access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYxODM5MDMwOSwianRpI' +
            'joiY2FkYjlmYjEtNzllNi00ZjQ5LWFhOTktMDJlYjM0ZDAxMzYzIiwibmJmIjoxNjE4MzkwMzA5LCJ0eXBlIjoiYWNjZXNz' +
            'Iiwic3ViIjoicmVuYW5AZGVsbC5jb20iLCJleHAiOjE2MjM1NzQzMDl9.wEqyRHj-PiRPtYIAAo4ulAL2TTy27ytrPFPd7H' +
            'fqrqs',
        code: 201
    },
    wrong_pass: {
        message: 'Password is wrong!',
        login: false,
        code: 401
    },
    wrong_user: {
        message: 'User does not exist',
        login: false,
        code: 401
    },
    error: {
        message: 'An error has occurred',
        login: false,
        code: 406
    }
};
