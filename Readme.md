# Upload Files

A continuación se realizarán los pasos para implementar un formulario que suba directamente un archivo a S3 de AWS.

## Fuentes

* https://docs.aws.amazon.com 
* https://docs.aws.amazon.com/s3/index.html?id=docs_gateway#lang/es_es

* https://aws.amazon.com/es/developer/ 

## Prerrequisitos

* Tener una cuenta en AWS
* Tener un bocket en S3 (https://console.aws.amazon.com/s3/buckets/udistrital-test)

## Subiendo archivos con JavaScript

#### Construir formulario HTML.

#### Cargar aws script api 
https://sdk.amazonaws.com/js/aws-sdk-2.3.15.min.js

#### Construir librería para gestionar S3 API (s3-aws.js)

* Obtenemos y agregamos las credenciales de AWS.
```
AWS_credentials = {
      userName: 'username'
    , accessKeyId: 'XXXXXXXXX'
    , secretAccessKey: 'XXXXXXXX'
    , region: 'us-east-1'
    , defaultBucket: 'su-bucket'    
};
```
Si no tiene un usuario debe crearlo en la consola de AWS.

* Configurar CORS
```
<CORSConfiguration>
 <CORSRule>
   <AllowedOrigin>*</AllowedOrigin>
   <AllowedMethod>PUT</AllowedMethod>
   <AllowedMethod>POST</AllowedMethod>
   <AllowedMethod>DELETE</AllowedMethod>
   <AllowedHeader>*</AllowedHeader>
 </CORSRule>
</CORSConfiguration>
```

* Inicializar Objeto S3 
```
aws.s3.load();
```

* Upload File 
```
aws.s3.uploadFile(file);
```




