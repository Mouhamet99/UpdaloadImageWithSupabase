1:Initialiser le projet avec npm en
   npm init -y
2:Installer supabase en locale
   npm install @supabase/supabase-js

3:Installer un serveur (comme liveserver )pour pouboir utiliser ce qui vient d'etre installer
   npm install vite

4:sur packages.json
Remplacer 
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
Par
  "scripts": {
    "dev": "vite",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

  5: Lancer le serveur
   npm run dev

