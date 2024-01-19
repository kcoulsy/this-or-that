# This or That

Welcome to "This or That" – a fun and interactive project where you get to make choices and see how your preferences compare to others. The application presents users with pairs of options, and users can choose which one they prefer. After making a selection, the app displays the percentage of people who chose each option for that specific combination.

![](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3N0NWl2M25hYjYyOWh5czlkcDdrd2xvYWN0Zjhwam95eTVqcjYwZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ldBYxQzoZttewyHHBh/giphy.gif)

## Technologies Used

- **Bun**: The project utilizes Bun as a fast alternative to node.

- **HonoJS**: HonoJS is used for the web server, it's lightweight, simple and uses Web Standards. I also made use of the JSX rendering to avoid needing any template engine which was nice.

- **Prisma**: Prisma serves as the database layer, using SQLite in this poject.

- **Tailwind**: Tailwind CSS is used for styling, but the styles were kept pretty simple in the project.

- **Vite**: Vite was added to use typescript for the vanilla js and to bundle the styles. I manually added in the hot reloading for development too.

## Features

- **Option Pairing**: Users are presented with two options and are prompted to choose their preference between the given pair.

- **Percentage Display**: After making a selection, the application displays the percentage of people who chose each option for that specific combination.

- **Scoreboard**: A dynamic scoreboard keeps track of the most answered combinations, showcasing popular choices within the community.

- **JSX Rendering with Vanilla JS**: The project leverages the JSX rendering capabilities of Bun along with vanilla JavaScript for handling the functionality, resulting in a clean and efficient codebase.

## Getting Started

1. **Clone the Repository:**
   ```
   git clone https://github.com/kcoulsy/this-or-that.git
   cd this-or-that
   ```

2. **Install Dependencies:**
   ```
   bun install
   ```

3. **Run the Development Server:**
   ```
   bun run dev
   ```

4. **Build for Production:**
   ```
   bun run start
   ```

## Usage

- Open the application in your browser and start making choices between various option pairs.
- Explore the percentage breakdown to see how your preferences align with others.
- Keep an eye on the scoreboard to discover the most popular combinations within the community.

## Contributions

Contributions are welcome! If you have ideas for new features or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code for your own purposes.

Enjoy "This or That" and have fun exploring your preferences!