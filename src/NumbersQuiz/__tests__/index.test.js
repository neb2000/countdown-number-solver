import { render, fireEvent, waitFor } from '@testing-library/react'
import NumbersQuizSolver from '..';

describe('Solver interface', () => {
  test('Solves number quiz based on the user input', async () => {
    const solver = render(<NumbersQuizSolver/>);

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