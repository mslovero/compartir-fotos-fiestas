# ⚡ Pasos Rápidos - Backend en 15 Minutos

Sigue estos pasos para tener tu app funcionando con fotos compartidas en tiempo real.

---

## 📋 Checklist Rápido

- [ ] Crear cuenta en Firebase (5 min)
- [ ] Crear cuenta en Cloudinary (3 min)
- [ ] Configurar .env.local (2 min)
- [ ] Probar la app (5 min)

---

## 🔥 Paso 1: Firebase (5 minutos)

### 1. Ir a Firebase
https://console.firebase.google.com

### 2. Crear Proyecto
- Nombre: `fiesta-15-fotos`
- Desactiva Analytics
- Clic en "Crear"

### 3. Agregar App Web
- Clic en ícono **</>** (Web)
- Nombre: `App Fiesta 15`
- NO marques Hosting
- Copia las credenciales que aparecen

### 4. Activar Firestore
- Menú: **Build > Firestore Database**
- **Iniciar en modo de prueba**
- Ubicación: `us-central1` (o la más cercana)
- Clic en "Habilitar"

### 5. Reglas de Firestore
Pestaña "Reglas", pega esto:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /photos/{photoId} {
      allow read, create, delete: if true;
    }
  }
}
```

Clic en **"Publicar"**.

✅ **Firebase listo!**

---

## ☁️ Paso 2: Cloudinary (3 minutos)

### 1. Registrarse
https://cloudinary.com/users/register/free

### 2. Verificar Email
Revisa tu email y confirma la cuenta

### 3. Copiar Credenciales
En el Dashboard verás:
- **Cloud Name**
- **API Key**
- **API Secret** (haz clic en "Show")

✅ **Cloudinary listo!**

---

## ⚙️ Paso 3: Configurar .env.local (2 minutos)

### 1. Copiar el archivo
```bash
cp .env.example .env.local
```

### 2. Editar .env.local

Abre `.env.local` y pega TUS credenciales:

```bash
# FIREBASE (de Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fiesta-15-fotos.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fiesta-15-fotos
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fiesta-15-fotos.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# CLOUDINARY (de Cloudinary Dashboard)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrst
```

✅ **.env.local configurado!**

---

## 🚀 Paso 4: Probar (5 minutos)

### 1. Iniciar el servidor
```bash
npm run dev
```

### 2. Abrir en 2 ventanas
- Ventana 1: http://localhost:3000
- Ventana 2: http://localhost:3000

### 3. Subir una foto
- En ventana 1, sube una foto
- ¡Debería aparecer en ventana 2 automáticamente! ✨

### 4. Verificar Firebase
- Ve a Firebase Console > Firestore
- Deberías ver la colección `photos`

### 5. Verificar Cloudinary
- Ve a Cloudinary > Media Library
- Deberías ver la carpeta `fiesta-15-photos`

✅ **¡Todo funcionando!**

---

## 🎯 Siguiente: Deploy a Internet

```bash
npm install -g vercel
vercel login
vercel
```

En Vercel Settings > Environment Variables, agrega TODAS las variables de `.env.local`.

---

## ⚠️ Si algo falla...

### Error: Firebase not initialized
```bash
# Verifica que .env.local exista
ls -la .env.local

# Si no existe, créalo
cp .env.example .env.local

# Edita y agrega credenciales
nano .env.local  # o usa tu editor favorito

# Reinicia
npm run dev
```

### Error: Failed to upload
- Revisa credenciales de Cloudinary
- Verifica que API_SECRET esté correcto

### No aparece en tiempo real
- Revisa reglas de Firestore
- Debe permitir `read` y `create`

---

## 📞 ¿Necesitas más ayuda?

Lee la guía completa: [CONFIGURACION-BACKEND.md](./CONFIGURACION-BACKEND.md)

---

**¡Listo en 15 minutos!** 🎉
