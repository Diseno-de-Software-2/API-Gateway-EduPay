# API GATEWAY EduPay

This is the API Gateway for the EduPay project.

## How to run

To run the API Gateway, you need to have installed [Node.js](https://nodejs.org/en/).

Then, you need to install the dependencies:

```bash
npm install
```

Finally, you can run the API Gateway:

```bash
npm run dev
```

## Port

The API Gateway will be running on port 3000.

## Registry json

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

### Open endpoints

No requieren token de autenticación

---
### Autenticación
* **URL**

  _localhost:3000/auth/login_
 
* **Notes:**
Redirige a al servicio de autenticación para comprobar el usuario y contraseña y asignarte un token.

---

---
### Eliminar un servicio
* **URL**

 _localhost:3000/unregister_

* **Method:**

  `POST` 

* **Data Params**

```
        {
            apiName: "apiname",
            url: "..."
        }
```

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `Service unregistered`
 
* **Error Response:**

  * **Code:** 
    **Content:** `Error unregistering service`
    
  OR
  
  * **Code:** 
    **Content:** `Service not registered`

* **Notes:**
Elimina un servicio en registry.json

---

---
### Añade un servicio
* **URL**

 _localhost:3000/register_

* **Method:**

  `POST` 

* **Data Params**

```
        {
            apiName: "apiname",
            protocol: "http",
            host: HOST,
            port: PORT,
        }
```

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `Service registered`
 
* **Error Response:**

  * **Code:** 
    **Content:** `Error registering service`

* **Notes:**
Registra un servicio en registry.json

---
---
### Activa o desactiva un servicio
* **URL**

 _localhost:3000/switch/:apiname_

* **Method:**

  `GET` 

* **Url Params**

```
        {
            apiName: "apiname",
            url: "..."
        }
```

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `Service updated`
 
* **Error Response:**

  * **Code:** 
    **Content:** `{err}`

* **Notes:**
 Activa o desactiva un servicio
 
---

### Endpoints

Necesitan un campo authorization en el header que contenga el token dado por el servicio de autorización
