import { Role } from "src/auth/auth/role.enum";
import {SetMetadata} from '@nestjs/common'

export const ROLES_KEY = "roles";
export const Roles = (role:Role,...roles: Role[])=> SetMetadata(ROLES_KEY, roles);