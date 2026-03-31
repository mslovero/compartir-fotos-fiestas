# 🚀 Guía de Despliegue

Esta guía te ayudará a poner tu app en internet para que funcione desde cualquier lugar.

---

## 🌐 Opción 1: Vercel (Recomendado - Gratis)

Vercel es la plataforma creada por los mismos desarrolladores de Next.js. Es **100% gratis** para proyectos personales.

### Pasos:

1. **Crear cuenta en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Regístrate con GitHub, GitLab o email

2. **Instalar Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Hacer login**
   ```bash
   vercel login
   ```

4. **Desplegar**
   ```bash
   cd fiesta-15-photos
   vercel
   ```

5. **Seguir las preguntas**
   - Set up and deploy? **Y**
   - Which scope? (tu usuario)
   - Link to existing project? **N**
   - What's your project name? **fiesta-15-photos**
   - In which directory is your code? **./**
   - Want to override the settings? **N**

6. **¡Listo!**
   - Te dará una URL como: `https://fiesta-15-photos.vercel.app`
   - Copia esa URL y úsala en tu QR code

### Actualizar después de cambios:
```bash
vercel --prod
```

---

## 📱 Opción 2: Netlify (Gratis)

Otra opción excelente y gratuita.

### Pasos:

1. **Crear cuenta**
   - Ve a [netlify.com](https://netlify.com)
   - Regístrate

2. **Instalar Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Hacer login**
   ```bash
   netlify login
   ```

4. **Crear archivo de configuración**
   Crea `netlify.toml` en la raíz:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

5. **Desplegar**
   ```bash
   netlify deploy --prod
   ```

---

## ☁️ Opción 3: GitHub Pages con ngrok (Temporal)

Para una solución rápida durante la fiesta sin deploy permanente:

1. **Instalar ngrok**
   - Ve a [ngrok.com](https://ngrok.com)
   - Descarga e instala

2. **Ejecutar tu app**
   ```bash
   npm run dev
   ```

3. **Crear túnel público**
   ```bash
   ngrok http 3000
   ```

4. **Copiar la URL**
   - Te dará una URL como: `https://abc123.ngrok.io`
   - Usa esa URL en tu QR
   - **Nota**: Esta URL es temporal y cambia cada vez

---

## 🏠 Opción 4: WiFi Local (Sin Internet)

Si no quieres desplegar en internet:

1. **Configura un router WiFi local**
   - Puede ser el WiFi del lugar de la fiesta
   - O un hotspot de tu móvil

2. **Ejecuta la app**
   ```bash
   npm run dev
   ```

3. **Encuentra tu IP local**
   - Mac/Linux: `ifconfig | grep inet`
   - Windows: `ipconfig`
   - Busca algo como: `192.168.1.40`

4. **Comparte la URL**
   - Usa: `http://TU-IP:3000`
   - Ejemplo: `http://192.168.1.40:3000`
   - Todos deben estar en el mismo WiFi

---

## 📊 Comparación de Opciones

| Opción | Costo | Facilidad | Requiere Internet | Permanente |
|--------|-------|-----------|-------------------|------------|
| Vercel | Gratis | ⭐⭐⭐⭐⭐ | Sí | Sí |
| Netlify | Gratis | ⭐⭐⭐⭐ | Sí | Sí |
| ngrok | Gratis | ⭐⭐⭐ | Sí | No |
| WiFi Local | Gratis | ⭐⭐ | No | No |

---

## 🔒 Seguridad y Privacidad

### Para Vercel/Netlify:
- Las fotos se guardan en el navegador (localStorage)
- No se suben a ningún servidor
- Son privadas a cada dispositivo
- Para compartir realmente las fotos, necesitarías un backend

### Para WiFi Local:
- Todo queda en tu red local
- Máxima privacidad
- Las fotos solo existen en los navegadores

---

## 🎯 Recomendación Final

**Para la fiesta:**
- Usa **Vercel** si quieres que la app esté disponible antes/después
- Usa **WiFi Local** si solo la necesitas durante el evento

**Después de la fiesta:**
- Puedes desactivar el deploy en Vercel
- O dejarlo como recuerdo permanente

---

## ❓ Solución de Problemas

### Error: "No se puede conectar"
- Verifica que la URL sea correcta
- Revisa que tengas internet (para Vercel/Netlify)
- Revisa que estés en el mismo WiFi (para local)

### Las fotos no se comparten entre dispositivos
- Es normal - localStorage es local a cada navegador
- Para fotos compartidas, necesitas un backend (fuera del alcance de esta versión)

### El QR no funciona
- Verifica que la URL sea accesible desde tu móvil
- Prueba abrir la URL manualmente primero
- Regenera el QR si cambiaste la URL

---

## 💡 Próximos Pasos

Si quieres que las fotos se compartan realmente entre todos:
1. Necesitas un backend (Node.js + MongoDB/Firebase)
2. Almacenamiento de imágenes (Cloudinary, AWS S3)
3. Base de datos para las fotos

¡Pero para una fiesta, la versión actual funciona perfectamente! 🎉
