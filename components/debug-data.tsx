"use client"

import { useUser } from '@auth0/nextjs-auth0/client';

export function DebugData({ appointmentsRaw, labReportsRaw }: { appointmentsRaw: any, labReportsRaw: any }) {
  const { user } = useUser();

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
      <h4 className="font-semibold text-yellow-800 mb-2">Debug Info (Dev Mode)</h4>
      <div className="text-xs text-yellow-700 space-y-1">
        <p><strong>User Auth0 ID:</strong> {user?.sub || 'Not available'}</p>
        <p><strong>User Email:</strong> {user?.email || 'Not available'}</p>
        <p><strong>Appointments Data:</strong> {appointmentsRaw ? `${appointmentsRaw.length} items` : 'Loading...'}</p>
        <p><strong>Lab Reports Data:</strong> {labReportsRaw ? `${labReportsRaw.length} items` : 'Loading...'}</p>
        {appointmentsRaw && appointmentsRaw.length > 0 && (
          <p><strong>First Appointment:</strong> {JSON.stringify(appointmentsRaw[0], null, 2).slice(0, 100)}...</p>
        )}
      </div>
    </div>
  );
}