# Malaria

Questa guida spiega come copiare (forkare o clonare) questa app Next.js su GitHub e deployarla su Vercel usando le tue impostazioni personali.

## ==================================== UPDATE =======================================

Prerequisito: devi prima creare il repository vuoto "Malaria" su <https://github.com/bennibeni> (pulsante "New repository", senza inizializzare con README per evitare conflitti).

create a new repository on the command line
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin <https://github.com/bennibeni/Malaria.git>
git push -u origin main

git pull origin main --allow-unrelated-histories
git add .
git commit -m "Add Malaria app"
git push origin main

## ===================================================================================

## 1. Copia il repository su GitHub

### Opzione 1: Fork

1. Vai su <https://github.com/bennibeni/Malaria>
2. Clicca su "Fork" in alto a destra per creare una copia nel tuo account GitHub.

### Opzione 2: Clone e nuovo repository

1. Clona il repository:

   ```sh
   git clone https://github.com/bennibeni/Malaria.git
   ```

2. Crea un nuovo repository sul tuo account GitHub.
3. Imposta il nuovo remote:

   ```sh
   cd Malaria
   git remote set-url origin https://github.com/TUO-USERNAME/TUO-REPO.git
   git push -u origin main
   ```

## 2. Deploy su Vercel

1. Vai su <https://vercel.com> e accedi con GitHub.
2. Clicca su "New Project" e importa il repository dal tuo account GitHub.
3. Segui i passaggi guidati (Vercel rileva Next.js automaticamente).
4. Clicca "Deploy".
5. Al termine, Vercel ti fornirà un URL pubblico per la tua app (esempio: <https://Malaria-h7e2q9ex1-bennibenis-projects.vercel.app/>).

## 3. Personalizza le impostazioni

- Puoi aggiungere variabili d’ambiente o domini personalizzati dalla dashboard Vercel.
- Per condividere la tua app, usa l’URL fornito da Vercel (es: <https://Malaria-h7e2q9ex1-bennibenis-projects.vercel.app/>).

---

**Nota:** Se hai bisogno di aiuto per configurare Git o Vercel, consulta la documentazione ufficiale o chiedi supporto.
