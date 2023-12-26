export enum CompanyUserRole {
  OWNER = 'owner',
  MEMBER = 'member',
}

export const CompanyUserRoleValues: string[] = [CompanyUserRole.OWNER, CompanyUserRole.MEMBER];

export class CompanyUser {
    readonly userId!: string;
    readonly role!: CompanyUserRole;
}
