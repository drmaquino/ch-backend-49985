import Stripe from 'stripe'
import { STRIPE_KEY } from '../config/stripe.config.js'
import { ProductosRepository, productosRepository } from '../repositories/productos.repository.js'

const CIEN_CENTAVOS_POR_DOLAR = 100

export class PaymentsService {
  #stripe
  #productosRepository
  constructor(
    /** @type {Stripe} */ stripe,
    /** @type {ProductosRepository} */ productosRepository) {
    this.#stripe = stripe
    this.#productosRepository = productosRepository
  }

  async createPaymentIntent(productId) {
    const productRequested = await this.#productosRepository.readOne({ id: productId })
    const paymentIntentInfo = {
      amount: productRequested.price * CIEN_CENTAVOS_POR_DOLAR,
      currency: 'usd',
      metadata: {
        userId: 'algunUserID',
        orderDetails: JSON.stringify({ [productRequested.name]: 1 }),
        address: JSON.stringify({
          street: 'algunaDireccion',
          postalCode: 'algunCodigoPostal',
          externalNumber: '123456'
        })
      }
    }
    const paymentIntent = await this.#stripe.paymentIntents.create(paymentIntentInfo)
    return paymentIntent
  }
}

const stripe = new Stripe(STRIPE_KEY, { apiVersion: '2022-11-15' })
export const paymentsService = new PaymentsService(stripe, productosRepository)