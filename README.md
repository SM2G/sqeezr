# Squeezr
A simple quizz app based on **Python**, **Flask** and **Skeleton**.
Currently a *work in progress* project.

---

The front is built on Angular 5. If you want to deploy / dev the project, you'll
need the Angular CLI : 
`$ sudo npm i -g @angular/cli@1.5.3`

To start the Angular front in dev mod :  
```
$ cd front
$ yarn
$ npm run start
```

this will start a server for you to test squeezr in dev mod. You just have to
open your browser on `localhost:4200`.

If you want to build the project for prod :  
```
$ cd front
$ yarn
$ npm run build
```

this will generate a folder with your `index.html` file in it and the scripts
needed. Just copy them on your server and you should be ready to go.
