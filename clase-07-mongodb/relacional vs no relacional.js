// relacional:

// tabla personas

// id (numerico)	nombre (string)	apellido (string)	edad (numerico) direccion (numerico FK) // esquema de la tabla
// 1	            marian        	erwe            	45 1                                                // registro
// 2	            juan	          fdsf            	345                                                  // registro
// 3	            santi	          gfg       	      345                                                    // registro
// 4	            ana	            sdfgsdf       	  345345                                               // registro
// 5	            gabriela    	  sdfsgfddg       	6456                                         // registro

// tabla direcciones
// id calle nro   cp   
// 1 bla  123 asd123
// 2 bla  123 asd123
// 3 bla  123 asd123
// 4 bla  123 asd123
// 5 bla  123 asd123

// tabla telefonos

// no relacional (mongodb especificamente)

// coleccion personas
// sin esquema

const personas = [
  {
    "id": 1,
    "nombre": "marian",
    "apellido": "erwe",
    "edad": 45,
    "trabajo": "profe",
    "direccion": {
      "calle": "bla",
      "nro": 123,
      "cp": "asd123"
    },
    "telefonos": [
      {
        "codPais": "+543",
        "caracteristica": "243",
        "num": "423646"
      }
    ]
  },

  {
    "id": 2,
    "nombre": "juan",
    "apellido": "fdsf",
    "edad": 345,
    "direccion": {
      "calle": "bla",
      "nro": 123,
      "cp": "asd123"
    },
    "telefonos": [
      {
        "codPais": "+543",
        "caracteristica": "243",
        "num": "423646"
      },
      {
        "codPais": "+543",
        "caracteristica": "243",
        "num": "423646"
      }
    ]
  },

  {
    "id": 3,
    "nombre": "santi",
    "apellido": "gfg",
    "edad": 345,
    "direccion": {
      "calle": "bla",
      "nro": 123,
      "cp": "asd123"
    },
    "telefonos": [
      {
        "codPais": "+543",
        "caracteristica": "243",
        "num": "423646"
      }
    ]
  },

  {
    "id": 4,
    "nombre": "ana",
    "apellido": "sdfgsdf",
    "edad": 345345,
    "direccion": {
      "calle": "bla",
      "nro": 123,
      "cp": "asd123"
    },
    "telefonos": [
      {
        "codPais": "+55",
        "caracteristica": "243",
        "num": "423646"
      },
      {
        "codPais": "+543",
        "caracteristica": "243",
        "num": "423646"
      }
    ]
  },

  {
    "id": 5,
    "nombre": "gabriela",
    "edad": 6456,
    "direccion": {
      "calle": "blabla",
      "nro": 1234,
      "cp": "asd123"
    },
    "telefonos": [
      {
        "codPais": "+55",
        "caracteristica": "243",
        "num": "423646"
      },
      {
        "codPais": "+543",
        "caracteristica": "243",
        "num": "423646"
      }
    ]
  },

]

personas
  .find(p => p.telefonos
    .some(t => t.codPais
      .endsWith('534')))
  ?.sort((a, b) => a - b)
  .slice(2, 3)