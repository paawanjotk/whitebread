# AI Notes App

A modern notes application with AI-powered summarization, built with Next.js, TailwindCSS, and Supabase.

## Features

- 🔐 User Authentication with Supabase
- 📝 Create, Read, Update, and Delete Notes
- 🤖 AI-powered Note Summarization
- 🎨 Modern UI with Shadcn UI Components
- 🌙 Dark Mode Support
- 📱 Responsive Design
- ⚡ Real-time Updates with React Query
- 📄 Markdown Support in Summaries

## Tech Stack

- **Frontend:**
  - Next.js 14
  - React 19
  - TailwindCSS
  - Shadcn UI
  - React Query
  - React Markdown

- **Backend:**
  - Supabase (Authentication & Database)
  - PostgreSQL

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd notes-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/         # React components
│   ├── notes/         # Note-related components
│   └── ui/            # Shadcn UI components
├── lib/               # Utility functions and configurations
└── middleware.ts      # Authentication middleware
```

## Features in Detail

### Authentication
- Secure user authentication with Supabase
- Protected routes with middleware
- Session management

### Notes Management
- Create new notes with title and content
- Edit existing notes
- Delete notes
- View all notes in a grid layout

### AI Summarization
- Generate concise summaries of notes
- Markdown support in summaries
- Real-time summary updates

### UI/UX
- Clean and modern interface
- Responsive design for all devices
- Smooth animations and transitions
- Dark mode support
- Consistent styling with Shadcn UI

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.