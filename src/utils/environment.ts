export const config = {
   baseUrls: {
      api: "http://localhost:7081",
      ui: "https://opensource-demo.orangehrmlive.com/web/index.php",
   },
   credentials: {
      api: {
         admin: {
            username: "admin",
         },
         user: {
            username: "user",
         },
         password: "password",
      },

      ui: {
         admin: {
            username: "Admin",
            password: "admin123",
         },
      },
   },
   timeout: 60 * 1000,
};
