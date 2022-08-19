export interface LoadingState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
