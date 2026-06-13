// Problem Statement
// Write a function that describes a selected seat position on a flight.

// Use an enum to represent the possible seat positions: Window, Middle, and Aisle.
// The function should take the seat position as input and return a corresponding message.
// If the input is invalid, the function should throw an error.
// Ensure proper type annotations and error handling.

// Example Input:
// SeatPosition.Window

// Example Output:
// "You have selected a window seat."

export enum SeatPosition {
    Window, 
    Middle,
    Aisle
}

export function getSeatDescription (x: SeatPosition): string{
    switch(x){
        case SeatPosition.Window:
            return 'you got window puh'
        case SeatPosition.Middle:
            return 'you got middle puh'
        case SeatPosition.Aisle:
            return "you got side puh"
        default:
            throw new Error("Invalid seat position");
    };   
}