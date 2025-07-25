import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CharacterDetails } from '../components/CharacterDetails/CharacterDetails';
import { render, screen } from '@testing-library/react';

beforeEach(() => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Morty Smith',
      image: 'morty.png',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
    }),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('CharacterDetails component', () => {
  it('render all fields', async () => {
    render(
      <MemoryRouter initialEntries={['/1/1']}>
        <Routes>
          <Route path="/:page/:detailsId" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const img = await screen.findByRole('img', { name: /Morty Smith/i });
    expect(img).toBeInTheDocument();

    const name = screen.getByText(/Morty Smith/i);
    expect(name).toBeInTheDocument();

    const status = screen.getByText(/Alive/i);
    expect(status).toBeInTheDocument();

    const species = screen.getByText(/Human/i);
    expect(species).toBeInTheDocument();

    const gender = screen.getByText(/Male/i);
    expect(gender).toBeInTheDocument();
  });
});
