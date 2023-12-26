import { CompanyUser } from './company-user.model';

export const UniqueCompanyUserValidator: (users: CompanyUser[]) => boolean = (users: CompanyUser[]): boolean => {
    const userIdSet: Set<string> = new Set();
    return !users.some((user: CompanyUser): boolean => {
        if (userIdSet.has(user.userId)) {
            return true;
        }
        userIdSet.add(user.userId);
        return false;
    });
};
