# Usa una imagen oficial de Node.js como base.
# '18-alpine' es una versión ligera, ideal para producción.
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor.
# Aquí es donde vivirá tu código.
WORKDIR /app

# Copia los archivos de dependencias.
# Se copian primero para aprovechar el caché de Docker.
# Si no cambian, Docker no volverá a instalar las dependencias.
COPY package*.json ./

# Instala las dependencias del proyecto.
# Para producción, es mejor usar 'npm ci --only=production'.
RUN npm install

# Copia el resto de los archivos de tu aplicación al directorio de trabajo.
COPY . .

# Expone el puerto en el que tu aplicación se ejecuta dentro del contenedor.
# Cambia el '3000' si tu app usa otro puerto.
EXPOSE 3000

# El comando para iniciar tu aplicación cuando el contenedor arranque.
# Asegúrate de que 'src/index.js' sea el punto de entrada de tu app.
CMD [ "node", "src/index.js" ]
