// Write a function that takes a user's full name as input (a string) and returns a greeting with their initials.
// Use a type annotation for the input and output.
// Example Input: "Pixy Glee"
// Example Output: "Hello, P.G!"

export function greetWithInitials(name: string): string {
   return `Hello, ${name.split(' ').map(word => word[0]).join('.') + '.'}`
}
