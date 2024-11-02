// I defined a JavaScript object named apiConfig that is used to centralize and manage the configuration details for an API endpoint. This setup is particularly useful because of the consistent use of API base URLs across multiple files and modules.
export const apiConfig = {
  api: {
    ipAddress: "192.168.0.190",
    port: "55561",
    get baseUrl() {
      return `http://${this.ipAddress}:${this.port}`;
    },
    endpoints: {
      signup: "/api/users/register",
      login: "/api/users/login",
      confirmMail: "/api/users/confirm-mail",
      tokenRefresh: "/api/users/refresh-token",
      generatePwdToken: "/api/users/generate/forgot-pwd-token",
      resetPwd: "/api/users/reset-pwd",
    },
  },
  settings: {
    delayDuration: 6000, // delay duration in milliseconds
  },
};

// export default apiConfig;

// apiConfig: The main object that contains my API configuration details.

// api: A nested object within apiConfig that specifically holds the details related to my API, such as the IP address and port.

// ipAddress: This property stores the IP address of the server where the API is hosted.

// port: This property stores the port number on which the API is running. The port is used to route the HTTP or HTTPS request to the correct service or application on the server.

// baseUrl: This is a getter method. In JavaScript, a getter is a function that gets the value of a specific property. In this case, baseUrl constructs and returns the full base URL of the API by combining the ipAddress and port properties. The get keyword makes this method a getter, allowing you to access it like a property.

// this: The this keyword inside the baseUrl getter refers to the api object. It is used to access the properties (ipAddress and port) within the same object.
