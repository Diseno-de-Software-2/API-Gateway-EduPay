# API GATEWAY EduPay

Este es el API Gateway del proyecto EduPay.

## Cómo ejecutar

Para ejecutar la pasarela de la API, es necesario tener instalado [Node.js](https://nodejs.org/en/).

A continuación, es necesario instalar las dependencias:

```bash
npm install
```

Por último, puede ejecutar el API Gateway:

```bash
npm run dev
```

## Port

El API Gateway se ejecutará en el puerto 3000.

## Registro json

En este json se registra la cantidad de instancias por servicios que se tienen activas y si estas están activas o inactivas

```json

{
  "services": {
    "auth": {
      "loadBalancerStrategy": "ROUND_ROBIN",
      "index": 0,
      "instances": []
    },
    "query": {
      "loadBalancerStrategy": "ROUND_ROBIN",
      "index": 0,
      "instances": []
    },
    "account": {
      "loadBalancerStrategy": "ROUND_ROBIN",
      "index": 0,
      "instances": []
    },
    "balance": {
      "loadBalancerStrategy": "ROUND_ROBIN",
      "index": 0,
      "instances": []
    },
    "pay": {
      "loadBalancerStrategy": "ROUND_ROBIN",
      "index": 0,
      "instances": []
    }
  }
}

```

## Peticiones 

### Puntos finales abiertos

No authentication token required

---
### Autenticación
* **URL**

  _localhost:3000/auth/login_
 
* **Notas:**
Redirige a al servicio de autenticación para comprobar el usuario y contraseña y asignarte un token.

---

---
### Eliminar un servicio
* **URL**

 _localhost:3000/unregister_

* **Method:**

  `POST` 

* **Parámetros de datos**

```
        {
            apiName: "apiname",
            url: "..."
        }
```

* **Respuesta al éxito:**
  
  * **Code:** 200 <br />
    **Content:** `Service unregistered`
 
* **Respuesta al error:**

  * **Code:** 
    **Content:** `Error unregistering service`
    
  O
  
  * **Code:** 
    **Content:** `Service not registered`

* **Notas:**
Elimina un servicio en registry.json

---

---
### Añade un servicio
* **URL**

 _localhost:3000/register_

* **Método:**

  `POST` 

* **Parámetros de datos**

```
        {
            apiName: "apiname",
            protocol: "http",
            host: HOST,
            port: PORT,
        }
```

* **Respuesta al éxito:**
  
  * **Code:** 200 <br />
    **Content:** `Service registered`
 
* **Respuesta al error:**

  * **Code:** 
    **Content:** `Error registering service`

* **Notas:**
Registra un servicio en registry.json

---
---
### Activa o desactiva un servicio
* **URL**

 _localhost:3000/switch/:apiname_

* **Método:**

  `GET` 

* **Parámetros de la url**

```
        {
            apiName: "apiname",
            url: "..."
        }
```

* **Respuesta al éxito:**
  
  * **Code:** 200 <br />
    **Content:** `Service updated`
 
* **Error Response:**

  * **Code:** 
    **Content:** `{err}`

* **Notas:**
 Activa o desactiva un servicio
 
---

### Endpoints

Necesitan un campo de autorización en la cabecera que contenga el token dado por el servicio de autorización.
