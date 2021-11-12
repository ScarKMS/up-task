<div class="contenedor">
    <h1>UpTask</h1>
    <p class="tagline">Crea y Administra tus Proyectos</p>

    <div class="contenedor-sm">
        <p class="descripcion-pagina">Iniciar Sesión</p>
        <form action="/" method="POST" class="formulario">
            <div class="campo">
                <label for="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Tu Email"
                />
            </div>

            <div class="campo">
                <label for="password">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Tu Contraseña"
                />
            </div>

            <input type="submit" value="Iniciar Sesión" class="boton">
        </form>

        <div class="acciones">
            <a href="/crear">¿Aún no tienes una cuenta? ¡Crea Una!</a>
            <a href="/olvide">¿Olvidaste tu Contraseña?</a>
        </div>

    </div><!--.Contenedor SM-->
</div>