export interface LoadingState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const defaultLoadingState: LoadingState = {
  status: 'idle',
  error: null,
}