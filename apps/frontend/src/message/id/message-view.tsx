import { IMessage, IOffer } from '@bright-offer-summary/shared';
import { FC } from 'react';

export interface MessageViewProps {
	message: IMessage;
}

export const MessageView: FC<MessageViewProps> = ({ message }) => {
	const offer = message.offer as IOffer;
	return (
		<main>
			<summary>
				¡Felicidades! Estás un paso más cerca de disfrutar de los beneficios del
				Sol.
			</summary>
			<hr />
			<table className="table">
				<tbody>
					<tr>
						<th>Tamaño del sistema</th>
						<td>{offer.systemSize} kW</td>
					</tr>
					<tr>
						<th>Cantidad de paneles</th>
						<td>{offer.panelQuantity}</td>
					</tr>
					<tr>
						<th>Tipo de panel</th>
						<td>{offer.panelType}</td>
					</tr>
					<tr>
						<th>Mensualidad</th>
						<td>${offer.monthlyPayment.toFixed(2)}</td>
					</tr>
					<tr>
						<th>Depósito inicial</th>
						<td>${offer.initialDeposit.toFixed(2)}</td>
					</tr>
					<tr>
						<th>Escalador</th>
						<td>{offer.annualEscalator.toFixed(2)}% anual</td>
					</tr>
				</tbody>
			</table>
			<div>System Size: {offer.systemSize}</div>
			<div>Annual Escalator: {offer.annualEscalator}</div>
			<div>Initial Deposit: {offer.initialDeposit}</div>
			<div>Monthly Payment: {offer.monthlyPayment}</div>
			<div>Panel Quantity: {offer.panelQuantity}</div>
			<div>Panel Type: {offer.panelType}</div>
		</main>
	);
};
