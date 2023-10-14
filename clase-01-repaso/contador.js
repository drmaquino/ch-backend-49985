class Contador {
  static cuentaGlobal = 0

  constructor(nombre) {
    this.nombre = nombre
    this.cuenta = 0
  }

  contar() {
    this.cuenta++
    Contador.cuentaGlobal++
  }

  verCuenta() {
    console.log(`${this.nombre} contó ${this.cuenta} personas`)
  }

  static verCuenta() {
    console.log(`se contaron en total ${Contador.cuentaGlobal} personas`)
  }
}

const c1 = new Contador('marian')
const c2 = new Contador('joaquin')

c1.contar()
c1.contar()
c1.contar()
c1.contar()

c2.contar()
c2.contar()
c2.contar()

c1.verCuenta()
c2.verCuenta()

Contador.verCuenta()