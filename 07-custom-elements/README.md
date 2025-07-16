# 05. Custom Elements

## Crear el componente de Svelte

Vamos a crear un componente de Svelte, un botón que al pulsarlo genere un número aleatorio y avise al padre del componente a través de una callback prop:

_src/lib/random-number-button.svelte_:

```svelte
<script lang="ts">
	interface Props {
		label: string;
		onpress: (random: number) => void;
	}

	let { label, onpress }: Props = $props();

	const onclick = () => {
		const random = Math.random();
		onpress(random);
	};
</script>

<div>
	<button {onclick}>
		{label}
	</button>
</div>

<style>
	button {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		font-size: 16px;
	}

	button:hover {
		background-color: #0056b3;
	}
</style>
```

Ahora lo consumiremos desde el componente padre (_src/lib/playground.svelte_):

```svelte
<script lang="ts">
	import RandomNumberButton from './random-number-button.svelte';

	let randomNumber = $state(0);

	const onpress = (random: number) => {
		randomNumber = random;
	};
</script>

<RandomNumberButton label="Generate Random Number" {onpress} />

<p>Random number: {randomNumber}</p>
```

## Crear el Custom Element

Vamos a modificar el componente anterior para que se pueda utilizar como un Custom Element. Para ello, primero tenemos que activar la opción de crear _custom elements_ en el archivo de configuración de Svelte:

_src/svelte.config.js_:

```diff
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	},

	compilerOptions: {
		runes: true,
+		customElement: true
	}
};

export default config;
```

Ahora vamos a modificar el componente para que se pueda utilizar como un Custom Element. Para ello, utilizaremos _<svelte:options>_ para indicar que el componente es un Custom Element. Añadiremos al principio del componente la siguiente línea:

```svelte
<svelte:options customElement="wc-random-number-button" />
```

Para consumirlo como un Custom Element desde el padre, vamos a importar el componente y usar el nombre que hemos indicado en _<svelte:options>_:

_src/lib/playground.svelte_:

```diff
<script lang="ts">
-	import RandomNumberButton from './random-number-button.svelte';
+	import './random-number-button.svelte';

	let randomNumber = $state(0);

-	const onpress = (random: number) => {
-		randomNumber = random;
-	};

+	const handlePress = (e: CustomEvent) => {
+		console.log('Button pressed', { e }, e.detail);
+		randomNumber = e.detail;
+	};

</script>

- <RandomNumberButton label="Generate Random Number" {onpress} />
+<wc-random-number-button label={`Generated ${randomNumber}`} onpress={handlePress}
+></wc-random-number-button>

<p>Random number: {randomNumber}</p>
```

Como vemos, las props de datos (string, number, boolean, objetc, arrays...), si que podemos pasarlas directamente como atributos del Custom Element, pero las funciones no. Para comunicar el hijo (wc) con el padre, tenemos que utilizar un evento personalizado (_Custom Event_) que se dispare desde el Custom Element y que el padre pueda escuchar.

Vamos a modificar el componente _random-number-button.svelte_ para que dispare un evento personalizado cuando se pulse el botón:

_src/lib/random-number-button.svelte_:

```svelte
<svelte:options customElement="wc-random-number-button" />

<script lang="ts">
	interface Props {
		label: string;
	}

	let { label }: Props = $props();

	let mySelf: HTMLDivElement;

	const onclick = () => {
		const random = Math.random();
		mySelf.dispatchEvent(
			new CustomEvent('press', {
				detail: random,
				composed: true // makes the event jump shadow DOM boundary
			})
		);
	};
</script>

<div bind:this={mySelf}>
	<button {onclick}>
		{label}
	</button>
</div>

<style>
	button {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		font-size: 16px;
	}

	button:hover {
		background-color: #0056b3;
	}
</style>
```

Como vemos, hemos lanzado un _Custom Event_ llamado `press` con el número aleatorio generado como detalle del evento. También hemos añadido la propiedad `composed: true` para que el evento pueda atravesar el _shadow DOM_ y ser escuchado por el padre.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Si lo que te gusta es el mundo del _backend_ también puedes apuntante a nuestro [Bootcamp backend Online Lemoncode](https://lemoncode.net/bootcamp-backend#bootcamp-backend/inicio)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)
