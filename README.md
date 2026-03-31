# 🎉 App de Fotos para Fiesta de 15 Años

Una aplicación web moderna y elegante para que los invitados puedan subir y compartir fotos durante la fiesta de 15 años mediante código QR.

## ✨ Características

### 🎨 **Diseño Premium**
- UI/UX moderno con tema rosa viejo (dusty rose)
- Animaciones suaves con Framer Motion
- Efectos de vidrio y corazones flotantes
- Totalmente responsive para móviles

### 📸 **Funcionalidades**
- ✅ **Fotos compartidas en tiempo real** - Todos ven la misma galería
- ✅ **Sincronización instantánea** - Las fotos aparecen automáticamente
- ✅ **Almacenamiento en la nube** (Cloudinary + Firebase)
- ✅ **Código QR** para acceso fácil
- ✅ **Galería animada** con contador
- ✅ **Barra de progreso** al subir
- ✅ **Eliminar fotos** si es necesario

### ☁️ **Backend**
- **Firebase Firestore**: Base de datos en tiempo real
- **Cloudinary**: Almacenamiento y optimización de imágenes
- **Capacidad**: Hasta 25,000 fotos (plan gratis)
- **Costo**: $0 para fiestas normales

---

## 🚀 Inicio Rápido

### 1. Instalación

```bash
cd fiesta-15-photos
npm install
```

### 2. Configurar Backend (15 minutos)

**LEE LA GUÍA COMPLETA:** [CONFIGURACION-BACKEND.md](./CONFIGURACION-BACKEND.md)

**Resumen rápido:**

