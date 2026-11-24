# CRM Demo API

Implementación de la **API de CRM Demo** con persistencia en archivo JSON local (`data/crm_db.json`), manteniendo los contratos, esquemas de datos, autenticación por token Bearer de asesor, filtrado automático de cartera, paginación por cursor y códigos de respuesta de la guía de integración.

---

## 🚀 Requisitos y Ejecución

### 1. Requisitos
- Node.js >= 18 (Probado en Node.js v22)
- npm

### 2. Instalación de dependencias
```bash
npm install
```

### 3. Iniciar el servidor

Modo desarrollo (recarga en caliente con TypeScript):
```bash
npm run dev
```

Modo producción (compilar y ejecutar):
```bash
npm run build
npm start
```
Por defecto, la API correrá en `http://localhost:3010` (configurable con la variable de entorno `PORT`).

### 4. Ejecutar pruebas unitarias y de integración
```bash
npm test
```

---

## 🗄️ Persistencia en Archivo JSON

La persistencia de datos se almacena en el archivo:
```
data/crm_db.json
```
Si el archivo no existe, la API lo genera automáticamente con datos semilla basados en la guía de integración. Puedes modificar este archivo en cualquier momento para agregar o editar registros.

La ruta del archivo de base de datos puede personalizarse mediante la variable de entorno:
```bash
DB_PATH=/ruta/a/tu/archivo.json npm start
```

---

## 📊 Modelo de Datos

| Entidad | Campos | Descripción |
|---|---|---|
| **Company** | `id` (cuid2), `name` (string), `nit` (string) | Empresa acreedora de la deuda (ej. HIPER SALUD, Flexo Control). |
| **Debtor** | `id` (cuid2), `documentId` (string), `firstName` (string), `lastName` (string \| null) | El deudor (cliente). `lastName` puede ser `null`. |
| **Agent** | `id` (cuid2), `firstName` (string), `lastName` (string), `email` (string), `token` (string) | Asesor de cobranza. Su token representa su identidad. |
| **Debt** | `id` (cuid2), `invoice` (string), `companyId` (cuid2), `debtorId` (cuid2), `agentId` (cuid2), `dueDate` (date YYYY-MM-DD), `balance` (integer), `currency` (string) | Obligación financiera que vincula a un deudor, una empresa y un asesor. |

---

## 🔑 Credenciales de Demo (Tokens de Asesores)

| Asesor | Email | Token |
|---|---|---|
| **Carlos Mendoza** | `carlos.mendoza@crm-demo.io` | `agt_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6` |
| **Laura Restrepo** | `laura.restrepo@crm-demo.io` | `agt_q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6` |
| **Marcos Giraldo** | `marcos.giraldo@crm-demo.io` | `agt_m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6` |
| **Sofia Herrera** | `sofia.herrera@crm-demo.io` | `agt_c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6` |
| **Diego Romero** | `diego.romero@crm-demo.io` | `agt_s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6` |

> [!NOTE]
> Cada asesor **solo tiene visibilidad de su propia cartera**. Si un deudor tiene deudas con Carlos y deudas con Laura, al consultar con el token de Carlos únicamente se retornarán las deudas asignadas a Carlos.

---

## 🏢 Empresas de Prueba

| Empresa | companyId | NIT |
|---|---|---|
| **HIPER SALUD** | `d3r1iuat79db25b3bt0u3t05` | `830.114.921-3` |
| **Flexo Control** | `ywipuj69fgbzn2dyfs0z5nxt` | `901.458.302-6` |

---

## 📡 Endpoints de la API

### 1. Health check
Verifica si el servicio está en línea. **No requiere autenticación**.
- **Método**: `GET`
- **Ruta**: `/api/health`
- **Respuesta 200**:
  ```json
  {
    "status": "ok"
  }
  ```

---

### 2. Consultar deudor por documento (`documentId`)
Busca un deudor por su cédula o documento de identidad.
- **Método**: `GET`
- **Ruta**: `/api/v1/debtors/byDocumentId/{documentId}`
- **Headers**: `Authorization: Bearer <token>`
- **Ejemplo**:
  ```bash
  curl -H "Authorization: Bearer agt_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" \
    "http://localhost:3010/api/v1/debtors/byDocumentId/1000654321"
  ```
