import { IMessage, IOffer } from '@bright-offer-summary/shared';
import { FC } from 'react';

export interface MessageViewProps {
	message: IMessage;
}

export const MessageView: FC<MessageViewProps> = ({ message }) => {
	const offer = message.offer as IOffer;
	return (
		<div className="sm:w-1/2">
			<h3 className="text-center font-bold">
				¡Felicidades! Estás un paso más cerca de disfrutar de los beneficios del
				Sol.
			</h3>
			<hr className="h-0.5 bg-gray-400 my-4" />
			<h2 className="text-xl font-weight-bold font-bold">Resumen</h2>
			<table className="table">
				<tbody>
					<tr className="hover">
						<th>Tamaño del sistema</th>
						<td>{offer.systemSize} kW</td>
					</tr>
					<tr className="hover">
						<th>Cantidad de paneles</th>
						<td>{offer.panelQuantity}</td>
					</tr>
					<tr className="hover">
						<th>Tipo de panel</th>
						<td>{offer.panelType}</td>
					</tr>
					<tr className="hover">
						<th>Mensualidad</th>
						<td>${offer.monthlyPayment.toFixed(2)}</td>
					</tr>
					<tr className="hover">
						<th>Depósito inicial</th>
						<td>${offer.initialDeposit.toFixed(2)}</td>
					</tr>
					<tr className="hover">
						<th>Escalador</th>
						<td>{offer.annualEscalator.toFixed(2)}% anual</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
