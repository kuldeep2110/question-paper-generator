# Question-Paper-Generator

Tools and Technologies used:-
- Typescript
- Vite
- Supabase for db and Firebase for auth
- Mantine, radix-ui and tailwindCSS for UI

# To run locally:-
1) fork the project
2) `git clone <url of forked project>`
3) Go to the root of project folder and create a `.env` file
4) Fill the `.env` with following environment variables, values of which you can get from your firebase and supabase projects
```
VITE_SUPABASE_URL= 
VITE_SUPABASE_ANON_KEY= 
VITE_FIREBASE_API_KEY= 
VITE_FIREBASE_AUTH_DOMAIN= 
VITE_FIREBASE_PROJECT_ID= 
VITE_FIREBASE_STORAGE_BUCKET= 
VITE_FIREBASE_MESSAGING_SENDER_ID= 
VITE_FIREBASE_APP_ID= 
VITE_FIREBASE_MEASUREMENT_ID= 
```
5) `npm install && npm run dev`
