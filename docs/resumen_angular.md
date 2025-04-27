# Resumen Técnico: Aplicación CRUD de Todos con Angular y Firestore

Este documento detalla los conceptos clave de Angular implementados en esta aplicación de ejemplo.

## 1. Arranque de la Aplicación (Bootstrapping)

*   **`main.ts`**: Es el punto de entrada de la aplicación. Utiliza la función `bootstrapApplication` de `@angular/platform-browser` para iniciar la aplicación.
*   **`bootstrapApplication(AppComponent, appConfig)`**: Esta función arranca el componente raíz (`AppComponent`) y le aplica la configuración definida en `appConfig`.

## 2. Configuración de la Aplicación (`app.config.ts`)

*   **`ApplicationConfig`**: Define la configuración global de la aplicación para un entorno standalone.
*   **`providers`**: Un array donde se configuran los servicios y características globales.
    *   **`provideZoneChangeDetection({ eventCoalescing: true })`**: Configura el mecanismo de detección de cambios de Angular (Zone.js). `eventCoalescing: true` optimiza la detección de cambios agrupando múltiples eventos.
    *   **`provideRouter(routes)`**: Configura el sistema de enrutamiento de Angular (aunque en este ejemplo básico, las rutas definidas en `app.routes.ts` pueden ser mínimas).
    *   **`provideFirebaseApp(() => initializeApp(firebaseConfig))`**: Inicializa la conexión con Firebase utilizando la configuración de `firebase.config.ts`.
    *   **`provideFirestore(() => getFirestore())`**: Provee las funcionalidades de Firestore Database para ser inyectadas en los servicios o componentes.

## 3. Componente Principal (`AppComponent`)

*   **`@Component` Decorator**: Marca la clase `AppComponent` como un componente Angular.
    *   **`selector: 'app-root'`**: Define el nombre de la etiqueta HTML (`<app-root>`) que se usará para instanciar este componente (generalmente en `index.html`).
    *   **`standalone: true`**: Indica que es un componente standalone. No necesita ser declarado en un `NgModule`. Puede gestionar sus propias dependencias a través de la propiedad `imports`.
    *   **`imports: [CommonModule, RouterOutlet, FormsModule]`**: Importa otros módulos o componentes necesarios.
        *   `CommonModule`: Proporciona directivas básicas de Angular como `*ngIf`, `*ngFor`, `async` pipe, etc.
        *   `RouterOutlet`: Un componente directiva que actúa como marcador de posición donde el Router renderiza los componentes correspondientes a las rutas activas.
        *   `FormsModule`: Necesario para usar formularios basados en plantillas, incluyendo la directiva `[(ngModel)]`.
    *   **`providers: [TodoService]`**: Registra `TodoService` como un proveedor a nivel de este componente y sus hijos. Aunque `TodoService` está marcado con `providedIn: 'root'`, lo que lo hace disponible globalmente, incluirlo aquí también es válido (aunque redundante en este caso).
    *   **`templateUrl: './app.component.html'`**: Especifica la ruta al archivo HTML que define la vista del componente.
    *   **`styleUrl: './app.component.css'`**: Especifica la ruta al archivo CSS con los estilos específicos para este componente.

## 4. Plantilla HTML (`app.component.html`)

*   **Directivas Estructurales**:
    *   **`*ngFor="let todo of todos$ | async"`**: Itera sobre la lista de todos obtenida del observable `todos$`. El pipe `async` se suscribe automáticamente al observable y desuscribe cuando el componente se destruye, mostrando los valores emitidos.
    *   **`*ngIf="editingId !== todo.id; else editMode"`**: Renderiza condicionalmente el contenido. Muestra el modo de lectura si `editingId` no coincide con el `todo.id` actual. Si la condición es falsa, renderiza el template referenciado por `#editMode`.
    *   **`<ng-template #editMode>`**: Define un bloque de plantilla que no se renderiza directamente, pero puede ser instanciado por directivas estructurales como `*ngIf`.
*   **Binding de Datos**:
    *   **`[checked]="todo.completed"` (Property Binding)**: Vincula la propiedad `checked` del input checkbox al valor de `todo.completed`.
    *   **`[(ngModel)]="newTodoTitle"` (Two-Way Binding)**: Vincula la propiedad `newTodoTitle` del componente con el valor del input. Los cambios en el input actualizan la propiedad y viceversa. Requiere `FormsModule`.
*   **Binding de Eventos**:
    *   **`(change)="toggleTodo(todo)"`**: Ejecuta el método `toggleTodo(todo)` del componente cuando el evento `change` del checkbox se dispara.
    *   **`(click)="deleteTodo(todo.id)"`**: Ejecuta el método `deleteTodo()` cuando se hace clic en el botón.
    *   **`(ngSubmit)="addTodo(newTodoTitle)"`**: Ejecuta el método `addTodo()` cuando el formulario se envía. Usado en la etiqueta `<form>`.

## 5. Servicio (`TodoService`)

*   **`@Injectable({ providedIn: 'root' })`**: Marca la clase `TodoService` como un servicio inyectable. `providedIn: 'root'` hace que Angular cree una única instancia del servicio (singleton) y la ponga a disposición de toda la aplicación sin necesidad de añadirlo a ningún array de `providers` de módulo o componente.
*   **Inyección de Dependencias**: El servicio `Firestore` (configurado en `app.config.ts`) se inyecta en el constructor del `TodoService`.
    ```typescript
    constructor(private firestore: Firestore) { ... }
    ```
*   **Interacción con Firestore**: Utiliza funciones de `@angular/fire/firestore` como `collection`, `collectionData`, `doc`, `setDoc`, `deleteDoc` para realizar operaciones CRUD en la colección 'todos' de Firestore.
*   **Observables (RxJS)**:
    *   El método `getTodos()` devuelve un `Observable<Todo[]>`. `collectionData` de `@angular/fire` proporciona un stream de datos en tiempo real desde Firestore. Los componentes se suscriben a este observable (directamente o mediante el pipe `async`) para recibir actualizaciones automáticamente cuando los datos cambian en la base de datos.

## 6. Formularios (Template-Driven)

*   La aplicación utiliza formularios basados en plantillas (Template-Driven Forms).
*   **`FormsModule`**: Importado en `AppComponent` para habilitar las directivas necesarias.
*   **`[(ngModel)]`**: Para el two-way data binding entre los inputs del formulario y las propiedades del componente (`newTodoTitle`, `editingTitle`).
*   **`(ngSubmit)`**: En la etiqueta `<form>` para manejar el evento de envío del formulario.
*   **`required`**: Atributo HTML5 para validación básica.

Este resumen cubre los aspectos técnicos fundamentales de Angular utilizados en tu aplicación. ¡Espero que te sea útil para tu examen!
