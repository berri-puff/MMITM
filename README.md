# Meet Me In The Middle

## Overview

"Meet Me In The Middle" is a web app that helps friends find a central place to meet. It takes two locations, finds venues near the middle, calculates travel times, and creates itineraries.

## Description

This app is for anyone who wants to meet friends halfway. You input two addresses, and the app suggests places to meet that are convenient for both parties and based on suitable locations and equitable travel times. It’s useful for planning meetups and making sure everyone has an easy trip.

## Technologies Used

- **React**: For building the user interface
- **Firebase**: Backend services and database integration
- **Tailwind CSS and DaisyUI**: For styling and responsive design
- **Vite**: As the build tool for faster development
- **TypeScript**: To ensure type safety in the codebase
- **ESLint and Prettier**: For code consistency and formatting
- **@react-google-maps/api**: To integrate Google Maps for location services
- **Google Places API**: Used for identifying potential venues based on user locations. It offers a comprehensive database of venues, enabling the app to suggest a selection of suitable meeting spots.
- **Google Distance Matrix API**: Employed to calculate travel distances and times between user locations and proposed venues. This API helps in ensuring the suggested meeting points are convenient for all parties involved.

## Getting Started

### Dependencies

- Node.js and NPM

### Installing

1. Clone the repository:
   ```
   git clone https://github.com/berri-puff/MMITM.git
   ```
2. Install dependencies:
   ```
   npm install
   ```

### Running the App

- To preview on a local port:
  ```
  npm run dev
  ```

### Help

Run `npm run help` for assistance.

## Authors

- Jenny
- Michael
- Chris
- Aisling

## Version History

- 0.1 - Initial release.