1. Crea cuenta en [Firebase](https://console.firebase.google.com)
2. Crea cuenta en [Cloudinary](https://cloudinary.com)
3. Copia `.env.example` a `.env.local`
4. Agrega tus credenciales

```bash
cp .env.example .env.local
# Edita .env.local con tus credenciales
```

### 3. Ejecutar

```bash
npm run dev
```

### 4. Abrir

- Local: http://localhost:3000
- Red: http://192.168.X.X:3000

---

## 📚 Documentación

- **[CONFIGURACION-BACKEND.md](./CONFIGURACION-BACKEND.md)** - Configurar Firebase y Cloudinary (IMPORTANTE)
- **[INSTRUCCIONES.md](./INSTRUCCIONES.md)** - Guía rápida de uso
- **[GUIA-COMPLETA.md](./GUIA-COMPLETA.md)** - Manual completo
- **[DEPLOY.md](./DEPLOY.md)** - Cómo poner la app en internet

---

## 🎯 Cómo Usar Durante la Fiesta

### Opción A: Deploy en Internet (Recomendado)

```bash
npm install -g vercel
vercel login
vercel
```

- Configura las variables de entorno en Vercel
- Comparte la URL mediante QR

### Opción B: Red Local

```bash
npm run dev
```

- Todos deben estar en el mismo WiFi
- Comparte la URL de "Network:" mediante QR

### Para Imprimir el QR

Ve a: http://tu-url/qr-print

---

## 🛠️ Tecnologías

- **Next.js 16** - Framework React
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 3** - Estilos modernos
- **Framer Motion** - Animaciones
- **Firebase Firestore** - Base de datos en tiempo real
- **Cloudinary** - Almacenamiento de imágenes
- **qrcode.react** - Generación de QR

---

## 📂 Estructura del Proyecto

```
fiesta-15-photos/
├── app/
│   ├── page.tsx              # Página principal con galería
│   ├── qr-print/page.tsx     # Página de impresión QR
│   ├── layout.tsx            # Layout global
│   ├── globals.css           # Estilos globales
│   └── api/
│       └── upload/route.ts   # API para subir fotos
├── components/
│   ├── QRCodeGenerator.tsx   # Generador de QR
│   ├── FloatingHearts.tsx    # Efectos visuales
│   └── PhotoCounter.tsx      # Contador de fotos
├── lib/
│   ├── firebase.ts           # Configuración de Firebase
│   └── cloudinary.ts         # Configuración de Cloudinary
├── .env.example              # Plantilla de variables
└── CONFIGURACION-BACKEND.md  # Guía de configuración
```

---

## 💾 Almacenamiento de Fotos

### ☁️ Con Backend (Implementado)

- ✅ **Fotos compartidas** entre todos los dispositivos
- ✅ **Sincronización en tiempo real**
- ✅ **Almacenamiento permanente** en Cloudinary
- ✅ **Base de datos** en Firebase Firestore
- ✅ **Escalable** para miles de fotos
- ✅ **GRATIS** hasta 25,000 fotos

### 📊 Límites (Plan Gratis)

**Firebase:**
- 1 GB almacenamiento Firestore
- 50,000 lecturas/día
- 20,000 escrituras/día

**Cloudinary:**
- 25 GB almacenamiento
- 25 GB ancho de banda/mes
- 25,000 transformaciones/mes

**Suficiente para:** Una fiesta de 15 años con 100-200 invitados

---

## 🎨 Personalización

### Cambiar el Nombre

Edita `app/page.tsx` línea 135:

```tsx
<h1 className="...">
  Nombre de la Quinceañera  ← Cambia aquí
</h1>
```

### Cambiar Colores

Edita `tailwind.config.js`:

```javascript
'dusty-rose': {
  500: '#e0536f', // Rosa principal
  // Cambia por el color que prefieras
}
```

### Usar Archivo de Configuración

Edita `config.ts` para centralizar todos los textos y configuraciones.

---

## 🐛 Solución de Problemas

### Error: "Firebase not initialized"

```bash
# Verifica que .env.local exista y tenga todas las variables
cp .env.example .env.local
# Edita y agrega tus credenciales
npm run dev
```

### Error: "Failed to upload photo"

- Verifica credenciales de Cloudinary en `.env.local`
- Revisa la consola del navegador (F12)

### Las fotos no aparecen en otros dispositivos

- Verifica las reglas de Firestore (ver CONFIGURACION-BACKEND.md)
- Asegúrate de que el backend esté configurado correctamente

---

## 📥 Descargar Fotos Después

### Desde Cloudinary:

1. Ve a https://cloudinary.com/console
2. Media Library > `fiesta-15-photos`
3. Selecciona todas las fotos
4. Descarga como ZIP

### Desde Firebase (Referencias):

1. Ve a Firebase Console > Firestore
2. Exporta la colección `photos`
3. Tendrás las URLs de todas las fotos

---

## 🚀 Deploy a Producción

### Vercel (Recomendado):

```bash
vercel
```

### Configurar Variables en Vercel:

1. Settings > Environment Variables
2. Agrega TODAS las variables de `.env.local`
3. Redeploy

Ver guía completa en [DEPLOY.md](./DEPLOY.md)

---

## 🎯 Próximas Mejoras (Opcional)

- [ ] Autenticación de administrador
- [ ] Filtros y efectos para fotos
- [ ] Comentarios en las fotos
- [ ] Descarga masiva desde la app
- [ ] Slideshow automático
- [ ] Música de fondo
- [ ] WhatsApp sharing

---

## 💡 Tips Pro

### Antes de la Fiesta:
- ✅ Configura Firebase y Cloudinary
- ✅ Prueba con amigos/familiares
- ✅ Haz deploy a Vercel
- ✅ Imprime varios QRs

### Durante la Fiesta:
- ✅ Proyecta el QR en pantalla
- ✅ Pon QRs en las mesas
- ✅ Monitorea que todo funcione

### Después de la Fiesta:
- ✅ Descarga todas las fotos de Cloudinary
- ✅ Crea álbum compartido
- ✅ Comparte con los invitados

---

## 📄 Licencia

Proyecto de código abierto para fiestas de 15 años.

---

## 🎊 ¡Disfruta tu Fiesta!

**Desarrollado con ❤️ para hacer tu fiesta de 15 años inolvidable**

---

## 📞 ¿Necesitas Ayuda?

1. Lee [CONFIGURACION-BACKEND.md](./CONFIGURACION-BACKEND.md)
2. Revisa [GUIA-COMPLETA.md](./GUIA-COMPLETA.md)
3. Verifica la consola del navegador (F12)
4. Asegúrate de que todas las variables estén configuradas

---

**¡Captura y comparte los momentos más especiales!** 📸✨
