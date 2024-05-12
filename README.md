
# TEKTAI

Project link : https://github.com/AtefBadreddine/Tektai-Devtech-4TWIN2

Technologies : 
#### BACKEND 
Nestjs v10.0.0 :![react: v18.2.0](https://skillicons.dev/icons?i=nestjs,) 
Nodejs: v20.11.1 :![react: v18.2.0](https://skillicons.dev/icons?i=nodejs,)
mongoose: v8.1.3:![react: v18.2.0](https://skillicons.dev/icons?i=mongo,)
#### FRONTEND 
React: v18.2.0 :![react: v18.2.0](https://skillicons.dev/icons?i=react,)




## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## Installations instructions :
* Backend
```javascript
cd tektai-backend 
npm install 
cp .env.example .env 
copy secrets.txt content to .env file 
npm run build
npm run start:prod
```

* Frontend 
```javascript
cd tektai-frontend
npm install
npm run build
npm run start 
access the website through http://localhost:5173/

```


## Additional considerations :

 
- We have used a cloud hosted Mongodb instance accessed through this [link](mongodb+srv://atef:atef@tektai.7tktrhv.mongodb.net/?retryWrites=true&w=majority&appName=tektai)

- Admin account is : username: Armi64bit / password : 677KDu@KcqZpsje
- The backend project depends on several third party services such as :
  - Google auth 
  - Github auth
  - Sendinblue ( email sending ) 
  - Stripe
Please replace the existing API keys with your own credentials as they may expire soon.


