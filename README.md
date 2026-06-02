# Intercambio2026

Aplicación web para coordinar un intercambio familiar de regalos y cena de Navidad. Los miembros de la familia pueden registrarse, compartir su lista de deseos y apuntar los platillos que traerán a la cena.

**Fecha del evento:** 25 de diciembre de 2026

## Qué incluye

- **Registro e inicio de sesión** con correo y contraseña
- **Lista de deseos** — cada persona comparte ideas de regalos para que la familia sepa qué elegir
- **Menú de la cena** — todos colaboran apuntando el platillo que traerán
- **Cuenta regresiva** al día del intercambio
- **Eliminar cuenta** — cada usuario puede borrar su cuenta y todos sus datos

## Cómo ejecutarlo localmente

### Requisitos

- Node.js (versión LTS recomendada)
- Un proyecto en Supabase con el esquema de base de datos aplicado

### Pasos

1. Clona el repositorio e instala las dependencias:

   ```bash
   npm install
   ```

2. Crea un archivo `.env.local` en la raíz del proyecto con las variables de entorno (ver abajo).

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Variables de entorno

Copia la plantilla de `.env.example` y complétala con los valores de tu proyecto de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu-clave-publica
```

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto en Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clave pública (anon) de Supabase |

Obtén estos valores en: [Supabase Dashboard](https://supabase.com/dashboard) → Settings → API

> **Nota:** No se necesita ninguna clave de servicio (service role). Nunca incluyas claves secretas en el frontend.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción |
| `npm run start` | Ejecuta el servidor de producción |
| `npm run lint` | Ejecuta el linter (ESLint) |

## Despliegue en producción

La aplicación está diseñada para desplegarse en [Vercel](https://vercel.com/) (plan gratuito Hobby) con Supabase como backend (plan gratuito).

### Configuración en Vercel

1. Sube el repositorio a GitHub.
2. Importa el proyecto en Vercel (Next.js se detecta automáticamente).
3. Configura las variables de entorno en Vercel (las mismas que en `.env.local`).
4. En Supabase → Authentication → URL Configuration, agrega tu URL de Vercel como redirect URL.
5. Despliega la rama `main`.

### Supabase

Aplica las migraciones a tu proyecto:

```bash
supabase link --project-ref <tu-project-ref>
supabase db push
```

## Estructura del proyecto

```
app/                     # Páginas y componentes de la interfaz
  page.tsx               # Página principal (cuenta regresiva, reglas, listas)
  login/                 # Inicio de sesión
  signup/                # Registro
  profile/               # Perfil del usuario (editar deseos y platillos)
  components/            # Componentes reutilizables
  providers/             # Proveedores de contexto (autenticación)
lib/                     # Lógica compartida (cliente Supabase, datos)
supabase/
  migrations/            # Migraciones SQL de la base de datos
```

## Contacto

Proyecto organizado para el intercambio familiar de Navidad 2026. Para dudas o sugerencias, contacta al organizador del evento.
