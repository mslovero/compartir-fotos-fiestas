# 🎉 Guía Rápida - App de Fotos para los 15 Años

## ⚡ Inicio Rápido (5 minutos)

### 1️⃣ Instalar
```bash
cd fiesta-15-photos
npm install
```

### 2️⃣ Ejecutar
```bash
npm run dev
```

### 3️⃣ Abrir
- Abre tu navegador en: **http://localhost:3000**
- ¡Listo! La app ya está funcionando

---

## 📱 Durante la Fiesta

### Opción A: WiFi Local (Más Fácil)
1. Conecta tu laptop al WiFi de la fiesta
2. Ejecuta `npm run dev`
3. Mira la consola - verás algo como:
   ```
   - Local:    http://localhost:3000
   - Network:  http://192.168.1.40:3000  ← Esta es tu IP
   ```
4. En la app, haz clic en "Mostrar QR para Invitados"
5. Proyecta el QR en una pantalla o imprímelo

### Opción B: Imprimir QR para las Mesas
1. Ve a: **http://localhost:3000/qr-print**
2. Haz clic en "🖨️ Imprimir QR Code"
3. Imprime varias copias
4. Coloca en las mesas con las instrucciones

---

## 👥 Para los Invitados

1. **Escanean el QR** con la cámara del móvil
2. **Toman una foto** o seleccionan de la galería
3. **Suben la foto** - aparece instantáneamente
4. **Ven la galería** con todas las fotos de la fiesta

---

## 🎨 Personalización Rápida

### Cambiar el Título
Edita `app/page.tsx` línea ~94:
```tsx
<h1 className="...">
  Tu Nombre Aquí  ← Cambia esto
</h1>
```

### Cambiar Colores
Los colores están en `tailwind.config.js`:
- `dusty-rose` - Rosa viejo (color principal)
- `champagne` - Champán (fondo)
- `rose-gold` - Oro rosa (acentos)

---

## ⚠️ Solución de Problemas

### ❌ "Cannot find module next"
```bash
npm install
```

### ❌ Los invitados no pueden acceder
- Verifica que estén en el **mismo WiFi**
- Usa la IP que aparece en "Network:" (no localhost)
- Ejemplo: http://192.168.1.40:3000

### ❌ Las fotos no se guardan entre recargas
- Normal - usa localStorage del navegador
- Para persistencia real, necesitas un backend
- Las fotos se mantienen mientras no se limpie el navegador

---

## 💡 Consejos Pro

✅ **Antes de la fiesta:**
- Prueba la app con algunos amigos
- Imprime varios QR de respaldo
- Ten el laptop cargado o conectado

✅ **Durante la fiesta:**
- Proyecta el QR en una pantalla grande
- Pon QRs impresos en las mesas
- Monitorea la galería en otra pantalla

✅ **Después de la fiesta:**
- Las fotos están en localStorage del navegador
- Para descargarlas, haz clic derecho > Guardar imagen
- Considera hacer un backup antes de cerrar

---

## 🚀 Deploy a Internet (Opcional)

Para que funcione desde cualquier lugar sin WiFi:

```bash
# Instala Vercel CLI
npm install -g vercel

# Deploy (sigue las instrucciones)
vercel

# Te dará una URL como: https://tu-app.vercel.app
```

Luego comparte esa URL mediante el QR.

---

## 📞 Ayuda

Si algo no funciona:
1. Lee los mensajes de error en la consola
2. Verifica que Node.js esté instalado: `node --version`
3. Intenta borrar node_modules y reinstalar:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## 🎊 ¡Disfruta tu Fiesta!

Esta app fue diseñada para capturar los momentos más especiales de tu celebración.

**¡Que tengas un día inolvidable!** 💕✨
