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

Per fare il deploy su Vercel:

Vai su vercel.com e accedi con il tuo account GitHub.
Clicca Add New → Project.
Seleziona il repository bennibeni/Malaria dalla lista (autorizza Vercel se richiesto).
Vercel rileverà automaticamente che è un progetto Next.js — le impostazioni di build di default vanno bene:

Build Command: next build
Output Directory: (lascia default)

Clicca Deploy.

Dopo qualche minuto avrai un URL live tipo [malaria-xxxx.vercel.app](https://malaria-plum.vercel.app/). Ogni push su main su GitHub aggiornerà automaticamente il deploy.

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



## 4. Aggiornare l’app dopo il primo deploy (VSCode + GitHub + Vercel)

Dopo il primo deploy non serve rifare tutta la procedura. Il flusso normale è:

```txt
Modifica codice → Commit → Push → Deploy automatico Vercel
```

### 1. Apri il progetto in VSCode

Apri la cartella del progetto **Malaria** in VSCode.

Avvia il progetto in locale:

```sh
npm run dev
```

Apri il browser:

```txt
http://localhost:3000
```

Così puoi verificare le modifiche prima di pubblicarle.

### 2. Modifica il codice

Fai le modifiche ai file normalmente in VSCode.

Quando salvi i file, Next.js aggiorna automaticamente la pagina (hot reload).

### 3. Controlla le modifiche in Source Control

In VSCode:

- clicca sull’icona **Source Control** (ramo Git nella barra laterale)
- vedrai la lista dei file modificati
- clicca su un file per vedere il confronto tra vecchio e nuovo codice

### 4. Fai un Commit

Nel pannello **Source Control**:

1. scrivi un messaggio nel campo in alto, ad esempio:

```txt
Improve malaria simulation
```

oppure:

```txt
Fix hydration issue
```

2. clicca **Commit**

Se VSCode chiede di salvare i file, conferma.

### 5. Fai Push su GitHub

Dopo il commit:

- clicca **Sync Changes**
- oppure **Push**

VSCode invierà automaticamente le modifiche su GitHub.

In alternativa dal terminale:

```sh
git add .
git commit -m "Describe your changes"
git push origin main
```

### 6. Deploy automatico su Vercel

Dopo il push:

1. Vai su **vercel.com**
2. Apri il progetto **Malaria**
3. Vai nella tab **Deployments**

Vedrai un nuovo deploy partire automaticamente.

Se tutto va bene:

```txt
Status: Ready
```

la versione online viene aggiornata automaticamente.

### Errori comuni

#### Build failed su Vercel

Se il deploy fallisce:

1. apri **Deployments**
2. clicca sul deploy rosso
3. leggi il log dell’errore

Spesso è uno di questi:

- import sbagliato
- variabile non definita
- errore JSX
- errore ESLint

#### Git rifiuta il push

Se compare qualcosa tipo:

```txt
rejected
failed to push
```

prima fai:

```sh
git pull origin main
```

poi:

```sh
git push origin main
```
