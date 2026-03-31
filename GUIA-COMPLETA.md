# 📸 Guía Completa - App de Fotos para Fiesta de 15 Años

## ✨ ¡Tu app está lista!

Has creado una aplicación web moderna y profesional con las siguientes características:

### 🎨 Características Principales

1. **Interfaz Premium con Rosa Viejo**
   - Diseño elegante con colores dusty rose (rosa viejo)
   - Animaciones suaves con Framer Motion
   - Efectos de vidrio (glass effect) y corazones flotantes
   - Totalmente responsive para móviles

2. **Subida de Fotos Fácil**
   - Los invitados pueden tomar fotos directamente
   - O seleccionar de su galería
   - Preview antes de subir
   - Animaciones de carga

3. **Galería en Tiempo Real**
   - Las fotos aparecen instantáneamente
   - Vista en cuadrícula responsive
   - Contador de fotos
   - Opción de eliminar fotos

4. **Acceso mediante QR**
   - Generador de código QR integrado
   - Página especial para imprimir (http://localhost:3000/qr-print)
   - Instrucciones claras para invitados

---

## 🚀 Cómo Usar Durante la Fiesta

### Opción 1: Red Local (Sin Internet) - MÁS FÁCIL

1. **Preparación (Antes de la fiesta)**
   ```bash
   cd fiesta-15-photos
   npm install  # Solo la primera vez
   ```

2. **Durante la fiesta**
   ```bash
   npm run dev
   ```

3. **Comparte el acceso**
   - Busca en la consola la línea que dice:
     ```
     - Network: http://192.168.X.X:3000
     ```
   - Esa es la URL que los invitados deben escanear
   - Todos deben estar en el mismo WiFi

4. **Muestra el QR**
   - Opción A: Haz clic en "Mostrar QR" en la app
   - Opción B: Ve a http://192.168.X.X:3000/qr-print e imprime
   - Opción C: Proyecta el QR en una pantalla

### Opción 2: Deploy en Internet - RECOMENDADO

1. **Crear cuenta gratis en Vercel**
   - Ve a https://vercel.com y regístrate

2. **Deploy**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

3. **Obtener URL**
   - Vercel te dará una URL como: https://fiesta-15-photos.vercel.app
   - Usa esa URL para generar el QR
   - ¡Los invitados pueden acceder desde cualquier lugar!

---

## 📱 Instrucciones para Invitados

1. Escanea el código QR con la cámara del móvil
2. Toca para abrir el sitio web
3. Toca el área grande para tomar una foto
4. Previsualiza la foto
5. Toca "Subir Foto"
6. ¡Listo! Tu foto aparece en la galería

---

## 🎨 Personalización

### Cambiar el Nombre

Edita `app/page.tsx` línea 99:
```tsx
<h1 className="...">
  Nombre de la Quinceañera  ← Cambia aquí
</h1>
```

### Cambiar Colores

Los colores están en `tailwind.config.js`:
- `dusty-rose-500`: Rosa principal (#e0536f)
- `champagne`: Fondo claro (#f7e7ce)
- `rose-gold`: Detalles (#b76e79)

Ejemplo para cambiar a azul:
```js
'main-color': {
  500: '#3b82f6', // azul
}
```

### Cambiar Textos

Todos los textos están en `app/page.tsx`:
- Línea 99: Título principal
- Línea 102: Subtítulo
- Línea 110: Botón de QR
- etc.

O usa el archivo `config.ts` para centralizar la configuración.

---

## 🔧 Tecnologías Utilizadas

- **Next.js 16**: Framework React moderno
- **React 19**: Biblioteca de UI
- **TypeScript**: Tipado estático
- **Tailwind CSS 3**: Estilos modernos
- **Framer Motion**: Animaciones fluidas
- **qrcode.react**: Generación de QR

---

## 💾 Almacenamiento de Fotos

### Importante: localStorage

Las fotos se guardan en el **navegador** (localStorage):

- ✅ Ventaja: No necesitas servidor ni base de datos
- ⚠️ Limitación: Las fotos NO se comparten automáticamente entre dispositivos
- ⚠️ Las fotos se eliminan si se limpia el navegador

### Cómo funciona:

1. Cada invitado que sube una foto la ve en SU dispositivo
2. Las fotos quedan guardadas en SU navegador
3. Para ver TODAS las fotos, proyecta UN navegador en pantalla

### Para compartir realmente las fotos:

**Solución 1: Proyecta tu navegador**
- Abre la app en TU laptop/tablet
- Proyecta esa pantalla en la fiesta
- Cuando alguien sube una foto, NO aparecerá en tu pantalla automáticamente
- Esta versión es para que cada persona vea y descargue SUS propias fotos

**Solución 2: Backend (requiere desarrollo adicional)**
- Necesitarías agregar un servidor (Node.js + MongoDB/Firebase)
- Almacenamiento en la nube (Cloudinary/AWS S3)
- Esto está fuera del alcance de esta versión básica

---

## 📥 Descargar Fotos Después

### Para cada invitado:

1. Abre la galería en tu móvil
2. Mantén presionada una foto
3. Selecciona "Guardar imagen" o "Descargar"

### Para el organizador:

Las fotos están en el localStorage del navegador. Para guardarlas:

1. Abre DevTools (F12)
2. Ve a Application > Local Storage
3. Busca la clave `quincePhotos`
4. Copia el valor (es JSON con las fotos en base64)
5. Usa un script para convertir de base64 a imágenes

---

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
npm install
```

### Los invitados no pueden acceder
- Verifica que estén en el mismo WiFi
- Usa la IP de "Network:", NO "localhost"
- Ejemplo: http://192.168.1.40:3000

### Las fotos no aparecen
- Recuerda: localStorage es local a cada dispositivo
- No hay sincronización automática entre dispositivos
- Esto es por diseño (versión sin backend)

### El QR no escanea
- Asegúrate de que la URL sea accesible desde móvil
- Prueba abrir la URL manualmente primero
- Verifica que el móvil tenga permisos de cámara

---

## 🎯 Mejoras Futuras (Opcional)

Si quieres llevar la app al siguiente nivel:

### Funcionalidades Extra:
- [ ] Backend real para sincronización
- [ ] Base de datos (Firebase/Supabase)
- [ ] Almacenamiento en la nube
- [ ] Autenticación de administrador
- [ ] Descarga masiva de fotos
- [ ] Filtros y efectos
- [ ] Comentarios en fotos
- [ ] Slideshow automático
- [ ] Música de fondo
- [ ] WhatsApp sharing

### Stack Recomendado:
- Backend: Next.js API Routes + Firebase
- Storage: Cloudinary (gratis hasta 25GB)
- Auth: NextAuth.js
- Database: Firebase Firestore o Supabase

---

## 💡 Consejos Pro

### Antes de la Fiesta:
- ✅ Prueba con amigos/familiares
- ✅ Imprime varios QR de respaldo
- ✅ Ten el laptop cargado
- ✅ Verifica la conexión WiFi
- ✅ Haz un deploy a Vercel (más confiable)

### Durante la Fiesta:
- ✅ Proyecta el QR en una pantalla grande
- ✅ Pon QRs impresos en las mesas
- ✅ Ten un cartel con instrucciones simples
- ✅ Asigna a alguien para ayudar con dudas técnicas
- ✅ Monitorea que el WiFi funcione bien

### Después de la Fiesta:
- ✅ Recuerda a los invitados descargar SUS fotos ANTES de irse
- ✅ Haz backup del localStorage (ver sección de descarga)
- ✅ Considera crear un álbum compartido (Google Photos, etc.)

---

## 📞 Soporte

Si algo no funciona:

1. **Revisa la consola del navegador** (F12)
2. **Verifica que Next.js esté corriendo** (`npm run dev`)
3. **Limpia el cache** (`rm -rf .next && npm run dev`)
4. **Reinstala dependencias** (`rm -rf node_modules package-lock.json && npm install`)

---

## 🎊 ¡Disfruta tu Fiesta!

Esta app fue diseñada para que puedas enfocarte en celebrar mientras los momentos especiales quedan capturados.

**¡Que tengas una fiesta inolvidable!** 💕✨🎉

---

## 📄 Archivos Importantes

- `app/page.tsx` - Página principal con galería
- `app/qr-print/page.tsx` - Página para imprimir QR
- `components/QRCodeGenerator.tsx` - Generador de QR
- `components/FloatingHearts.tsx` - Efectos visuales
- `tailwind.config.js` - Configuración de colores
- `config.ts` - Configuración personalizable

---

**Desarrollado con ❤️ para hacer tu fiesta de 15 años inolvidable**
