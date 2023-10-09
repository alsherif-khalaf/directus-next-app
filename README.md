#  Next Js App Router - Directus CMS with authentication  Example

This example shows how to use NextJs with Directus CMS with Authentection on Fron End
The Directus CMS is located in folder 'directus' it uses SQLite in data.db

## How to use

Should install node-modules for NextJS and Directus

```bash
yarn
cd directus/
yarn 
```
or

```bash
npm install
cd directus/
npm install
```

## How to run

in the main directory 

```bash
npm run dev
```

or

```bash
yarn dev
```


## You can change or create a new admin user using 

```bash
npx directus users create --email example@email.com --password password --role  6abab97d-2f05-4005-9d52-c15841f328f3
```

the current admin email : man@man.com  
password : man@man