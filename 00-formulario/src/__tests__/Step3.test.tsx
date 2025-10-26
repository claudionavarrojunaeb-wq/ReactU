import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step3 from '../steps/Step3';
import type { FormData } from '../MultiStepForm';

describe('Step3', () => {
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

  test('renderiza el checkbox y el resumen correctamente', () => {
    render(<Step3 data={defaultData} onChange={mockOnChange} />);

    expect(screen.getByLabelText(/Acepto términos/i)).toBeInTheDocument();
    expect(screen.getByText(/Resumen:/i)).toBeInTheDocument();
    
    const checkbox = screen.getByLabelText(/Acepto términos/i);
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('llama onChange cuando se marca el checkbox', async () => {
    const user = userEvent.setup();
    render(<Step3 data={defaultData} onChange={mockOnChange} />);

    const checkbox = screen.getByLabelText(/Acepto términos/i);
    await user.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledWith({ agree: true });
  });

  test('llama onChange cuando se desmarca el checkbox', async () => {
    const user = userEvent.setup();
    const dataWithAgree: FormData = {
      ...defaultData,
      agree: true,
    };
    
    render(<Step3 data={dataWithAgree} onChange={mockOnChange} />);

    const checkbox = screen.getByLabelText(/Acepto términos/i);
    expect(checkbox).toBeChecked();
    
    await user.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledWith({ agree: false });
  });

  test('muestra el resumen con todos los datos completos', () => {
    const completeData: FormData = {
      name: 'Ana Martínez',
      userType: 'estudiante',
      email: 'ana@university.edu',
      age: 22,
      agree: true,
    };

    render(<Step3 data={completeData} onChange={mockOnChange} />);

    // Verificar que los datos aparecen en el resumen
    expect(screen.getByText(/Ana Martínez/)).toBeInTheDocument();
    expect(screen.getByText(/estudiante/)).toBeInTheDocument();
    expect(screen.getByText(/ana@university.edu/)).toBeInTheDocument();
    expect(screen.getByText(/22/)).toBeInTheDocument();
    expect(screen.getByText(/true/)).toBeInTheDocument();
  });

  test('muestra el resumen con datos parciales', () => {
    const partialData: FormData = {
      name: 'Carlos',
      userType: undefined,
      email: '',
      age: undefined,
      agree: false,
    };

    render(<Step3 data={partialData} onChange={mockOnChange} />);

    // Verificar que muestra los datos disponibles y los valores por defecto
    expect(screen.getByText(/Carlos/)).toBeInTheDocument();
    expect(screen.getByText(/false/)).toBeInTheDocument();
    
    // Verificar que hay un elemento pre con contenido JSON
    const preElement = screen.getByText(/Carlos/).closest('pre');
    expect(preElement).toBeInTheDocument();
  });

  test('el checkbox refleja el estado actual de agree', () => {
    const dataWithAgree: FormData = {
      ...defaultData,
      agree: true,
    };

    render(<Step3 data={dataWithAgree} onChange={mockOnChange} />);

    const checkbox = screen.getByLabelText(/Acepto términos/i);
    expect(checkbox).toBeChecked();
  });

  test('muestra el resumen formateado como JSON', () => {
    const testData: FormData = {
      name: 'Test User',
      userType: 'otro',
      email: 'test@test.com',
      age: 30,
      agree: false,
    };

    render(<Step3 data={testData} onChange={mockOnChange} />);

    // Verificar que hay un elemento <pre> que contenga el JSON
    const preElement = screen.getByText(/Test User/).closest('pre');
    expect(preElement).toBeInTheDocument();
    expect(preElement?.tagName).toBe('PRE');
    
    // Verificar que el contenido incluye los datos esperados
    expect(screen.getByText(/Test User/)).toBeInTheDocument();
    expect(screen.getByText(/test@test.com/)).toBeInTheDocument();
    expect(screen.getByText(/30/)).toBeInTheDocument();
  });
});