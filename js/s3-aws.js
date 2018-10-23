/**********************************************************
*
* Requiere incluir el API https://sdk.amazonaws.com/js/aws-sdk-2.3.15.min.js
* antes de incluir este archivo en su sitio WEB.
*
* @version 1
* @author {Abel Oswaldo Moreno Acevedo} <{moreno.abel@gmail.com}>
**********************************************************/

/*
 * Objeto con los datos de configuración inicial
 */
const AWS_credentials = {
      userName: 'developer'
    , accessKeyId: 'AKIAJESDFYBUNGQELXPA'
    , secretAccessKey: '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'
    , region: 'us-east-1'
    , defaultBucket: 'udistrital-test'    /* Nombre por defecto del bucket en S3 AWS */
};

/*
 * Bucket en S3
 */
var objectS3;
var aws;

/*
 * Objeto para manejar funcionalidades de AWS
 * Directo al API
 */
aws = {

    /*
     * aws.s3.xxxxxxxxxx
     * Objeto que maneja las funcionalidades de S3
     */
    s3: {

        /*
         * aws.s3.load();
         * Carga la información inicial para gestionar S3
         * Parametros opcionales bucket, callback
         */
        load: function(callback){
            callback = callback || function(){};
            AWS.config.update({accessKeyId: AWS_credentials.accessKeyId, secretAccessKey: AWS_credentials.secretAccessKey});
            // Configure your region
            AWS.config.region = AWS_credentials.region;
            objectS3 = new AWS.S3({params: {Bucket: AWS_credentials.defaultBucket}});   /* Inicializa el bucket */
            callback();
        },

        /*
         * aws.s3.uploadFile(file);
         * Carga de archivo en s3
         * @param {file} file   // Objeto de archivo cargado con archivo
         * @param {string} folder   // Ubicacion en el bucket
         * @param {string} newName
         * @param {function} callback
         * @returns {String}
         */
        uploadFile: function(file, folder, newName, callback){
            callback = callback || function(){};
            folder = folder || '';
            var msj = 'error_1'; /* No se ejecuto la carga */
            if (file) {
              msj = 'success';
              var fileName = newName || file.name;
              var params = {Key: folder+fileName, ContentType: file.type, Body: file, Bucket:AWS_credentials.defaultBucket, ACL:'public-read'};
              objectS3.upload(params, function (err, data) {
                  msj = 'error_2'; /* Excepcion en la carga a AWS */
                  if ( err == null ){
                      callback(data);
                  }else {
                      alert(msj+' --- '+err);
                  }
              });
            } else {
                msj = 'error_3';  /* No hay archivo que cargar*/
                alert(msj);
            }
        },

        /*
         * aws.s3.changeBucket(bucket);
         * Cambia el bucket
         */
        changeBucket: function(bucket, callback) {
            bucket = bucket || AWS_credentials.defaultBucket;
            callback = callback || function(){};
            AWS_credentials.defaultBucket = bucket;
        }

    }

};




function getExt (fileName){
    var s  = fileName,
    lw = s.replace(/^.+[\W]/, '');
    return lw;
}

function getFileName(fileName){
    var d = new Date();
    var sName = d.getFullYear()+''+d.getMonth()+''+d.getDay()+''+d.getHours()+''+d.getMinutes()+''+d.getSeconds()+''+d.getMilliseconds();
    return sName+'.'+getExt(fileName);
}
