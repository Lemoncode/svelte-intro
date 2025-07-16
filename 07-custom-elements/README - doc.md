# 06. Custom Elements

Los componentes de Svelte también pueden compilarse como elementos personalizados (también conocidos como web components) utilizando la opción del compilador customElement: true. Debes especificar un nombre de etiqueta para el componente usando el elemento <svelte:options>.

<svelte:options customElement="my-element" />

<script>
	let { name = 'world' } = $props();
</script>

<h1>¡Hola {name}!</h1>
<slot />

Puedes omitir el nombre de la etiqueta para cualquiera de tus componentes internos que no quieras exponer y usarlos como componentes Svelte normales. Los consumidores del componente aún pueden nombrarlo después si lo necesitan, utilizando la propiedad estática element, que contiene el constructor del elemento personalizado y que está disponible cuando la opción customElement del compilador es true.

// @noErrors
import MyElement from './MyElement.svelte';

customElements.define('my-element', MyElement.element);

Una vez que un elemento personalizado ha sido definido, puede usarse como un elemento DOM normal:

```js
document.body.innerHTML = `<my-element>
		<p>Este es un contenido con *slot*</p>
	</my-element>`;
```

Cualquier prop se expone como propiedad del elemento DOM (además de poder leerse/escribirse como atributos, cuando sea posible).

// @noErrors
const el = document.querySelector('my-element');

// obtener el valor actual de la prop 'name'
console.log(el.name);

// asignar un nuevo valor, actualizando el shadow DOM
el.name = 'everyone';

Ten en cuenta que necesitas declarar explícitamente todas las propiedades, es decir, si haces let props = $props() sin declarar props en las opciones del componente, Svelte no podrá saber qué props exponer como propiedades del elemento DOM.

⸻

Ciclo de vida del componente

Los elementos personalizados se crean a partir de componentes de Svelte mediante un enfoque de envoltorio (wrapper). Esto significa que el componente interno de Svelte no tiene conocimiento de que es un elemento personalizado. El envoltorio del elemento personalizado se encarga de gestionar adecuadamente su ciclo de vida.

Cuando se crea un elemento personalizado, el componente de Svelte que lo envuelve no se crea de inmediato. Solo se crea en el siguiente tick después de que se invoque connectedCallback. Las propiedades asignadas al elemento personalizado antes de insertarse en el DOM se guardan temporalmente y se asignan en la creación del componente, por lo que sus valores no se pierden. Sin embargo, esto no aplica para invocar funciones exportadas del componente: estas solo están disponibles después de que el elemento haya sido montado. Si necesitas invocar funciones antes de la creación del componente, puedes hacerlo mediante la opción extend.

Cuando se crea o actualiza un elemento personalizado escrito con Svelte, el shadow DOM reflejará el valor en el siguiente tick, no de inmediato. Esto permite agrupar actualizaciones y evita que los movimientos de DOM (que desconectan temporalmente el elemento del DOM) desmonten el componente interno.

El componente Svelte interno se destruye en el siguiente tick después de que se invoque disconnectedCallback.

⸻

Opciones del componente

Al construir un elemento personalizado, puedes ajustar varios aspectos definiendo customElement como un objeto dentro de <svelte:options> (disponible desde Svelte 4). Este objeto puede contener las siguientes propiedades:
• tag: string: propiedad opcional para definir el nombre del elemento personalizado. Si se define, se registrará en customElements del documento al importar el componente.
• shadow: propiedad opcional que puede establecerse en "none" para evitar la creación de shadow root. Nota: en este caso los estilos ya no están encapsulados y no puedes usar slot.
• props: propiedad opcional para modificar detalles y comportamientos de las propiedades del componente. Ofrece las siguientes configuraciones:
• attribute: string: puedes actualizar una prop mediante referencia al elemento o como atributo HTML. Por defecto, el nombre del atributo es el nombre de la propiedad en minúsculas. Puedes modificar esto asignando attribute: "<nombre deseado>".
• reflect: boolean: por defecto, los valores actualizados de las props no se reflejan en el DOM. Para habilitar esto, usa reflect: true.
• type: 'String' | 'Boolean' | 'Number' | 'Array' | 'Object': al convertir un atributo a una prop y reflejarlo de vuelta, por defecto se asume tipo String. Si no es correcto (por ejemplo, un número), puedes definirlo con type: "Number".
No necesitas listar todas las propiedades; las no listadas usarán la configuración por defecto.
• extend: propiedad opcional que espera una función como argumento. Esta recibe la clase del elemento personalizado generada por Svelte y debe devolver una clase extendida. Es útil si tienes requisitos específicos del ciclo de vida o deseas usar ElementInternals para una mejor integración con formularios HTML.

<svelte:options
customElement={{
tag: 'custom-element',
shadow: 'none',
props: {
name: { reflect: true, type: 'Number', attribute: 'element-index' }
},
extend: (customElementConstructor) => {
// Extiende la clase para que pueda participar en formularios HTML
return class extends customElementConstructor {
static formAssociated = true;

    			constructor() {
    				super();
    				this.attachedInternals = this.attachInternals();
    			}

    			// Agrega la función aquí, no dentro del componente,
    			// para que siempre esté disponible, incluso si el
    			// componente Svelte interno aún no está montado
    			randomIndex() {
    				this.elementIndex = Math.random();
    			}
    		};
    	}
    }}

/>

<script>
	let { elementIndex, attachedInternals } = $props();
	// ...
	function check() {
		attachedInternals.checkValidity();
	}
</script>

[!NOTA] Aunque TypeScript es compatible en la función extend, tiene limitaciones: debes definir lang="ts" en uno de los scripts y solo puedes usar sintaxis eliminable (erasable syntax). Estas funciones no son procesadas por los preprocesadores de scripts.

⸻

Consideraciones y limitaciones

Los elementos personalizados pueden ser una forma útil de empaquetar componentes para aplicaciones que no usan Svelte, ya que funcionarán con HTML y JavaScript puro, así como con la mayoría de los frameworks. Sin embargo, hay diferencias importantes a tener en cuenta:
• Los estilos están encapsulados, no simplemente alcanzados (scoped) (a menos que uses shadow: "none"). Esto significa que estilos globales (como los de un archivo global.css) no se aplicarán al elemento personalizado, incluidos los estilos con el modificador :global(...).
• En lugar de extraerse como un archivo .css separado, los estilos se insertan como una cadena JavaScript en el componente.
• Los elementos personalizados no son adecuados para renderizado del lado del servidor (SSR), ya que el shadow DOM es invisible hasta que se carga JavaScript.
• En Svelte, el contenido con slot se renderiza de forma perezosa (lazy). En el DOM se renderiza de forma anticipada (eager). Es decir, siempre se creará incluso si el elemento <slot> está dentro de un bloque {#if ...}. Del mismo modo, incluir un <slot> en un {#each ...} no hará que el contenido con slot se repita.
• La directiva let: (obsoleta) no tiene efecto, ya que los elementos personalizados no tienen una forma de pasar datos al componente padre que llena el slot.
• Se requieren polyfills para compatibilidad con navegadores antiguos.
• Puedes usar context de Svelte entre componentes regulares dentro de un elemento personalizado, pero no entre elementos personalizados. Es decir, no puedes usar setContext en un elemento padre y getContext en uno hijo si ambos son elementos personalizados.
• No declares propiedades o atributos que empiecen con on, ya que serán interpretados como event listeners. Por ejemplo, Svelte tratará <custom-element oneworld={true}></custom-element> como customElement.addEventListener('eworld', true) en lugar de customElement.oneworld = true.
