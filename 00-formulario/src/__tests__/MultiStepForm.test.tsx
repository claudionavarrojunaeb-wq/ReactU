import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultiStepForm from '../MultiStepForm';

describe('MultiStepForm', () => {
  beforeEach(() => {
    // Mock console.log y alert antes de cada test
    jest.spyOn(console, 'log').mockImplementation(() => {});
    window.alert = jest.fn();
  });

  afterEach(() => {
    // Limpiar mocks después de cada test
    jest.restoreAllMocks();
  });

  test('renderiza el formulario en el paso 1 inicialmente', () => {
    render(<MultiStepForm />);
    
    expect(screen.getByText(/Formulario multipaso \(Paso 1 de 3\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tipo de usuario\/a/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Siguiente/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Atrás/i })).toBeDisabled();
  });

  test('permite llenar y navegar por todos los pasos del formulario', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm />);

    // Paso 1: Llenar tipo de usuario y nombre
    const selectElement = screen.getByRole('combobox');
    await user.selectOptions(selectElement, 'estudiante');
    expect(selectElement).toHaveValue('estudiante');

    const nameInput = screen.getByLabelText(/Nombre/i);
    await user.type(nameInput, 'Juan Pérez');
    expect(nameInput).toHaveValue('Juan Pérez');

    // Ir a Paso 2
    await user.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(screen.getByText(/Paso 2 de 3/i)).toBeInTheDocument();

    // Paso 2: Llenar email y edad
    const emailInput = screen.getByLabelText(/Email/i);
    await user.type(emailInput, 'juan@example.com');
    expect(emailInput).toHaveValue('juan@example.com');

    const ageInput = screen.getByLabelText(/Edad/i);
    await user.type(ageInput, '25');
    expect(ageInput).toHaveValue(25);

    // Ir a Paso 3
    await user.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(screen.getByText(/Paso 3 de 3/i)).toBeInTheDocument();

    // Paso 3: Ver resumen y aceptar términos
    expect(screen.getByText(/Resumen:/i)).toBeInTheDocument();
    expect(screen.getByText(/juan@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Juan Pérez/i)).toBeInTheDocument();

    const checkbox = screen.getByLabelText(/Acepto términos/i);
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    // Enviar formulario
    await user.click(screen.getByRole('button', { name: /Enviar/i }));

    expect(console.log).toHaveBeenCalledWith('Submitted:', expect.objectContaining({
      name: 'Juan Pérez',
      userType: 'estudiante',
      email: 'juan@example.com',
      age: 25,
      agree: true
    }));
    expect(window.alert).toHaveBeenCalledWith('Formulario enviado. Revisa la consola.');
  });

  test('permite navegar hacia atrás entre pasos', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm />);

    // Ir al paso 2
    await user.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(screen.getByText(/Paso 2 de 3/i)).toBeInTheDocument();

    // Ir al paso 3
    await user.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(screen.getByText(/Paso 3 de 3/i)).toBeInTheDocument();

    // Volver al paso 2
    await user.click(screen.getByRole('button', { name: /Atrás/i }));
    expect(screen.getByText(/Paso 2 de 3/i)).toBeInTheDocument();

    // Volver al paso 1
    await user.click(screen.getByRole('button', { name: /Atrás/i }));
    expect(screen.getByText(/Paso 1 de 3/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Atrás/i })).toBeDisabled();
  });

  test('mantiene los datos al navegar entre pasos', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm />);

    // Llenar datos en paso 1
    const nameInput = screen.getByLabelText(/Nombre/i);
    await user.type(nameInput, 'María García');

    // Ir a paso 2
    await user.click(screen.getByRole('button', { name: /Siguiente/i }));
    
    // Llenar datos en paso 2
    const emailInput = screen.getByLabelText(/Email/i);
    await user.type(emailInput, 'maria@test.com');

    // Volver a paso 1 y verificar que los datos se mantienen
    await user.click(screen.getByRole('button', { name: /Atrás/i }));
    expect(screen.getByLabelText(/Nombre/i)).toHaveValue('María García');

    // Ir nuevamente a paso 2 y verificar datos
    await user.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(screen.getByLabelText(/Email/i)).toHaveValue('maria@test.com');
  });

  test('muestra los indicadores de paso correctamente', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm />);

    // Verificar indicadores en paso 1
    const stepIndicators = screen.getAllByText(/^[123]$/);
    expect(stepIndicators[0]).toHaveClass('active');
    expect(stepIndicators[1]).not.toHaveClass('active');
    expect(stepIndicators[2]).not.toHaveClass('active');

    // Ir a paso 2
    await user.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(stepIndicators[0]).not.toHaveClass('active');
    expect(stepIndicators[1]).toHaveClass('active');
    expect(stepIndicators[2]).not.toHaveClass('active');

    // Ir a paso 3
    await user.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(stepIndicators[0]).not.toHaveClass('active');
    expect(stepIndicators[1]).not.toHaveClass('active');
    expect(stepIndicators[2]).toHaveClass('active');
  });

  test('valida que el botón de envío solo aparece en el paso 3', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm />);

    // Paso 1: Solo botón Siguiente
    expect(screen.getByRole('button', { name: /Siguiente/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Enviar/i })).not.toBeInTheDocument();

    // Paso 2: Botones Atrás y Siguiente
    await user.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(screen.getByRole('button', { name: /Siguiente/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Atrás/i })).not.toBeDisabled();
    expect(screen.queryByRole('button', { name: /Enviar/i })).not.toBeInTheDocument();

    // Paso 3: Botones Atrás y Enviar
    await user.click(screen.getByRole('button', { name: /Siguiente/i }));
    expect(screen.queryByRole('button', { name: /Siguiente/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Atrás/i })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument();
  });

  test('maneja valores opcionales correctamente', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm />);

    // Ir directamente al paso 3 sin llenar campos opcionales
    await user.click(screen.getByRole('button', { name: /Siguiente/i }));
    await user.click(screen.getByRole('button', { name: /Siguiente/i }));

    // Aceptar términos y enviar
    const checkbox = screen.getByLabelText(/Acepto términos/i);
    await user.click(checkbox);
    await user.click(screen.getByRole('button', { name: /Enviar/i }));

    expect(console.log).toHaveBeenCalledWith('Submitted:', expect.objectContaining({
      name: '',
      userType: undefined,
      email: '',
      age: undefined,
      agree: true
    }));
  });
});
