# Aplicación Foto + Ubicacion

Nombre: Kevin Muñoz

## Detalles de la aplicación

Esta aplicación implementa funcionalidades de cámara y geolocalización con Capacitor, donde al tomar la foto se dará la ubicación en la que fue tomada con un enlace a Google Maps en indicará latitud y longitud

## Instalación de dependencias

Para esta aplicación fue necesario instalar lo siguiente: 

<code>npm install @capacitor/filesystem</code> 

<code>npm install @capacitor/camera</code>

<code>npm install @capacitor/geolocation</code>

Para que funcione en el navegador también es necesario instalar:

<code>npm install @ionic/pwa-elements</code>

## Configuración proyecto

Es necesario inicializar un servicio que para este caso fue con:

<code>ionic g service services/foto-geo-service</code>

Ese servicio contendrá la lógica necesaria para tomar foto, obtener coordenadas provenientes de otro servicio y guardar el archivo txt. 

Para visualizar el contenido de este servicio: [foto-geo-service.ts](/src/app/services/foto-geo-service.ts)

Se debe crear otro servicio que para este caso fue <code>Location.ts</code> que manejará la geolocalización (Pide permisos, obtiene coordenadas) 


## Demostración de la Aplicación

Al iniciar la aplicación, nos pedirá dar permisos para acceder a la ubicación y a la cámara para poder tomar fotos y mostrar las respectivas coordenadas, tal como se muestra a continuación

<img width="290" height="409" alt="image" src="https://github.com/user-attachments/assets/ef6ea80b-7e80-42a6-88f7-e5c6f813c92d" />

<img width="275" height="370" alt="image" src="https://github.com/user-attachments/assets/3fccd8c5-9088-4901-b938-97b20c534e87" />

<img width="308" height="223" alt="image" src="https://github.com/user-attachments/assets/2b93cd13-dd2c-4a17-a1aa-37e53cf8f64d" />

<img width="291" height="544" alt="image" src="https://github.com/user-attachments/assets/7b2882da-3940-47da-b7bb-e8ff49733be9" />

<img width="294" height="454" alt="image" src="https://github.com/user-attachments/assets/1b53baf4-1aa8-4070-8d08-8136c5606927" />

<img width="710" height="479" alt="image" src="https://github.com/user-attachments/assets/19029ebf-7c2c-49f6-9532-3ec6781a2f16" />

<img width="684" height="332" alt="image" src="https://github.com/user-attachments/assets/f7bb9937-fd07-4a02-963b-4a309ac96fb4" />






