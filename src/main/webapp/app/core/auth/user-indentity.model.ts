export interface IUserIdentity extends Account {
  authorities: string[];
  langKey?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  roleTypeIndex?: string;
}
