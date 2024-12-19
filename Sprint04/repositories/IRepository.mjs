//interfaz que me define los metodo CRUD
class IRepository{
    obtenerPorId(id){
        throw new Error("Metodo 'obtenerPorId()' no implementado");
    }

    obtenerTodos(){
        throw new Error("Metodo 'obtenerTodos()' no implementado");
    }

    buscarPorAtributo(atributo, valor){
        throw new Error("Metodo 'buscarPorAtributo()' no implementado");
    }

    obtenerMayoresDe30(){
        throw new Error("Metodo 'obtenerMayoresDe30()' no implementado");
    }

    crear(){
        throw new Error("Metodo 'crear()' no implementado");
    }

    actualizar(){
        throw new Error("Metodo 'actualizar()' no implementado");
    }

    eliminar(){
        throw new Error("Metodo 'eliminar()' no implementado");
    }

    eliminarPorNombre(){
        throw new Error("Metodo 'eliminarPorNombre()' no implementado");
    }
}

export default IRepository;