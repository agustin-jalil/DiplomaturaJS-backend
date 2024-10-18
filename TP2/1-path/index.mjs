import path from 'path';

//Definir una ruta de archivo de ejemplo
const filePath = './data/example.txt';

//Obtener directorio base
const dirName = path.dirname(filePath);
console.log('Directorio base:', dirName); 

//obtener el nombre del archivo sin extension
const baseName = path.basename(filePath,'.txt' );
console.log('Nombre del archivo sin extensión:', baseName);

//obtener la extension del archivo
const extName = path.extname(filePath);
console.log('Extension del archivo:', extName);

//Crear una ruta unida
const newPath = path.join('/user','docs','newfile.txt');
console.log('Nueva ruta:', newPath);