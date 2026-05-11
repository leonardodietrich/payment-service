import { PaymentService } from "../src/PaymentService.js"
import assert from 'node:assert'

const paymentService = new PaymentService()

describe('Tests for the perform payment method', () => {
    it('Should perform a payment with value greater than 100', () => {

        paymentService.performPayment('123-456-789', 'Test Company', 101 )

        const lastPayment = paymentService.getLastPayment()

        assert.strictEqual(lastPayment.barcode, '123-456-789')
        assert.strictEqual(lastPayment.company, 'Test Company')
        assert.strictEqual(lastPayment.amount, 101)
        assert.strictEqual(lastPayment.category, 'cara')
    }),

    it('Should perform a payment with value equal to 100', () => {

        paymentService.performPayment('123-456-789', 'Test Company', 100 )

        const lastPayment = paymentService.getLastPayment()

        assert.strictEqual(lastPayment.barcode, '123-456-789')
        assert.strictEqual(lastPayment.company, 'Test Company')
        assert.strictEqual(lastPayment.amount, 100)
        assert.strictEqual(lastPayment.category, 'padrão')
    }),

    it('Should perform a payment with value less than 100', () => {

        paymentService.performPayment('123-456-789', 'Test Company', 99 )

        const lastPayment = paymentService.getLastPayment()

        assert.strictEqual(lastPayment.barcode, '123-456-789')
        assert.strictEqual(lastPayment.company, 'Test Company')
        assert.strictEqual(lastPayment.amount, 99)
        assert.strictEqual(lastPayment.category, 'padrão')
    })
})

describe('Tests for the get last payment method', () => {
    it('Should get the last payment made', () =>{

        paymentService.performPayment('123-456-789', 'Test Company 1', 101 )
        paymentService.performPayment('987-654-321', 'Test Company 2', 99 )

        const lastPayment = paymentService.getLastPayment()

        assert.strictEqual(lastPayment.barcode, '987-654-321')
        assert.strictEqual(lastPayment.company, 'Test Company 2')
        assert.strictEqual(lastPayment.amount, 99)
        assert.strictEqual(lastPayment.category, 'padrão')
    })
})