# Portfolio Website

This is my personal portfolio website, built to showcase my projects and skills as a Full Stack Web Developer.

## Technologies Used

- **Frontend:**

  - [React.js](https://reactjs.org/)
  - [Next.js](https://nextjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [ShadCN UI](https://shadcn.dev/)
  - [React Query](https://react-query.tanstack.com/)

- **Backend:**

  - [Node.js](https://nodejs.org/)
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
  - [Spotify API](https://developer.spotify.com/documentation/web-api/)
  - [MongoDB](https://www.mongodb.com/)
  - [Prisma](https://www.prisma.io/)

- **Payment Integration:**
  - [Midtrans Payment](https://midtrans.com/)

## Features

- **Personal Projects:** Showcasing a variety of my personal and collaborative projects.
- **Spotify Integration:** Displaying currently playing trak from my Spotify account.
- **Leave a Message:** Allowing visitors to leave a message for me.
- **Responsive Design:** Ensuring optimal viewing experience across all devices.
- **Support for Dark Mode:** Allowing users to switch between light and dark themes.
- **Donation:** Providing an option for visitors to support my work through donations.

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dimmasyusuf/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**

   ```bash
    npm install
   ```

3. **Set up environment variables:**
   create a `.env.local` file in the root directory and add the following environment variables:

   ```bash
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
   NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
   NEXT_PUBLIC_SPOTIFY_CODE=your_spotify_code
   DATABASE_URL=your_database_url
   NEXTAUTH_URL=your_nextauth_url
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_JWT_SECRET=your_nextauth_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   MIDTRANS_CLIENT_KEY=your_midtrans_client_key
   MIDTRANS_SERVER_KEY=your_midtrans_server_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

To deploy this project, you can use Vercel. You can find the detailed instructions [here](https://nextjs.org/docs/deployment).

## Contributing

If you have any suggestions, improvements, or issues, feel free to contribute to this project by creating a pull request.

## License

This project is open-source and available under the [MIT License]

## Contact

- **Email:** dimasyusufqurohman@gmail.com
- **LinkedIn:** [Dimas Yusuf Qurohman](https://www.linkedin.com/in/dimasyusufqurohman/)

Thank you for visiting my portfolio website! 🚀
