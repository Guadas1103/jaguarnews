import { EnvironmentProviders, importProvidersFrom } from '.angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseProviders : EnvironmentProviders = importProvidersFrom([
    provideFirebaseApp(() => initializeApp({"projectId":"jaguarnews-b42e3","appId":"1:125883732306:web:cb06f0fb06e1ba680b6a8b","storageBucket":"jaguarnews-b42e3.appspot.com","locationId":"us-central","apiKey":"AIzaSyAFYwFgeW7sjCwiR9tauLjbv7CAoJ2ELLM","authDomain":"jaguarnews-b42e3.firebaseapp.com","messagingSenderId":"125883732306"})),
    provideAuth(() => getAuth())
    //Agregar objeto de angular Firestore con su informacion aqui
]);

export { firebaseProviders};