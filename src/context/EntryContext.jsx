import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import INITIAL_MOCK_USERS from './mockData';

export const getDaysRemaining = (expiryDateStr) => {
  if (!expiryDateStr) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDateStr);
  expiry.setHours(0, 0, 0, 0);
  const diffTime = expiry - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getValidityStatus = (vehicle) => {
  if (!vehicle) return 'Not Registered';
  if (vehicle.status === 'Suspended') return 'Suspended';
  if (vehicle.status === 'Blacklisted') return 'Blacklisted';
  if (vehicle.status === 'Disabled') return 'Disabled';
  const days = getDaysRemaining(vehicle.expiryDate);
  if (days <= 0) return 'Expired';
  return 'Active';
};

export const formatDateDisplay = (dateStr) => {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
};

const EntryContext = createContext(null);

export const EntryProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('smart_campus_role') || 'guard'; // 'guard' or 'admin'
  });

  const [vehicles, setVehicles] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_campus_vehicles');
      return saved ? JSON.parse(saved) : { ...INITIAL_MOCK_USERS };
    } catch {
      return { ...INITIAL_MOCK_USERS };
    }
  });

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_campus_history');
      return saved ? JSON.parse(saved) : [
        {
          id: 'LOG-101',
          date: new Date().toLocaleDateString(),
          time: '09:12 AM',
          vehicleNumber: 'TN 38 AB 1234',
          ownerName: 'Balaji S',
          registerId: '23BCS045',
          department: 'Computer Science & Engineering',
          vehicleType: 'Bike (Two-Wheeler)',
          gate: 'Main Entrance Gate',
          status: 'Granted',
          reason: '',
        },
        {
          id: 'LOG-102',
          date: new Date().toLocaleDateString(),
          time: '08:30 AM',
          vehicleNumber: 'TN 38 XY 9999',
          ownerName: 'Dr. Ramesh Kumar',
          registerId: 'EMP9023',
          department: 'Mechanical Engineering',
          vehicleType: 'Car (Four-Wheeler)',
          gate: 'Main Entrance Gate',
          status: 'Granted',
          reason: '',
        },
        {
          id: 'LOG-103',
          date: new Date().toLocaleDateString(),
          time: '08:15 AM',
          vehicleNumber: 'TN 38 ZZZ 999',
          ownerName: 'Rohan Malhotra',
          registerId: 'VIS8902',
          department: 'Outsourcing Partner',
          vehicleType: 'Bike (Two-Wheeler)',
          gate: 'Main Entrance Gate',
          status: 'Denied',
          reason: 'Blacklisted Vehicle',
        },
        {
          id: 'LOG-104',
          date: new Date().toLocaleDateString(),
          time: '07:45 AM',
          vehicleNumber: 'TN 38 EXP 2025',
          ownerName: 'Vikram T',
          registerId: '21BME102',
          department: 'Mechanical Engineering',
          vehicleType: 'Bike (Two-Wheeler)',
          gate: 'South Gate',
          status: 'Denied',
          reason: 'Sticker Expired',
        }
      ];
    } catch {
      return [];
    }
  });

  const [notifications, setNotifications] = useState([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('smart_campus_role', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('smart_campus_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('smart_campus_history', JSON.stringify(history));
  }, [history]);

  const addNotification = useCallback((message, type = 'info') => {
    setNotifications((prev) => [{ id: Date.now(), message, type, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 10));
  }, []);

  const login = useCallback((role) => {
    setUserRole(role);
    addNotification(`Logged in as ${role === 'admin' ? 'System Administrator' : 'Security Staff'}`, 'success');
  }, [addNotification]);

  const logout = useCallback(() => {
    setUserRole('guard');
    addNotification('Logged out successfully', 'info');
  }, [addNotification]);

  // Core Access Verification Method
  const verifyQrCode = useCallback((scannedQuery, gateName = 'Main Entrance Gate') => {
    return new Promise((resolve) => {
      const rawInput = (scannedQuery || '').trim();
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const nowDate = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

      if (!rawInput) {
        const deniedPayload = {
          status: 'DENIED',
          resultType: 'REJECTED',
          reason: 'QR Code Not Registered',
          vehicleNumber: 'UNKNOWN',
          ownerName: 'Unknown Visitor',
          registerId: 'N/A',
          department: 'N/A',
          vehicleType: 'N/A',
          stickerStatus: 'INVALID',
          expiryDate: 'N/A',
          gateEntryTime: nowTime,
          gate: gateName,
        };

        // Record log
        setHistory((prev) => [{
          id: `LOG-${Date.now()}`,
          date: nowDate,
          time: nowTime,
          vehicleNumber: 'UNKNOWN',
          ownerName: 'Unknown Visitor',
          registerId: 'N/A',
          department: 'N/A',
          vehicleType: 'N/A',
          gate: gateName,
          status: 'Denied',
          reason: 'QR Code Not Registered',
        }, ...prev]);

        resolve(deniedPayload);
        return;
      }

      // Search vehicle by QR Code, Vehicle Number, Register ID, or ID
      const targetKey = Object.keys(vehicles).find((key) => {
        const v = vehicles[key];
        const q = rawInput.toLowerCase().replace(/[\s\-]+/g, '');
        return (
          (v.qrCode && v.qrCode.toLowerCase().replace(/[\s\-]+/g, '') === q) ||
          (v.vehicleNumber && v.vehicleNumber.toLowerCase().replace(/[\s\-]+/g, '') === q) ||
          (v.registerId && v.registerId.toLowerCase().replace(/[\s\-]+/g, '') === q) ||
          (v.id && v.id.toLowerCase().replace(/[\s\-]+/g, '') === q)
        );
      });

      const matchedVehicle = targetKey ? vehicles[targetKey] : null;

      if (!matchedVehicle) {
        const deniedResult = {
          status: 'DENIED',
          resultType: 'REJECTED',
          reason: 'QR Code Not Registered',
          vehicleNumber: rawInput.toUpperCase(),
          ownerName: 'Unregistered Vehicle',
          registerId: 'N/A',
          department: 'N/A',
          vehicleType: 'Unknown',
          stickerStatus: 'NOT REGISTERED',
          expiryDate: 'N/A',
          gateEntryTime: nowTime,
          gate: gateName,
          vehicle: null
        };

        setHistory((prev) => [{
          id: `LOG-${Date.now()}`,
          date: nowDate,
          time: nowTime,
          vehicleNumber: rawInput.toUpperCase(),
          ownerName: 'Unregistered Vehicle',
          registerId: 'N/A',
          department: 'N/A',
          vehicleType: 'Unknown',
          gate: gateName,
          status: 'Denied',
          reason: 'QR Code Not Registered',
        }, ...prev]);

        addNotification(`🔴 Access Denied: Unregistered QR Code (${rawInput})`, 'error');
        resolve(deniedResult);
        return;
      }

      // Check sticker status & expiry
      const computed = getValidityStatus(matchedVehicle);

      if (computed === 'Active') {
        const grantedResult = {
          status: 'GRANTED',
          resultType: 'APPROVED',
          reason: '',
          vehicleNumber: matchedVehicle.vehicleNumber || matchedVehicle.id,
          ownerName: matchedVehicle.name,
          registerId: matchedVehicle.registerId,
          department: matchedVehicle.department,
          vehicleType: matchedVehicle.vehicleType || 'Two-Wheeler',
          stickerStatus: 'VALID',
          expiryDate: formatDateDisplay(matchedVehicle.expiryDate),
          gateEntryTime: nowTime,
          gate: gateName,
          vehicle: matchedVehicle
        };

        setHistory((prev) => [{
          id: `LOG-${Date.now()}`,
          date: nowDate,
          time: nowTime,
          vehicleNumber: matchedVehicle.vehicleNumber || matchedVehicle.id,
          ownerName: matchedVehicle.name,
          registerId: matchedVehicle.registerId,
          department: matchedVehicle.department,
          vehicleType: matchedVehicle.vehicleType || 'Vehicle',
          gate: gateName,
          status: 'Granted',
          reason: '',
        }, ...prev]);

        addNotification(`🟢 Access Granted: ${matchedVehicle.name} (${matchedVehicle.vehicleNumber})`, 'success');
        resolve(grantedResult);
      } else {
        // Denied case
        let denialReason = 'Sticker Expired';
        if (computed === 'Blacklisted') denialReason = 'Blacklisted Vehicle';
        else if (computed === 'Suspended' || computed === 'Disabled') denialReason = 'Sticker Disabled';

        const deniedResult = {
          status: 'DENIED',
          resultType: 'REJECTED',
          reason: denialReason,
          vehicleNumber: matchedVehicle.vehicleNumber || matchedVehicle.id,
          ownerName: matchedVehicle.name,
          registerId: matchedVehicle.registerId,
          department: matchedVehicle.department,
          vehicleType: matchedVehicle.vehicleType || 'Vehicle',
          stickerStatus: computed.toUpperCase(),
          expiryDate: formatDateDisplay(matchedVehicle.expiryDate),
          gateEntryTime: nowTime,
          gate: gateName,
          vehicle: matchedVehicle
        };

        setHistory((prev) => [{
          id: `LOG-${Date.now()}`,
          date: nowDate,
          time: nowTime,
          vehicleNumber: matchedVehicle.vehicleNumber || matchedVehicle.id,
          ownerName: matchedVehicle.name,
          registerId: matchedVehicle.registerId,
          department: matchedVehicle.department,
          vehicleType: matchedVehicle.vehicleType || 'Vehicle',
          gate: gateName,
          status: 'Denied',
          reason: denialReason,
        }, ...prev]);

        addNotification(`🔴 Access Denied: ${matchedVehicle.vehicleNumber} — ${denialReason}`, 'error');
        resolve(deniedResult);
      }
    });
  }, [vehicles, addNotification]);

  // CRUD Operations for Admin Vehicle Management
  const addVehicle = useCallback((newVehicle) => {
    const formattedId = newVehicle.vehicleNumber ? newVehicle.vehicleNumber.replace(/\s+/g, '-').toUpperCase() : `VEH-${Date.now()}`;
    const vehicleRecord = {
      id: formattedId,
      qrCode: formattedId,
      status: 'Active',
      issueDate: new Date().toISOString().split('T')[0],
      createdAt: Date.now(),
      photo: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80',
      ...newVehicle
    };

    setVehicles((prev) => {
      const updated = { [formattedId]: vehicleRecord, ...prev };
      localStorage.setItem('smart_campus_vehicles', JSON.stringify(updated));
      return updated;
    });

    addNotification(`Vehicle ${vehicleRecord.vehicleNumber} registered successfully!`, 'success');
  }, [addNotification]);

  const updateVehicle = useCallback((id, updatedData) => {
    setVehicles((prev) => {
      if (!prev[id]) return prev;
      const updated = { ...prev, [id]: { ...prev[id], ...updatedData } };
      localStorage.setItem('smart_campus_vehicles', JSON.stringify(updated));
      return updated;
    });
    addNotification(`Vehicle details updated!`, 'info');
  }, [addNotification]);

  const deleteVehicle = useCallback((id) => {
    setVehicles((prev) => {
      const copy = { ...prev };
      const vNum = copy[id]?.vehicleNumber || id;
      delete copy[id];
      localStorage.setItem('smart_campus_vehicles', JSON.stringify(copy));
      return copy;
    });
    addNotification(`Vehicle removed from system`, 'warning');
  }, [addNotification]);

  const renewSticker = useCallback((id, years = 1) => {
    setVehicles((prev) => {
      if (!prev[id]) return prev;
      const item = prev[id];
      const curExpiry = new Date(item.expiryDate);
      const base = isNaN(curExpiry.getTime()) || curExpiry < new Date() ? new Date() : curExpiry;
      base.setFullYear(base.getFullYear() + years);
      const newExp = base.toISOString().split('T')[0];

      const updated = {
        ...prev,
        [id]: {
          ...item,
          expiryDate: newExp,
          status: 'Active'
        }
      };
      localStorage.setItem('smart_campus_vehicles', JSON.stringify(updated));
      return updated;
    });
    addNotification(`Sticker renewed for 1 Year!`, 'success');
  }, [addNotification]);

  const disableSticker = useCallback((id, newStatus = 'Blacklisted') => {
    setVehicles((prev) => {
      if (!prev[id]) return prev;
      const updated = {
        ...prev,
        [id]: { ...prev[id], status: newStatus }
      };
      localStorage.setItem('smart_campus_vehicles', JSON.stringify(updated));
      return updated;
    });
    addNotification(`Sticker status set to ${newStatus}`, 'error');
  }, [addNotification]);

  const resetAllData = useCallback(() => {
    localStorage.removeItem('smart_campus_vehicles');
    localStorage.removeItem('smart_campus_history');
    setVehicles({ ...INITIAL_MOCK_USERS });
    setHistory([]);
    addNotification('Database reset to defaults', 'info');
  }, [addNotification]);

  return (
    <EntryContext.Provider value={{
      userRole,
      login,
      logout,
      vehicles,
      history,
      notifications,
      verifyQrCode,
      addVehicle,
      updateVehicle,
      deleteVehicle,
      renewSticker,
      disableSticker,
      resetAllData,
      addNotification
    }}>
      {children}
    </EntryContext.Provider>
  );
};

export const useEntry = () => {
  const ctx = useContext(EntryContext);
  if (!ctx) {
    return {
      userRole: 'guard',
      login: () => {},
      logout: () => {},
      vehicles: {},
      history: [],
      notifications: [],
      verifyQrCode: () => Promise.resolve({ status: 'DENIED', reason: 'Error' }),
      addVehicle: () => {},
      updateVehicle: () => {},
      deleteVehicle: () => {},
      renewSticker: () => {},
      disableSticker: () => {},
      resetAllData: () => {},
      addNotification: () => {}
    };
  }
  return ctx;
};
