# prySigaMovil
## Descripción
Repositorio que aloja la información sobre el desarrollo y gestion del proyecto de la app SigaMovil (tareas definidas en Asana &amp; codigo desarrollado).


## Desarrolladores
- **Hernández Badillo Álvaro Fernando** - 20210727
- **Granados Cortes Josué** - 20211306
- **Bautista Cardona Jaime** - 20210646

Grupo B - Décimo Cuatrimestre  
Carrera de Ingeniería en Desarrollo y Gestión de Software


## Objetivos
- Mantener alojado el codigo del proyecto y en constante revision para minimizar errores de codificación.
- Comunicar los issues que se crean al gestionar las tareas nuevas para el desarrollo del proyecto desde la herramineta de gestion (Asana)


## Metodología
Se selecciono la metodologia XP debido a que se tienen requisitos cambiantes, entregas rápidas de valor, donde se valora la retroalimentación constante y se buscan prácticas que promuevan la mejora continua.


## Herramienta de control de versiones & Flujo de trabajo
Se elegio github como controlador de versiones con un flujo de trabajo de integracion continua, este garantiza que el código sea estable y sin errores a través de pruebas automatizadas.


## Estrategia de versionamiento Y Gestión de ramas
Se utiliza el versionado continuo (Rolling Release), en el que el software se actualiza continuamente, por lo que siempre se tiene la versión más reciente sin grandes lanzamientos. Sera a través de la rama master o main donde alojaremos el código correspondiente a los avances del proyecto móvil, para que cada usuario sea capaz de acceder y modificar, siendo este notificado para su consulta.


## Clonacion del repositorio
Para clonar este repositorio en su máquina local, siga estos pasos:
<br>1. Abra su terminal o símbolo del sistema.
<br>2. Navega hasta el directorio donde quieres clonar el proyecto.
<br>3. Ejecute el siguiente comando:

```bash
git clone https://github.com/JaimeBC0646/pryAsanaHub
```


## Instalación de dependencias
Si se descarga este repositorio se debe eliminar el archivo "package.json", y utilizar el comando:
```bash
npm install
```
Este se encargara de reinstalar las dependencias necesarias para poder correr el proyecto.


## Ejecución del proyecto
Para poder correr el proyecto en modo de desarrollador se utiliza el comando "npx expo start"
Para construirlo se debe seguir una serie de pasos:
- Instalar Expo CLI: 

```bash
npm install -g expo-cli
```

- Instalar EAS CLI:
```bash
npm install -g eas-cli
```

- Iniciar sesión en tu cuenta Expo:
```bash
eas login
```
- Configurar tu proyecto para EAS Build:
```bash
eas build:configure
```