- **Respuesta 200**:
  ```json
  {
    "debtor": {
      "id": "a13rfrdentjfxwtoqnk67ahz",
      "documentId": "1000654321",
      "firstName": "DAVID",
      "lastName": "CASTRO CÓRDOBA"
    },
    "debts": [
      {
        "id": "a48mn288x43j4wnn5r5wgmcz",
        "invoice": "185129",
        "company": {
          "id": "d3r1iuat79db25b3bt0u3t05",
          "name": "HIPER SALUD",
          "nit": "830.114.921-3"
        },
        "dueDate": "2025-04-27",
        "balance": 269000,
        "currency": "COP"
      }
    ]
  }
  ```
- **Errores posibles**:
  - `401 UNAUTHORIZED`: Token ausente o inválido.
  - `403 FORBIDDEN`: El deudor existe, pero ninguna de sus deudas está asignada a tu asesor.
  - `404 NOT_FOUND`: No existe deudor con ese documento, o el documento contiene letras.

---

### 3. Consultar deudor por ID interno (`id` cuid2)
Busca un deudor por su identificador interno cuid2 (ej. `a13rfrdentjfxwtoqnk67ahz`).
- **Método**: `GET`
- **Ruta**: `/api/v1/debtors/{id}`
- **Headers**: `Authorization: Bearer <token>`
- **Ejemplo**:
  ```bash
  curl -H "Authorization: Bearer agt_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" \
    "http://localhost:3010/api/v1/debtors/a13rfrdentjfxwtoqnk67ahz"
  ```
- **Nota**: Si se pasa un número en lugar de un cuid2 a esta ruta, responderá `404` recordando usar `/byDocumentId/`.

---

### 4. Listar cartera del asesor (con paginación y filtro opcional)
Devuelve la lista paginada de deudores asignados al asesor autenticado.
- **Método**: `GET`
- **Ruta**: `/api/v1/debtors`
- **Parámetros query**:
  - `limit`: Cantidad por página (entero entre 1 y 25, por defecto 25).
  - `cursor`: El `nextCursor` de la página previa.
  - `companyId`: Filtra para mostrar únicamente los deudores y deudas de esa empresa acreedora.
- **Ejemplo**:
  ```bash
  # Primeros 5 deudores
  curl -H "Authorization: Bearer agt_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" \
    "http://localhost:3010/api/v1/debtors?limit=5"

  # Filtrado por HIPER SALUD
  curl -H "Authorization: Bearer agt_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" \
    "http://localhost:3010/api/v1/debtors?companyId=d3r1iuat79db25b3bt0u3t05"
  ```
- **Respuesta 200**:
  ```json
  {
    "data": [
      {
        "debtor": {
          "id": "a13rfrdentjfxwtoqnk67ahz",
          "documentId": "1000654321",
          "firstName": "DAVID",
          "lastName": "CASTRO CÓRDOBA"
        },
        "debts": [
          {
            "id": "a48mn288x43j4wnn5r5wgmcz",
            "invoice": "185129",
            "company": {
              "id": "d3r1iuat79db25b3bt0u3t05",
              "name": "HIPER SALUD",
              "nit": "830.114.921-3"
            },
            "dueDate": "2025-04-27",
            "balance": 269000,
            "currency": "COP"
          }
        ]
      }
    ],
    "nextCursor": "a20rfrdentjfxwtoqnk67005",
    "total": 17
  }
  ```

---

## 🛑 Formato de Errores

Todos los errores siguen la estructura canónica:
```json
{
  "error": {
    "code": "CÓDIGO_ERROR",
    "message": "Descripción detallada del error"
  }
}
```

| HTTP | Código | Causa |
|---|---|---|
| **400** | `BAD_REQUEST` | Parámetros inválidos (ej. `limit=0`, cursor inexistente o companyId desconocido). |
| **401** | `UNAUTHORIZED` | Falta header Authorization, formato inválido o token desconocido. |
| **403** | `FORBIDDEN` | El deudor existe en el sistema, pero no pertenece a la cartera del asesor. |
| **404** | `NOT_FOUND` | Deudor no encontrado, ruta no encontrada o documento no numérico. |
| **405** | `METHOD_NOT_ALLOWED` | La API es de solo lectura (solo acepta `GET`). |
| **500** | `INTERNAL` | Error interno del servidor. |
