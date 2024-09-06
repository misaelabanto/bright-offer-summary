import { IMessage, IOffer } from '@bright-offer-summary/shared';
import { Icon } from '@iconify/react/dist/iconify.js';
import { FC } from 'react';

export interface MessageViewProps {
	message: IMessage;
}

export const MessageView: FC<MessageViewProps> = ({ message }) => {
	const offer = message.offer as IOffer;
	return (
		<div className="lg:w-3/4">
			<h3 className="text-center font-bold">
				¡Felicidades! Estás un paso más cerca de disfrutar de los beneficios del
				Sol.
			</h3>
			<hr className="h-0.5 bg-gray-400 my-4" />
			<h2 className="text-xl font-weight-bold font-bold">Resumen</h2>
			<table className="table">
				<tbody>
					<tr className="hover group">
						<td className="w-10 text-primary group-hover:text-secondary text-xl">
							<Icon icon="mdi:battery-high" />
						</td>
						<th>Tamaño del sistema</th>
						<td>{offer.systemSize} kW</td>
					</tr>
					<tr className="hover group">
						<td className="w-10 text-primary group-hover:text-secondary text-xl">
							<Icon icon="mdi:grid-large" />
						</td>
						<th>Cantidad de paneles</th>
						<td>{offer.panelQuantity}</td>
					</tr>
					<tr className="hover group">
						<td className="w-10 text-primary group-hover:text-secondary text-xl">
							<Icon icon="mdi:solar-power" />
						</td>
						<th>Tipo de panel</th>
						<td>{offer.panelType}</td>
					</tr>
					<tr className="hover group">
						<td className="w-10 text-primary group-hover:text-secondary text-xl">
							<Icon icon="mdi:currency-usd-circle-outline" />
						</td>
						<th>Mensualidad</th>
						<td>${offer.monthlyPayment.toFixed(2)}</td>
					</tr>
					<tr className="hover group">
						<td className="w-10 text-primary group-hover:text-secondary text-xl">
							<Icon icon="mdi:cash-minus" />
						</td>
						<th>Depósito inicial</th>
						<td>${offer.initialDeposit.toFixed(2)}</td>
					</tr>
					<tr className="hover group">
						<td className="w-10 text-primary group-hover:text-secondary text-xl">
							<Icon icon="mdi:chart-line" />
						</td>
						<th>Escalador</th>
						<td>{offer.annualEscalator.toFixed(2)}% anual</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
