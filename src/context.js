import React from 'react';
import { getSessionCookie, setSessionCookie } from './sessions';

export const SessionContext = React.createContext(getSessionCookie());

export default SessionContext;