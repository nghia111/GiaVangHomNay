import type { StackScreenProps } from '@react-navigation/stack';
import { Paths } from './paths';
export type RootStackParamList = {
  [Paths.Home]: undefined;
}
export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
export const enum Actions {
  New = 'New',
  Edit = 'Edit',
}
