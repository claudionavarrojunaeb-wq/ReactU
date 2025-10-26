import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step1 from '../steps/Step1';
import type { FormData } from '../MultiStepForm';

describe('Step1', () => {
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
    render(<Step1 data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByLabelText(/Tipo de usuario\/a/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('muestra todas las opciones de tipo de usuario', () => {
    render(<Step1 data={defaultData} onChange={mockOnChange} />);

    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(5); // 4 opciones + opción por defecto
    expect(screen.getByRole('option', { name: /-Seleccione el tipo de usuario\/a-/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Estudiante/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Padre, madre, tutor/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Red colaboradora/ })).toBeInTheDocument();
  });

  test('llama onChange cuando se selecciona un tipo de usuario', async () => {
    const user = userEvent.setup();
    render(<Step1 data={defaultData} onChange={mockOnChange} />);

    const selectElement = screen.getByRole('combobox');
    await user.selectOptions(selectElement, 'estudiante');

    expect(mockOnChange).toHaveBeenCalledWith({ userType: 'estudiante' });
  });

  test('llama onChange cuando se escribe el nombre', async () => {
    const user = userEvent.setup();
    render(<Step1 data={defaultData} onChange={mockOnChange} />);

    const nameInput = screen.getByLabelText(/Nombre/i);
    await user.type(nameInput, 'Juan');

    // Se llama onChange por cada carácter escribido - verificamos solo que se llamó
    expect(mockOnChange).toHaveBeenCalled();
    // Verificamos que se pasó la propiedad name en todos los llamados
    mockOnChange.mock.calls.forEach(call => {
      expect(call[0]).toHaveProperty('name');
      expect(typeof call[0].name).toBe('string');
    });
  });

  test('muestra los valores previos cuando hay datos', () => {
    const dataWithValues: FormData = {
      ...defaultData,
      name: 'María García',
      userType: 'padre',
    };

    render(<Step1 data={dataWithValues} onChange={mockOnChange} />);

    expect(screen.getByDisplayValue('María García')).toBeInTheDocument();
    
    // Verificar que el select tiene el valor correcto
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('padre');
  });

  test('maneja valor undefined en userType correctamente', () => {
    render(<Step1 data={defaultData} onChange={mockOnChange} />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('');
  });
});