import { SetMetadata } from "@nestjs/common";


export const HasPemission = (access: string) => SetMetadata('access',access)