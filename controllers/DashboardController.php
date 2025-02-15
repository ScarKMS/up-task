<?php	

namespace Controllers;

use Model\Proyecto;
use Model\Usuario;
use MVC\Router;

class DashboardController{
    public static function index(Router $router){
        session_start();
        isAuth();
        
        $id = $_SESSION['id'];

        $proyectos = Proyecto::belongsTo('PropietarioId', $id);

        $router->render('dashboard/index', [
            'titulo' => 'Proyectos',
            'proyectos' => $proyectos
        ]);
    }

    public static function crear_proyecto(Router $router){
        session_start();
        isAuth();
        $alertas = [];

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $proyecto = new Proyecto($_POST);
            
            //validacion
            $alertas = $proyecto->validarProyecto();

            if(empty($alertas)) {
                //generar una url unica
                $proyecto->url = md5(uniqid());

                //almacenar el creador del proyecto
                $proyecto->propietarioId = $_SESSION['id'];
                
                //guardar el proyecto
                $proyecto->guardar();

                //redireccionar
                header('Location: /proyecto?task=' . $proyecto->url);
            }
        }

        $router->render('dashboard/crear-proyecto', [
            'titulo' => 'Crear Proyecto',
            'alertas' => $alertas
        ]);
    }

    public static function proyecto(Router $router){
        session_start();
        isAuth();

        $token = $_GET['task'];
        if(!$token) header('Location: /dashboard');
        
        //revisar que la persona que visita el proyecto es quien lo creo
        $proyecto = Proyecto::where('url', $token);
        if($proyecto->propietarioId !== $_SESSION['id']){
            header('Location: /dashboard');
        }


        $router->render('dashboard/proyecto', [
            'titulo' => $proyecto->proyecto
        ]);
    }

    public static function perfil(Router $router){
        session_start();
        isAuth();
        $usuario = Usuario::find($_SESSION['id']);
        $alertas = [];
        $placeholder = [trim($usuario->nombre), $usuario->email];

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            
            $usuario->sincronizar($_POST);
            $alertas = $usuario->validar_perfil();
            
            if(empty($alertas)){
                //verificar que el email no exista
                $existeUsuario = Usuario::where('email', $usuario->email);
                
                if($existeUsuario && $existeUsuario->id !== $_SESSION['id']){
                    //mostrar error
                    Usuario::setAlerta('error', 'El correo ya esta asignado a otro Usuario');

                } else {
                    //guardar el usurio
                    $usuario->guardar();
                    Usuario::setAlerta('exito', 'Actulizado correctamente');

                    //Actualizar la session
                    $_SESSION['nombre'] = $usuario->nombre;
                }
            }
        }

        // debuguear($usuario);
        $alertas = Usuario::getAlertas();
        $router->render('dashboard/perfil', [
            'titulo' => 'Perfil',
            'usuario' => $usuario,
            'alertas' => $alertas,
            'placeholder' => $placeholder
        ]);
    }

    public static function cambiar_password(Router $router){
        session_start();
        isAuth();
        $alertas = [];

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $usuario = Usuario::find($_SESSION['id']);

            //sincronizar con los datos del usuario
            $usuario->sincronizar($_POST);
            $alertas = $usuario->nuevo_password();

            if(empty($alertas)){
                $resultado = $usuario->comprobarPassword();
                if($resultado){
                    $usuario->password = $usuario->password_nuevo;

                    //Eliminar propiedades inecesarias
                    unset($usuario->password_actual);
                    unset($usuario->password_nuevo);
                    unset($usuario->password2);

                    //hashear nuevo password
                    $usuario->hashPassword();

                    $resultado = $usuario->guardar();

                    if($resultado){
                        Usuario::setAlerta('exito', 'La contraseña se actualizo correctamente');
                        $alertas = Usuario::getAlertas();
                    }
                    
                } else {
                    Usuario::setAlerta('error', 'La contraseña es Incorrecta');
                    $alertas = Usuario::getAlertas();
                }
            }
        }

        $router->render('dashboard/cambiar-password', [
            'titulo' => 'Cambiar Contraseña',
            'alertas' => $alertas
        ]);
    }
}
