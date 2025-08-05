import { Button } from '../Button/Button';
import { useQueryClient } from '@tanstack/react-query';

export function RefreshButton() {
  const queryClient = useQueryClient();

  function cacheInvalidation() {
    queryClient.invalidateQueries({ queryKey: ['characters'] });
    queryClient.invalidateQueries({ queryKey: ['characters-details'] });
  }

  return (
    <Button
      onClick={() => {
        cacheInvalidation();
      }}
    >
      Refresh
    </Button>
  );
}
