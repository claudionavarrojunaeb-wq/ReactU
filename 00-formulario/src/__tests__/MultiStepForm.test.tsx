import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultiStepForm from '../MultiStepForm';

test('navega entre pasos y envía el formulario', async () => {
  const user = userEvent.setup();
  const log = jest.spyOn(console, 'log').mockImplementation(() => {});
  window.alert = jest.fn();

  render(<MultiStepForm />);

  // Paso 1
  expect(screen.getByText(/Paso 1 de 3/i)).toBeInTheDocument();

  // Ir a Paso 2
  await user.click(screen.getByRole('button', { name: /Siguiente/i }));
  expect(screen.getByText(/Paso 2 de 3/i)).toBeInTheDocument();

  // Ir a Paso 3
  await user.click(screen.getByRole('button', { name: /Siguiente/i }));
  expect(screen.getByText(/Paso 3 de 3/i)).toBeInTheDocument();

  // Marcar checkbox y enviar
  const checkbox = screen.getByLabelText(/Acepto términos/i);
  await user.click(checkbox);
  expect(checkbox).toBeChecked();

  await user.click(screen.getByRole('button', { name: /Enviar/i }));

  expect(log).toHaveBeenCalled();
  // Primer argumento del primer llamado es el texto 'Submitted:'
  expect(log.mock.calls[0][0]).toEqual('Submitted:');
  expect(window.alert).toHaveBeenCalled();

  log.mockRestore();
});
