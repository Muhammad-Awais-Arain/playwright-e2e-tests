export const userEmail = "john@gmail.com";
export const userPassword = "john";

export function generateTweet() {
    const count = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    const tweet = `This is an automated tweet ${count}`;
    return tweet;
}

export function getUserData() {
    const randomNumber = Math.floor(Math.random() * 2) + 3; // Generate a random number between 3 and 4
    const email = `john${randomNumber}@yopmail.com`;
    
    return {
      email,
      password: "john",
      confirmPassword: "john",
      firstName: "John",
      lastName: "Doe"
    };
}  