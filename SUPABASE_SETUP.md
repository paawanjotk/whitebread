# Supabase Setup Guide

This guide will help you set up your Supabase project for the AI Notes App.

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in or create an account
2. Click "New Project"
3. Fill in your project details:
   - Name: `ai-notes-app` (or your preferred name)
   - Database Password: Choose a secure password
   - Region: Choose the region closest to your users
4. Click "Create new project"

## 2. Set Up Authentication

1. In your project dashboard, go to "Authentication" > "Providers"
2. Enable "Email" provider
3. Enable "Google" provider:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Set up the OAuth consent screen if prompted
   - Choose "Web application" as the application type
   - Add your Supabase project URL to the authorized JavaScript origins
   - Add your Supabase project URL + `/auth/v1/callback` to the authorized redirect URIs
   - Copy the Client ID and Client Secret
   - Back in Supabase, paste these values into the Google provider settings

## 3. Set Up Database

1. In your project dashboard, go to "SQL Editor"
2. Create a new query
3. Copy and paste the contents of `supabase/migrations/20240320000000_create_notes_table.sql`
4. Run the query

## 4. Get Your Project Credentials

1. In your project dashboard, go to "Project Settings" > "API"
2. Copy the following values:
   - Project URL
   - anon/public key
3. Create a `.env.local` file in your project root and add these values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## 5. Set Up DeepSeek API

1. Go to [DeepSeek AI](https://openrouter.ai/settings/keys) and create an account
2. Get your API key from the dashboard
3. Add it to your `.env.local` file:
   ```
   OPENROUTER_API_KEY=your_api_key
   ```

## 6. Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Try signing up and creating a note
3. Verify that:
   - Authentication works (both email and Google)
   - Notes are created and stored in the database
   - AI summarization works
   - Row Level Security is working (users can only see their own notes)

## Troubleshooting

If you encounter any issues:

1. Check the browser console for errors
2. Verify your environment variables are correctly set
3. Check the Supabase dashboard for any error messages
4. Ensure your database migrations have been applied correctly
5. Verify that Row Level Security policies are in place 