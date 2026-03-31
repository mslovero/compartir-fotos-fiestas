# Scripts de Prueba - Galería de Fotos

Scripts para probar el rendimiento de la galería con muchas fotos.

## 📋 Requisitos

Antes de ejecutar los scripts, asegúrate de tener:

1. ✅ Configurado el archivo `.env.local` con credenciales de Firebase y Cloudinary
2. ✅ Firestore activado en Firebase Console
3. ✅ Instalado el paquete `tsx` (se instalará automáticamente)

## 🚀 Instalación

```bash
npm install tsx --save-dev
```

## 📸 Subir Fotos de Prueba

### Subir 500 fotos (por defecto)

```bash
npx tsx scripts/upload-test-photos.ts
```

### Subir cantidad personalizada

```bash
# Subir 100 fotos
npx tsx scripts/upload-test-photos.ts 100

# Subir 1000 fotos
npx tsx scripts/upload-test-photos.ts 1000

# Subir 50 fotos
npx tsx scripts/upload-test-photos.ts 50
```

### ¿Qué hace este script?

1. Descarga imágenes aleatorias de [Picsum Photos](https://picsum.photos)
2. Las sube a Cloudinary en la carpeta `fiesta-15-photos/test`
3. Guarda los metadatos en Firestore con `isTest: true`
4. Sube las fotos en lotes de 10 para mejor rendimiento
5. Muestra el progreso en tiempo real

**Características:**
- ✅ Imágenes reales y variadas
- ✅ Optimizadas automáticamente por Cloudinary
- ✅ Marcadas para fácil eliminación
- ✅ Subida en paralelo (rápido)

**Tiempo estimado:**
- 100 fotos: ~5-10 minutos
- 500 fotos: ~20-30 minutos
- 1000 fotos: ~40-60 minutos

## 🗑️ Eliminar Fotos de Prueba

```bash
npx tsx scripts/cleanup-test-photos.ts
```

### ¿Qué hace este script?

1. Busca todas las fotos con `isTest: true`
2. Las elimina de Cloudinary
3. Las elimina de Firestore
4. Limpia la carpeta `fiesta-15-photos/test` de Cloudinary
5. Muestra un resumen al final

**Seguridad:**
- ⚠️ Espera 3 segundos antes de eliminar (tiempo para cancelar con Ctrl+C)
- ✅ Solo elimina fotos marcadas como "test"
- ✅ No toca las fotos reales de los usuarios

## 📊 Ejemplo de Uso Completo

```bash
# 1. Subir 500 fotos de prueba
npx tsx scripts/upload-test-photos.ts 500

# 2. Abrir http://localhost:3000 y probar el scroll infinito

# 3. Ver cómo se comporta la galería con muchas fotos

# 4. Cuando termines, limpiar
npx tsx scripts/cleanup-test-photos.ts
```

## 🎯 Qué Probar

Con las fotos de prueba cargadas, verifica:

### Rendimiento
- ✅ La página carga rápido (solo 12 fotos iniciales)
- ✅ El scroll es fluido
- ✅ Las fotos se cargan automáticamente al scrollear
- ✅ El indicador "Cargando más fotos..." aparece correctamente

### Funcionalidad
- ✅ El contador muestra la cantidad correcta
- ✅ Las animaciones funcionan bien
- ✅ Puedes eliminar fotos individuales
- ✅ Las fotos nuevas aparecen en tiempo real

### Visual
- ✅ El grid se ve bien en móvil/tablet/desktop
- ✅ Las imágenes tienen buen tamaño
- ✅ El mensaje final aparece cuando llegas al final

## ⚠️ Advertencias

### Límites de Firebase/Cloudinary
- 500 fotos = ~500 MB - 1 GB de almacenamiento
- 1000 fotos = ~1 GB - 2 GB de almacenamiento

Si estás en plan gratuito:
- **Cloudinary:** 25 GB total (suficiente para pruebas)
- **Firebase:** 1 GB almacenamiento, 50k lecturas/día

**Recomendación:** Empieza con 100 fotos, luego sube a 500 si todo va bien.

## 🐛 Solución de Problemas

### Error: "Upload failed"
- Verifica que `.env.local` tenga las credenciales correctas
- Asegúrate de que Cloudinary esté configurado

### Error: "Firebase not initialized"
- Verifica que Firestore esté activado en Firebase Console
- Revisa las credenciales en `.env.local`

### Las fotos no se cargan
- Abre la consola del navegador (F12)
- Revisa los errores
- Verifica que el servidor esté corriendo (`npm run dev`)

### El script es muy lento
- Es normal, sube 10 fotos en paralelo
- Puedes reducir la cantidad: `npx tsx scripts/upload-test-photos.ts 100`

## 📝 Notas Técnicas

### Estructura de una foto de prueba en Firestore

```json
{
  "url": "https://res.cloudinary.com/.../image.jpg",
  "cloudinaryId": "fiesta-15-photos/test/abc123",
  "timestamp": "2026-02-26T...",
  "width": 800,
  "height": 800,
  "isTest": true  // ← Marcador para identificar
}
```

### Fuente de imágenes
- [Picsum Photos](https://picsum.photos) - Servicio gratuito de imágenes placeholder
- Cada imagen es única usando seed aleatorio
- Tamaño: 800x800 (optimizado a 1200x1200 por Cloudinary)

## 🎨 Personalización

### Usar tus propias imágenes

Edita `scripts/upload-test-photos.ts` línea 52:

```typescript
// En lugar de Picsum, usa tu propia URL
const imageUrl = `https://tu-servidor.com/imagenes/foto-${index}.jpg`
```

### Cambiar carpeta de destino

Edita línea 71:

```typescript
folder: 'fiesta-15-photos/mi-carpeta-test',
```

---

## 💡 Consejos

1. **Empieza pequeño:** Prueba con 50-100 fotos primero
2. **Monitorea:** Abre Firebase Console y Cloudinary para ver las subidas en tiempo real
3. **Limpia siempre:** Ejecuta cleanup después de probar
4. **Usa en desarrollo:** No uses estos scripts en producción

---

¡Listo para probar! 🚀
