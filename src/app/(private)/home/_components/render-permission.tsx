import { permissions } from '@/permissions/permissions';
import { PilotRank, User } from '@/shared/types'
import React from 'react'

type RenderPermissionProps = {
  user?: User;
  officerPhone?: string;
  role: PilotRank;
  children: React.ReactNode;
}

export function RenderPermission({ user, officerPhone, role, children }: RenderPermissionProps) {
  if(!user) return null;

  const isCurrentUserEditingItSelf = user.phone === officerPhone;
  
  const hasRolePermission = permissions[role] <= permissions[user.internalRole];
  const hasPermission = hasRolePermission || isCurrentUserEditingItSelf;

  return hasPermission ? children : null
}
