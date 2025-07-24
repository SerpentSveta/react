import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SearchResult } from '../components/SearchResult/SearchResult';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import type { Character } from '../services/types';

const mockResults: Character[] = [
  {
    id: 1,
    name: 'Morty Smith',
    image: 'morty.png',
  },
  {
    id: 2,
    name: 'Rick Sanchez',
    image: 'rick.png',
  },
];

describe('rendering CardList, Card and Button', () => {
  it('render CardList', () => {
    render(<SearchResult results={mockResults} />);

    const cardList = screen.getByRole('list');
    const cardListItem = screen.getAllByRole('listitem');

    expect(cardList).toBeInTheDocument();
    expect(cardListItem).toHaveLength(2);
  });

  it('render card', () => {
    render(<SearchResult results={mockResults} />);

    const titleMorty = screen.getByText(/Morty Smith/i);
    expect(titleMorty).toBeInTheDocument();

    const titleRick = screen.getByText(/Rick Sanchez/i);
    expect(titleRick).toBeInTheDocument();

    const imgMorty = screen.getByAltText('Morty Smith');
    expect(imgMorty).toHaveAttribute('src', 'morty.png');

    const imgRick = screen.getByAltText(/Rick Sanchez/i);
    expect(imgRick).toHaveAttribute('src', 'rick.png');
  });
});

describe('empty results and null', () => {
  it('render message when empty results', () => {
    render(<SearchResult results={[]} />);

    const message = screen.getByText(/Nothing was found/i);
    expect(message).toBeInTheDocument();
  });

  it('render anything when empty is null', () => {
    const { container } = render(<SearchResult results={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('error button', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('backup user interface', async () => {
    const BrokenComponent: React.FC = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    const backupUI = screen.getByText(/Something broke/i);
    expect(backupUI).toBeInTheDocument();
  });
});
