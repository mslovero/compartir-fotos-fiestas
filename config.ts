// Configuración personalizable de la app
export const appConfig = {
  // Información del evento
  event: {
    title: "Loli",
    subtitle: "Captura y comparte los momentos más especiales",
    date: new Date("2026-03-15"), // Cambia esta fecha
  },

  // Textos personalizables
  texts: {
    uploadButton: "Toca para tomar una foto",
    uploadSubtext: "o seleccionar de tu galería",
    uploadingText: "Subiendo...",
    uploadSuccess: "Subir Foto",
    galleryTitle: "Galería de Recuerdos",
    emptyGallery: "¡Sé el primero en compartir un momento especial!",
    qrTitle: "Escanea para subir fotos",
    qrInstructions:
      "Los invitados pueden escanear este código para acceder y subir sus fotos",
    footer: "Creado con amor para celebrar un día inolvidable",
  },

  // Configuración de la galería
  gallery: {
    photosPerRow: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
    },
    showTimestamp: true,
    allowDelete: true,
  },

  // Efectos visuales
  effects: {
    floatingHearts: true,
    animations: true,
    glassEffect: true,
  },
};

export default appConfig;
