import { Request } from 'express';

class PaymentController {
	status(request: Request){
		const { collection_status  } = request.query;

		console.log(collection_status);
	}
}

export default new PaymentController;