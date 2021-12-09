// unauthorized has status code of 401. for basic username and password, every request from the client will contain information in the headers
// for the moment, information from the client will be sent unencrypted in the header. the server will use to what resources the client is authorized to access.

// Username & Password
// with  username password, you have to include the username and password with each request sent to the client.

// Cookies
// with cookies, the client doenst have to include the username password with every request to the server side. the first time a user logs in, the server sets up a cookie for the client and sends it in the response. so in hte future, while the cookied has not expired, any request from the client need only have the cookie.