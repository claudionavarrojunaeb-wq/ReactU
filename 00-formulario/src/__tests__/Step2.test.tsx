import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step2 from '../steps/Step2';
import type { FormData } from '../MultiStepForm';

describe('Step2', () => {
  const mockOnChange = jest.fn();
  const defaultData: FormData = {
    name: '',
    userType: undefined,
    email: '',
    age: undefined,
    agree: false,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renderiza los campos correctamente', () => {
    render(<Step2 data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Edad/i)).toBeInTheDocument();
    
    const emailInput = screen.getByLabelText(/Email/i);
    const ageInput = screen.getByLabelText(/Edad/i);
    
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(ageInput).toHaveAttribute('type', 'number');
  });

  test('llama onChange cuando se escribe el email', async () => {
    const user = userEvent.setup();
    render(<Step2 data={defaultData} onChange={mockOnChange} />);

    const emailInput = screen.getByLabelText(/Email/i);
    await user.type(emailInput, 'test@example.com');

    // Verificamos que se llamó onChange (puede variar el número exacto de llamados)
    expect(mockOnChange).toHaveBeenCalled();
    // Verificamos que se pasó la propiedad email en todos los llamados
    mockOnChange.mock.calls.forEach(call => {
      expect(call[0]).toHaveProperty('email');
      expect(typeof call[0].email).toBe('string');
    });
  });

  test('llama onChange cuando se escribe la edad', async () => {
    const user = userEvent.setup();
    render(<Step2 data={defaultData} onChange={mockOnChange} />);

    const ageInput = screen.getByLabelText(/Edad/i);
    await user.type(ageInput, '25');

    // Verificamos que se llamó onChange
    expect(mockOnChange).toHaveBeenCalled();
    // Verificamos que se pasó la propiedad age en los llamados
    mockOnChange.mock.calls.forEach(call => {
      expect(call[0]).toHaveProperty('age');
    });
  });

  test('maneja edad vacía correctamente', async () => {
    const user = userEvent.setup();
    const dataWithAge: FormData = {
      ...defaultData,
      age: 30,
    };
    
    render(<Step2 data={dataWithAge} onChange={mockOnChange} />);

    const ageInput = screen.getByLabelText(/Edad/i);
    await user.clear(ageInput);

    expect(mockOnChange).toHaveBeenCalledWith({ age: undefined });
  });

  test('muestra los valores previos cuando hay datos', () => {
    const dataWithValues: FormData = {
      ...defaultData,
      email: 'usuario@test.com',
      age: 28,
    };

    render(<Step2 data={dataWithValues} onChange={mockOnChange} />);

    expect(screen.getByDisplayValue('usuario@test.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('28')).toBeInTheDocument();
  });

  test('maneja edad con valor 0 correctamente', async () => {
    const user = userEvent.setup();
    render(<Step2 data={defaultData} onChange={mockOnChange} />);

    const ageInput = screen.getByLabelText(/Edad/i);
    await user.type(ageInput, '0');

    expect(mockOnChange).toHaveBeenLastCalledWith({ age: undefined });
  });

  test('maneja valores numéricos válidos en edad', async () => {
    const user = userEvent.setup();
    render(<Step2 data={defaultData} onChange={mockOnChange} />);

    const ageInput = screen.getByLabelText(/Edad/i);
    await user.type(ageInput, '65');

    // Verificamos que onChange fue llamado con la propiedad age
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange.mock.calls[0][0]).toHaveProperty('age');
  });

  test('muestra campo de edad vacío cuando age es undefined', () => {
    render(<Step2 data={defaultData} onChange={mockOnChange} />);

    const ageInput = screen.getByLabelText(/Edad/i);
    expect(ageInput).toHaveValue(null);
  });
});