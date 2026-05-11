export class PaymentService {
    #payments

    constructor(){
        this.#payments = []
    }

    performPayment(barcode, company, amount){
        if(amount > 100){
            this.#payments.push({
                barcode: barcode,
                company: company,
                amount: amount,
                category: 'cara'
            })
        }else{
            this.#payments.push({
                barcode: barcode,
                company: company,
                amount: amount,
                category: 'padrão'
            })
        }
    }

    getLastPayment(){
        return this.#payments.at(-1)
    }
}