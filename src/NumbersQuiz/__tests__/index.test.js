import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import NumbersQuizSolver from '..';

describe('Solver interface', () => {
  let solver;

  beforeEach(() => solver = render(<NumbersQuizSolver />));

  test('Number selected is displayed', () => {
    fireEvent.click(solver.getByText('75'));
    expect(solver.container.querySelector('#numbers-selected').textContent).toContain("75");
  });

  test('Small numbers can only be picked twice', () => {
    const btn1 = solver.getByText('1');

    fireEvent.click(btn1);
    expect(btn1.closest('button')).not.toBeDisabled();

    fireEvent.click(btn1);
    expect(btn1.closest('button')).toBeDisabled();
  });

  test('Big numbers can only be picked once', () => {
    const btn100 = solver.getByText('100');

    fireEvent.click(btn100);

    expect(btn100.closest('button')).toBeDisabled();

  });

  test('Solves number quiz based on the user input', async () => {
    fireEvent.click(solver.getByText('1'));
    fireEvent.click(solver.getByText('2'));
    fireEvent.click(solver.getByText('3'));
    fireEvent.click(solver.getByText('4'));
    fireEvent.click(solver.getByText('5'));
    fireEvent.click(solver.getByText('6'));

    const targetInput = solver.getByLabelText('Target');
    fireEvent.change(targetInput, { target: { value: 750 } });

    fireEvent.click(solver.getByText('Solve'));

    await waitFor(() => {
      expect(solver.container.querySelector('#numbers-solution').textContent).toEqual("6*(3+2)*5*(4+1)=750");
    });
  });
});