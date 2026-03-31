# 🔧 Configuración del Backend (Firebase + Cloudinary)

Esta guía te ayudará a configurar Firebase y Cloudinary para tener fotos compartidas en tiempo real.

---

## 📋 Paso 1: Crear Cuenta en Firebase (5 minutos)

### 1.1 Ir a Firebase Console

1. Ve a https://console.firebase.google.com
2. Haz clic en "Agregar proyecto" o "Add project"
3. Nombre del proyecto: **fiesta-15-fotos** (o el que prefieras)
4. Deshabilita Google Analytics (no es necesario)
5. Haz clic en "Crear proyecto"

### 1.2 Crear una Web App

1. En la pantalla de inicio del proyecto, haz clic en el ícono **</> (Web)**
2. Nombre de la app: **App Fiesta 15**
3. **NO** marques "Firebase Hosting"
4. Haz clic en "Registrar app"

### 1.3 Copiar las Credenciales

Verás algo como esto:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "fiesta-15-fotos.firebaseapp.com",
  projectId: "fiesta-15-fotos",
  storageBucket: "fiesta-15-fotos.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

**¡GUARDA ESTOS VALORES!** Los necesitarás después.

### 1.4 Activar Firestore Database

1. En el menú izquierdo, ve a **Build > Firestore Database**
2. Haz clic en "Crear base de datos" o "Create database"
3. Selecciona **"Iniciar en modo de prueba"** o **"Start in test mode"**
4. Ubicación: Elige la más cercana (ej: `us-central1`)
5. Haz clic en "Habilitar"

### 1.5 Configurar Reglas de Seguridad

En Firestore, ve a la pestaña **"Reglas"** y reemplaza con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura a todos
    match /photos/{photoId} {
      allow read: if true;
      allow create: if true;
      allow delete: if true;
    }
  }
}
```

Haz clic en **"Publicar"**.

---

## 📸 Paso 2: Crear Cuenta en Cloudinary (5 minutos)

### 2.1 Registrarse

1. Ve a https://cloudinary.com/users/register/free
2. Llena el formulario de registro
3. Verifica tu email
4. Inicia sesión

### 2.2 Obtener Credenciales

1. En el Dashboard, verás:
   - **Cloud Name**
   - **API Key**
   - **API Secret** (haz clic en "Show" para verlo)

2. Copia estos 3 valores

**Ejemplo:**
```
Cloud Name: dxxxxxxxxxxxx
API Key: 123456789012345
API Secret: abcdefghijklmnopqrstuvwxyz123
```

---

## ⚙️ Paso 3: Configurar Variables de Entorno (2 minutos)

### 3.1 Crear archivo .env.local

En la carpeta raíz del proyecto (`fiesta-15-photos`), crea un archivo llamado `.env.local`:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fiesta-15-fotos.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fiesta-15-fotos
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fiesta-15-fotos.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxxxxxxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123
```

**⚠️ IMPORTANTE:**
- Reemplaza TODOS los valores con TUS credenciales
- NO compartas este archivo (ya está en .gitignore)
- Copia el contenido de `.env.example` si prefieres

---

## 🚀 Paso 4: Probar la Aplicación

### 4.1 Iniciar el servidor

```bash
npm run dev
```

### 4.2 Probar la subida

1. Abre http://localhost:3000
2. Haz clic en "Toca para tomar una foto"
3. Selecciona una imagen
4. Haz clic en "Subir Foto"
5. ¡Deberías ver la foto aparecer en la galería!

### 4.3 Probar sincronización en tiempo real

1. Abre http://localhost:3000 en **dos ventanas diferentes**
2. Sube una foto en una ventana
3. ¡La foto debería aparecer automáticamente en la otra ventana! ✨

---

## ✅ Verificación

### Verifica Firebase:

1. Ve a Firebase Console > Firestore Database
2. Deberías ver una colección llamada `photos`
3. Al subir una foto, aparecerá un nuevo documento aquí

### Verifica Cloudinary:

1. Ve a Cloudinary Dashboard > Media Library
2. Verás una carpeta `fiesta-15-photos`
3. Las fotos subidas aparecerán aquí

---

## 🌐 Paso 5: Deploy a Vercel (Opcional)

### 5.1 Configurar variables en Vercel

1. Ve a https://vercel.com
2. Importa tu proyecto
3. Ve a **Settings > Environment Variables**
4. Agrega TODAS las variables de tu `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = fiesta-15-fotos.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = fiesta-15-fotos
...
(todas las demás)
```

5. Haz clic en "Save"
6. Redeploy el proyecto

---

## 🐛 Solución de Problemas

### Error: "Firebase: Error (auth/api-key-not-valid)"

- **Solución**: Verifica que copiaste correctamente el `apiKey` de Firebase

### Error: "Failed to upload photo"

- **Solución**: Revisa que las credenciales de Cloudinary sean correctas
- Verifica que el `CLOUDINARY_API_SECRET` esté correcto

### Las fotos no aparecen en tiempo real

- **Solución**: Verifica las reglas de Firestore
- Asegúrate de que las reglas permitan `read` y `create`

### Error: "Firebase: No Firebase App '[DEFAULT]' has been created"

- **Solución**: Verifica que TODAS las variables `NEXT_PUBLIC_FIREBASE_*` estén configuradas
- Reinicia el servidor: `npm run dev`

### Error en Vercel: "Internal Server Error"

- **Solución**: Verifica que agregaste TODAS las variables de entorno en Vercel
- No olvides `CLOUDINARY_API_SECRET` (sin el prefijo NEXT_PUBLIC_)

---

## 📊 Límites y Costos

### Firebase (Plan Gratuito):

- ✅ 1 GB de almacenamiento en Firestore
- ✅ 10 GB de transferencia al mes
- ✅ 50,000 lecturas/día
- ✅ 20,000 escrituras/día

**Suficiente para:** Miles de fotos en una fiesta

### Cloudinary (Plan Gratuito):

- ✅ 25 GB de almacenamiento
- ✅ 25 GB de ancho de banda/mes
- ✅ 25,000 transformaciones/mes

**Suficiente para:** 10,000-25,000 fotos

---

## 🎯 ¿Qué Sigue?

Una vez configurado, tu app tendrá:

- ✅ **Fotos compartidas** entre todos los dispositivos
- ✅ **Sincronización en tiempo real** (todos ven las mismas fotos)
- ✅ **Almacenamiento en la nube** (las fotos no se pierden)
- ✅ **Optimización automática** de imágenes
- ✅ **Escalable** para miles de fotos

---

## 💡 Tips Pro

1. **Prueba antes de la fiesta**: Sube algunas fotos de prueba
2. **Monitorea el uso**: Revisa Firebase y Cloudinary durante la fiesta
3. **Descarga las fotos después**: Puedes descargarlas desde Cloudinary Media Library
4. **Backup**: Firebase mantiene las referencias, Cloudinary las imágenes

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:

1. Revisa que TODAS las variables estén en `.env.local`
2. Reinicia el servidor (`npm run dev`)
3. Revisa la consola del navegador (F12) para errores
4. Verifica las reglas de Firestore

---

**¡Listo! Ahora tienes un sistema profesional de fotos compartidas en tiempo real** 🎉
