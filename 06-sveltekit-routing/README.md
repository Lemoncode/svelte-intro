# 01. SvelteKit Routing

Podemos tener una aplicación SvelteKit con rutas y navegación entre ellas. En este ejemplo, crearemos una aplicación sencilla con varias rutas y veremos cómo navegar entre ellas.

Vamos a crear una aplicación desde 0, siguiendo los pasos del [get started](../01-get-started/README.md).

## Crear nuevas páginas

Para crear nuevas páginas en SvelteKit, simplemente creamos un nuevo archivo dentro de la carpeta `src/routes` que corresponda. Por ejemplo, para crear una página de lista, creamos el archivo `src/routes/list/+page.svelte`.

## Rutas dinámicas

Si queremos que una ruta sea dinámica, podemos usar corchetes en el nombre del directorio. Por ejemplo, para crear una página de detalle que reciba un parámetro _slug_, creamos el archivo `src/routes/detail/[slug]/+page.svelte`.

## Obtener parámetros de la ruta

Para obtener los parámetros de la ruta, podemos usar el objeto `page` que SvelteKit nos proporciona en **$app/state**. Este objeto contiene información sobre la ruta actual, incluyendo los parámetros:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	let { slug } = page.params;
</script>

<h1>Detail Page for {slug}</h1>
```

## Layouts

Para los Layouts, podemos crear un archivo `+layout.svelte` dentro de la carpeta de la jerarquía de las rutas donde queramos aplicar el _layout_. Este archivo se usará como layout para todas las rutas dentro de esa carpeta.

## Ejemplo

Un ejemplo de una aplicación con Home, List y Detail (con parámetro) podría ser el siguiente:

```txt
 -src
  └── routes
      ├── +layout.svelte
      ├── +page.svelte
      ├── list
      │   └── +page.svelte
      └── detail
          └── [slug]
              └── +page.svelte
```

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Si lo que te gusta es el mundo del _backend_ también puedes apuntante a nuestro [Bootcamp backend Online Lemoncode](https://lemoncode.net/bootcamp-backend#bootcamp-backend/inicio)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)
