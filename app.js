/**
 * DoseGuard - Smart Medication Adherence & Care Team Portal
 * Core Application Logic, State Management & Interactive Simulation Engine
 */

// ==========================================================================
// 1. Initial State & Synthetic Demonstration Data
// ==========================================================================

const INITIAL_STATE = {
  kpis: {
    totalPatients: 125,
    activePatients: 118,
    avgAdherence: 87.5,
    missedDosesToday: 12,
    activeEscalations: 4,
    connectedDispensers: 96
  },
  
  patients: [
    {
      id: "DG001",
      name: "Arjun Kumar",
      age: 62,
      gender: "Male",
      condition: "Type 2 Diabetes & Hyperlipidemia",
      caregiver: "Ananya Kumar (Daughter)",
      caregiverPhone: "+1 (555) 234-8901",
      clinician: "Dr. Sarah Jenkins, MD",
      clinicianPhone: "+1 (555) 432-1098",
      adherence: 95,
      status: "On Track",
      dispenserId: "DG-DISP-101",
      lastActivity: "Today, 08:02 AM - Metformin 500mg taken",
      history: [
        { date: "Oct 30", scheduled: 3, taken: 3, missed: 0, adherence: 100 },
        { date: "Oct 29", scheduled: 3, taken: 3, missed: 0, adherence: 100 },
        { date: "Oct 28", scheduled: 3, taken: 2, missed: 1, adherence: 66 },
        { date: "Oct 27", scheduled: 3, taken: 3, missed: 0, adherence: 100 },
        { date: "Oct 26", scheduled: 3, taken: 3, missed: 0, adherence: 100 },
        { date: "Oct 25", scheduled: 3, taken: 3, missed: 0, adherence: 100 },
        { date: "Oct 24", scheduled: 3, taken: 3, missed: 0, adherence: 100 }
      ],
      medications: [
        { name: "Metformin 500mg", schedule: "08:00 AM", status: "Taken", compartment: "Tray A-1", confirmedAt: "08:02 AM" },
        { name: "Glipizide 5mg", schedule: "12:30 PM", status: "Upcoming", compartment: "Tray A-2", confirmedAt: "-" },
        { name: "Atorvastatin 20mg", schedule: "08:00 PM", status: "Upcoming", compartment: "Tray A-3", confirmedAt: "-" }
      ]
    },
    {
      id: "DG002",
      name: "Meera Sharma",
      age: 71,
      gender: "Female",
      condition: "Essential Hypertension & Stage 2 CKD",
      caregiver: "Ramesh Sharma (Spouse)",
      caregiverPhone: "+1 (555) 345-6789",
      clinician: "Dr. Robert Vance, MD",
      clinicianPhone: "+1 (555) 543-2109",
      adherence: 72,
      status: "Attention Required",
      dispenserId: "DG-DISP-102",
      lastActivity: "Today, 09:15 AM - Lisinopril 10mg missed",
      history: [
        { date: "Oct 30", scheduled: 2, taken: 1, missed: 1, adherence: 50 },
        { date: "Oct 29", scheduled: 2, taken: 2, missed: 0, adherence: 100 },
        { date: "Oct 28", scheduled: 2, taken: 1, missed: 1, adherence: 50 },
        { date: "Oct 27", scheduled: 2, taken: 2, missed: 0, adherence: 100 },
        { date: "Oct 26", scheduled: 2, taken: 1, missed: 1, adherence: 50 },
        { date: "Oct 25", scheduled: 2, taken: 2, missed: 0, adherence: 100 },
        { date: "Oct 24", scheduled: 2, taken: 2, missed: 0, adherence: 100 }
      ],
      medications: [
        { name: "Lisinopril 10mg", schedule: "09:00 AM", status: "Missed", compartment: "Tray B-1", confirmedAt: "-" },
        { name: "Amlodipine 5mg", schedule: "07:30 PM", status: "Upcoming", compartment: "Tray B-2", confirmedAt: "-" }
      ]
    },
    {
      id: "DG003",
      name: "Rahul Verma",
      age: 58,
      gender: "Male",
      condition: "Post-Myocardial Infarction",
      caregiver: "Pooja Verma (Wife)",
      caregiverPhone: "+1 (555) 678-1234",
      clinician: "Dr. Sarah Jenkins, MD",
      clinicianPhone: "+1 (555) 432-1098",
      adherence: 88,
      status: "On Track",
      dispenserId: "DG-DISP-103",
      lastActivity: "Today, 08:30 AM - Atorvastatin 40mg taken",
      history: [
        { date: "Oct 30", scheduled: 3, taken: 3, missed: 0, adherence: 100 },
        { date: "Oct 29", scheduled: 3, taken: 2, missed: 1, adherence: 66 },
        { date: "Oct 28", scheduled: 3, taken: 3, missed: 0, adherence: 100 },
        { date: "Oct 27", scheduled: 3, taken: 3, missed: 0, adherence: 100 },
        { date: "Oct 26", scheduled: 3, taken: 3, missed: 0, adherence: 100 },
        { date: "Oct 25", scheduled: 3, taken: 2, missed: 1, adherence: 66 },
        { date: "Oct 24", scheduled: 3, taken: 3, missed: 0, adherence: 100 }
      ],
      medications: [
        { name: "Atorvastatin 40mg", schedule: "08:00 AM", status: "Taken", compartment: "Tray C-1", confirmedAt: "08:30 AM" },
        { name: "Clopidogrel 75mg", schedule: "01:00 PM", status: "Upcoming", compartment: "Tray C-2", confirmedAt: "-" },
        { name: "Metoprolol Succinate 50mg", schedule: "08:00 PM", status: "Upcoming", compartment: "Tray C-3", confirmedAt: "-" }
      ]
    },
    {
      id: "DG004",
      name: "Priya Nair",
      age: 68,
      gender: "Female",
      condition: "Chronic Heart Failure & Asthma",
      caregiver: "Vivek Nair (Son)",
      caregiverPhone: "+1 (555) 890-4321",
      clinician: "Dr. Emily Carter, MD",
      clinicianPhone: "+1 (555) 765-4321",
      adherence: 54,
      status: "Critical",
      dispenserId: "DG-DISP-104",
      lastActivity: "Today, 07:45 AM - Spironolactone 25mg missed",
      history: [
        { date: "Oct 30", scheduled: 4, taken: 1, missed: 3, adherence: 25 },
        { date: "Oct 29", scheduled: 4, taken: 2, missed: 2, adherence: 50 },
        { date: "Oct 28", scheduled: 4, taken: 2, missed: 2, adherence: 50 },
        { date: "Oct 27", scheduled: 4, taken: 3, missed: 1, adherence: 75 },
        { date: "Oct 26", scheduled: 4, taken: 1, missed: 3, adherence: 25 },
        { date: "Oct 25", scheduled: 4, taken: 3, missed: 1, adherence: 75 },
        { date: "Oct 24", scheduled: 4, taken: 2, missed: 2, adherence: 50 }
      ],
      medications: [
        { name: "Spironolactone 25mg", schedule: "07:30 AM", status: "Missed", compartment: "Tray D-1", confirmedAt: "-" },
        { name: "Carvedilol 6.25mg", schedule: "11:00 AM", status: "Pending", compartment: "Tray D-2", confirmedAt: "-" },
        { name: "Furosemide 40mg", schedule: "04:00 PM", status: "Upcoming", compartment: "Tray D-3", confirmedAt: "-" },
        { name: "Montelukast 10mg", schedule: "09:00 PM", status: "Upcoming", compartment: "Tray D-4", confirmedAt: "-" }
      ]
    },
    {
      id: "DG005",
      name: "Kavin Raj",
      age: 45,
      gender: "Male",
      condition: "Familial Dyslipidemia & Mild GERD",
      caregiver: "Divya Raj (Sister)",
      caregiverPhone: "+1 (555) 901-2345",
      clinician: "Dr. Robert Vance, MD",
      clinicianPhone: "+1 (555) 543-2109",
      adherence: 100,
      status: "On Track",
      dispenserId: "DG-DISP-105",
      lastActivity: "Today, 08:00 AM - Rosuvastatin 10mg taken",
      history: [
        { date: "Oct 30", scheduled: 2, taken: 2, missed: 0, adherence: 100 },
        { date: "Oct 29", scheduled: 2, taken: 2, missed: 0, adherence: 100 },
        { date: "Oct 28", scheduled: 2, taken: 2, missed: 0, adherence: 100 },
        { date: "Oct 27", scheduled: 2, taken: 2, missed: 0, adherence: 100 },
        { date: "Oct 26", scheduled: 2, taken: 2, missed: 0, adherence: 100 },
        { date: "Oct 25", scheduled: 2, taken: 2, missed: 0, adherence: 100 },
        { date: "Oct 24", scheduled: 2, taken: 2, missed: 0, adherence: 100 }
      ],
      medications: [
        { name: "Rosuvastatin 10mg", schedule: "08:00 AM", status: "Taken", compartment: "Tray E-1", confirmedAt: "08:00 AM" },
        { name: "Omeprazole 20mg", schedule: "07:30 PM", status: "Upcoming", compartment: "Tray E-2", confirmedAt: "-" }
      ]
    },
    {
      id: "DG006",
      name: "Sunita Rao",
      age: 64,
      gender: "Female",
      condition: "Rheumatoid Arthritis",
      caregiver: "Rohan Rao (Son)",
      caregiverPhone: "+1 (555) 123-9876",
      clinician: "Dr. Sarah Jenkins, MD",
      clinicianPhone: "+1 (555) 432-1098",
      adherence: 91,
      status: "On Track",
      dispenserId: "DG-DISP-106",
      lastActivity: "Today, 08:15 AM - Methotrexate 15mg taken",
      history: [
        { date: "Oct 30", scheduled: 2, taken: 2, missed: 0, adherence: 100 },
        { date: "Oct 29", scheduled: 2, taken: 2, missed: 0, adherence: 100 },
        { date: "Oct 28", scheduled: 2, taken: 2, missed: 0, adherence: 100 },
        { date: "Oct 27", scheduled: 2, taken: 1, missed: 1, adherence: 50 },
        { date: "Oct 26", scheduled: 2, taken: 2, missed: 0, adherence: 100 },
        { date: "Oct 25", scheduled: 2, taken: 2, missed: 0, adherence: 100 },
        { date: "Oct 24", scheduled: 2, taken: 2, missed: 0, adherence: 100 }
      ],
      medications: [
        { name: "Methotrexate 15mg", schedule: "08:00 AM", status: "Taken", compartment: "Tray F-1", confirmedAt: "08:15 AM" },
        { name: "Folic Acid 1mg", schedule: "08:00 PM", status: "Upcoming", compartment: "Tray F-2", confirmedAt: "-" }
      ]
    },
    {
      id: "DG007",
      name: "David Chen",
      age: 75,
      gender: "Male",
      condition: "Parkinson's Disease & Resting Tremors",
      caregiver: "Linda Chen (Daughter)",
      caregiverPhone: "+1 (555) 456-7890",
      clinician: "Dr. Emily Carter, MD",
      clinicianPhone: "+1 (555) 765-4321",
      adherence: 68,
      status: "Attention Required",
      dispenserId: "DG-DISP-107",
      lastActivity: "Yesterday, 08:00 PM - Levodopa 100mg missed",
      history: [
        { date: "Oct 30", scheduled: 3, taken: 2, missed: 1, adherence: 66 },
        { date: "Oct 29", scheduled: 3, taken: 2, missed: 1, adherence: 66 },
        { date: "Oct 28", scheduled: 3, taken: 3, missed: 0, adherence: 100 },
        { date: "Oct 27", scheduled: 3, taken: 1, missed: 2, adherence: 33 },
        { date: "Oct 26", scheduled: 3, taken: 2, missed: 1, adherence: 66 },
        { date: "Oct 25", scheduled: 3, taken: 3, missed: 0, adherence: 100 },
        { date: "Oct 24", scheduled: 3, taken: 2, missed: 1, adherence: 66 }
      ],
      medications: [
        { name: "Levodopa/Carbidopa 100/25", schedule: "07:00 AM", status: "Taken", compartment: "Tray G-1", confirmedAt: "07:05 AM" },
        { name: "Levodopa/Carbidopa 100/25", schedule: "01:00 PM", status: "Upcoming", compartment: "Tray G-2", confirmedAt: "-" },
        { name: "Levodopa/Carbidopa 100/25", schedule: "07:00 PM", status: "Upcoming", compartment: "Tray G-3", confirmedAt: "-" }
      ]
    }
  ],

  dispensers: [
    {
      id: "DG-DISP-101",
      patientId: "DG001",
      patientName: "Arjun Kumar",
      status: "Online",
      battery: 94,
      signal: "98% (4G LTE)",
      compartment: "Locked",
      doseReleased: "Released",
      tamper: "Normal",
      lastSync: "2 mins ago",
      hardwareRevision: "v2.4-SecureRing"
    },
    {
      id: "DG-DISP-102",
      patientId: "DG002",
      patientName: "Meera Sharma",
      status: "Online",
      battery: 82,
      signal: "90% (WiFi)",
      compartment: "Locked",
      doseReleased: "Not Released",
      tamper: "Normal",
      lastSync: "14 mins ago",
      hardwareRevision: "v2.4-SecureRing"
    },
    {
      id: "DG-DISP-103",
      patientId: "DG003",
      patientName: "Rahul Verma",
      status: "Online",
      battery: 88,
      signal: "95% (4G LTE)",
      compartment: "Locked",
      doseReleased: "Released",
      tamper: "Normal",
      lastSync: "5 mins ago",
      hardwareRevision: "v2.5-Cellular"
    },
    {
      id: "DG-DISP-104",
      patientId: "DG004",
      patientName: "Priya Nair",
      status: "Online",
      battery: 61,
      signal: "85% (WiFi)",
      compartment: "Accessed",
      doseReleased: "Not Released",
      tamper: "Tamper Alert",
      lastSync: "1 min ago",
      hardwareRevision: "v2.4-SecureRing"
    },
    {
      id: "DG-DISP-105",
      patientId: "DG005",
      patientName: "Kavin Raj",
      status: "Online",
      battery: 98,
      signal: "100% (WiFi)",
      compartment: "Locked",
      doseReleased: "Released",
      tamper: "Normal",
      lastSync: "3 mins ago",
      hardwareRevision: "v2.5-Cellular"
    },
    {
      id: "DG-DISP-106",
      patientId: "DG006",
      patientName: "Sunita Rao",
      status: "Online",
      battery: 89,
      signal: "92% (WiFi)",
      compartment: "Locked",
      doseReleased: "Released",
      tamper: "Normal",
      lastSync: "7 mins ago",
      hardwareRevision: "v2.4-SecureRing"
    },
    {
      id: "DG-DISP-107",
      patientId: "DG007",
      patientName: "David Chen",
      status: "Offline",
      battery: 14,
      signal: "0% (Disconnected)",
      compartment: "Locked",
      doseReleased: "Not Released",
      tamper: "Normal",
      lastSync: "3.5 hrs ago",
      hardwareRevision: "v2.3-Legacy"
    }
  ],

  escalations: [
    {
      id: "ESC-8841",
      patientId: "DG004",
      patientName: "Priya Nair",
      medication: "Spironolactone 25mg",
      scheduledTime: "07:30 AM",
      alertTimestamp: "08:00 AM",
      level: 1, // 1: Caregiver, 2: Clinician
      levelName: "Level 1 - Caregiver Notification",
      severity: "Critical",
      status: "Active", // Active, Acknowledged, Resolved
      responder: "Vivek Nair (Caregiver)",
      notes: "Auto-notification dispatched via SMS and DoseGuard mobile push. Escalation timer running.",
      secondsRemaining: 480, // for demo display
      timerActive: false
    },
    {
      id: "ESC-8839",
      patientId: "DG002",
      patientName: "Meera Sharma",
      medication: "Lisinopril 10mg",
      scheduledTime: "09:00 AM",
      alertTimestamp: "09:20 AM",
      level: 1,
      levelName: "Level 1 - Caregiver Notification",
      severity: "High",
      status: "Acknowledged",
      responder: "Ramesh Sharma (Caregiver)",
      notes: "Caregiver acknowledged at 09:24 AM. Contacting patient at home.",
      secondsRemaining: 0,
      timerActive: false
    },
    {
      id: "ESC-8820",
      patientId: "DG004",
      patientName: "Priya Nair",
      medication: "Furosemide 40mg",
      scheduledTime: "Yesterday 04:00 PM",
      alertTimestamp: "Yesterday 04:45 PM",
      level: 2,
      levelName: "Level 2 - Clinician Escalation",
      severity: "Critical",
      status: "Active",
      responder: "Dr. Emily Carter, MD (Clinician)",
      notes: "Unresolved by caregiver after 30 min escalation window. High risk diuretic adherence incident.",
      secondsRemaining: 0,
      timerActive: false
    },
    {
      id: "ESC-8812",
      patientId: "DG007",
      patientName: "David Chen",
      medication: "Levodopa/Carbidopa 100/25",
      scheduledTime: "Yesterday 08:00 PM",
      alertTimestamp: "Yesterday 08:35 PM",
      level: 2,
      levelName: "Level 2 - Clinician Escalation",
      severity: "High",
      status: "Active",
      responder: "Dr. Emily Carter, MD (Clinician)",
      notes: "Dispenser offline + evening dose missed. Telehealth follow-up requested.",
      secondsRemaining: 0,
      timerActive: false
    }
  ],

  deviceEventLogs: [
    {
      id: "EVT-9042",
      dispenserId: "DG-DISP-104",
      patientId: "DG004",
      type: "Tamper Sensor Tripped",
      timestamp: "10/31/2026, 07:48:12 AM",
      prevHash: "0x4a18e...291f",
      hash: "0x89d31...b7a2",
      status: "Tamper Alert"
    },
    {
      id: "EVT-9041",
      dispenserId: "DG-DISP-101",
      patientId: "DG001",
      type: "Compartment Solenoid Released",
      timestamp: "10/31/2026, 08:02:04 AM",
      prevHash: "0x3e89a...110b",
      hash: "0x4a18e...291f",
      status: "Success"
    },
    {
      id: "EVT-9040",
      dispenserId: "DG-DISP-103",
      patientId: "DG003",
      type: "Dose Confirmation Sensor Verified",
      timestamp: "10/31/2026, 08:30:19 AM",
      prevHash: "0x99bc2...44d1",
      hash: "0x3e89a...110b",
      status: "Success"
    },
    {
      id: "EVT-9039",
      dispenserId: "DG-DISP-107",
      patientId: "DG007",
      type: "Heartbeat Ping Timeout (>180m)",
      timestamp: "10/30/2026, 10:15:00 PM",
      prevHash: "0x77ae1...884c",
      hash: "0x99bc2...44d1",
      status: "Offline"
    }
  ],

  notifications: [
    {
      id: "NOTIF-1",
      type: "Missed Dose",
      category: "Caregiver",
      priority: "Critical",
      title: "Missed Dose Alert: Priya Nair (DG004)",
      desc: "Spironolactone 25mg scheduled for 07:30 AM was not confirmed. Caregiver Vivek Nair notified.",
      timestamp: "18 mins ago",
      recipient: "Caregiver (Vivek Nair)",
      channel: "Simulated Push & SMS",
      status: "Delivered",
      read: false
    },
    {
      id: "NOTIF-2",
      type: "Clinician Escalation",
      category: "Clinician",
      priority: "Critical",
      title: "Level 2 Escalation Dispatched: Priya Nair (DG004)",
      desc: "Unresolved missed diuretic dose exceeded 30m escalation threshold. Assigned to Dr. Emily Carter.",
      timestamp: "45 mins ago",
      recipient: "Clinician (Dr. Emily Carter)",
      channel: "Simulated Hospital EHR Alert",
      status: "Action Required",
      read: false
    },
    {
      id: "NOTIF-3",
      type: "Tamper Detection",
      category: "Tamper",
      priority: "High",
      title: "Tamper Alert: Dispenser DG-DISP-104",
      desc: "Lid forced or tilted without scheduled dispense event. Security lock engaged.",
      timestamp: "1 hr ago",
      recipient: "Care Team & Support",
      channel: "Telemetry Event",
      status: "Logged",
      read: true
    },
    {
      id: "NOTIF-4",
      type: "Device Offline",
      category: "Device",
      priority: "Medium",
      title: "Dispenser Offline: DG-DISP-107 (David Chen)",
      desc: "Dispenser has not sent heartbeat in 3.5 hours. Battery telemetry indicated 14%.",
      timestamp: "3 hrs ago",
      recipient: "Care Team",
      channel: "In-App Telemetry",
      status: "Warning",
      read: true
    },
    {
      id: "NOTIF-5",
      type: "Caregiver Acknowledged",
      category: "Caregiver",
      priority: "Low",
      title: "Alert Acknowledged: Meera Sharma (DG002)",
      desc: "Caregiver Ramesh Sharma acknowledged missed Lisinopril dose. Administering reminder.",
      timestamp: "4 hrs ago",
      recipient: "Care Team",
      channel: "In-App Notice",
      status: "Resolved",
      read: true
    }
  ]
};

// ==========================================================================
// 2. Reactive Store & State Management
// ==========================================================================

class DoseGuardStore {
  constructor() {
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
    this.listeners = [];
    this.activeSimulation = null;
    this.countdownInterval = null;
    this.demoSpeed = 15; // 15 seconds fast-track for hackathon presentation demo
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  reset() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
    this.activeSimulation = null;
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
    this.notify();
  }

  // --- Missed Dose Simulation Engine ---
  startMissedDoseSimulation() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }

    // Pick target patient (DG004 Priya Nair or DG002 Meera Sharma)
    const patient = this.state.patients.find(p => p.id === "DG004") || this.state.patients[0];
    const medName = "Spironolactone 25mg (Morning)";
    const alertTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Update Patient & Medication Record
    patient.status = "Critical";
    patient.adherence = Math.max(45, patient.adherence - 4);
    patient.lastActivity = `Just now - ${medName} MISSED`;
    if (patient.medications && patient.medications[0]) {
      patient.medications[0].status = "Missed";
    }

    // 2. Increment Counters
    this.state.kpis.missedDosesToday += 1;
    this.state.kpis.activeEscalations += 1;

    // 3. Create Escalation Incident
    const newEscId = "ESC-" + Math.floor(1000 + Math.random() * 9000);
    const newEscalation = {
      id: newEscId,
      patientId: patient.id,
      patientName: patient.name,
      medication: medName,
      scheduledTime: "08:00 AM",
      alertTimestamp: alertTime,
      level: 1, // Starts at Level 1 Caregiver
      levelName: "Level 1 - Caregiver Notification",
      severity: "Critical",
      status: "Active",
      responder: `${patient.caregiver}`,
      notes: `Automated missed-dose detected. Caregiver notified via simulated SMS. Automatic Clinician Escalation window running.`,
      secondsRemaining: this.demoSpeed,
      timerActive: true
    };

    this.state.escalations.unshift(newEscalation);

    // 4. Create Notification
    this.state.notifications.unshift({
      id: "NOTIF-" + Date.now(),
      type: "Missed Dose",
      category: "Caregiver",
      priority: "Critical",
      title: `🚨 Missed Dose Alert: ${patient.name} (${patient.id})`,
      desc: `${medName} scheduled at 08:00 AM not confirmed by dispenser. Automated caregiver escalation initiated.`,
      timestamp: "Just now",
      recipient: `Caregiver (${patient.caregiver})`,
      channel: "Simulated Push & SMS",
      status: "Dispatched",
      read: false
    });

    // 5. Track Active Simulation
    this.activeSimulation = {
      escalationId: newEscId,
      patientId: patient.id,
      patientName: patient.name,
      medication: medName,
      level: 1,
      secondsRemaining: this.demoSpeed,
      totalSeconds: this.demoSpeed,
      acknowledged: false,
      resolved: false
    };

    // Play alert sound
    AudioAlertSystem.playAlertBeep('caregiver');

    // Show initial toast
    ToastSystem.show(
      `🚨 Missed-Dose Event: ${patient.name}`,
      `${medName} missed! Level 1 Caregiver notification sent. Auto-escalation timer started (${this.demoSpeed}s).`,
      'danger'
    );

    // 6. Start countdown timer
    this.countdownInterval = setInterval(() => {
      if (!this.activeSimulation || this.activeSimulation.resolved) {
        clearInterval(this.countdownInterval);
        return;
      }

      if (!this.activeSimulation.acknowledged && this.activeSimulation.secondsRemaining > 0) {
        this.activeSimulation.secondsRemaining -= 1;
        
        // Also update matching escalation object in array
        const escObj = this.state.escalations.find(e => e.id === this.activeSimulation.escalationId);
        if (escObj) {
          escObj.secondsRemaining = this.activeSimulation.secondsRemaining;
        }

        // When timer hits 0: AUTO ESCALATE TO CLINICIAN LEVEL 2!
        if (this.activeSimulation.secondsRemaining === 0 && this.activeSimulation.level === 1) {
          this.escalateToClinician();
        }
      }

      this.notify();
    }, 1000);

    this.notify();
  }

  escalateToClinician() {
    if (!this.activeSimulation) return;
    this.activeSimulation.level = 2;

    const escObj = this.state.escalations.find(e => e.id === this.activeSimulation.escalationId);
    if (escObj) {
      escObj.level = 2;
      escObj.levelName = "Level 2 - Clinician Escalation";
      escObj.notes = "Caregiver grace window expired without confirmation. Escalated directly to Clinician Dr. Sarah Jenkins!";
      escObj.responder = "Dr. Sarah Jenkins, MD (Clinician)";
      escObj.timerActive = false;
    }

    // Clinician Notification
    this.state.notifications.unshift({
      id: "NOTIF-" + Date.now(),
      type: "Clinician Escalation",
      category: "Clinician",
      priority: "Critical",
      title: `🚨 LEVEL 2 CLINICIAN DISPATCH: ${this.activeSimulation.patientName}`,
      desc: `Missed dose remained unconfirmed after escalation period. High-priority dispatch sent to Dr. Sarah Jenkins.`,
      timestamp: "Just now",
      recipient: "Dr. Sarah Jenkins (Clinician)",
      channel: "Simulated Clinical Pager",
      status: "Action Required",
      read: false
    });

    AudioAlertSystem.playAlertBeep('clinician');
    ToastSystem.show(
      `🚨 LEVEL 2 ESCALATION DISPATCHED`,
      `Caregiver did not respond. Incident escalated to Dr. Sarah Jenkins, MD!`,
      'danger'
    );

    this.notify();
  }

  acknowledgeActiveAlert(incidentId) {
    const idToAck = incidentId || (this.activeSimulation ? this.activeSimulation.escalationId : null);
    const escObj = this.state.escalations.find(e => e.id === idToAck);
    if (escObj) {
      escObj.status = "Acknowledged";
      escObj.notes += ` [Acknowledged at ${new Date().toLocaleTimeString()} by Care Team]`;
      escObj.timerActive = false;
    }

    if (this.activeSimulation && this.activeSimulation.escalationId === idToAck) {
      this.activeSimulation.acknowledged = true;
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
      }
    }

    ToastSystem.show(
      `Alert Acknowledged`,
      `Incident ${idToAck} marked as Acknowledged. Care team follow-up underway.`,
      'info'
    );
    this.notify();
  }

  resolveIncident(incidentId, reason, clinicalNote) {
    const idToResolve = incidentId || (this.activeSimulation ? this.activeSimulation.escalationId : null);
    const escObj = this.state.escalations.find(e => e.id === idToResolve);
    if (escObj) {
      escObj.status = "Resolved";
      escObj.notes = `RESOLVED: Reason: ${reason}. Note: ${clinicalNote}`;
      escObj.timerActive = false;
      this.state.kpis.activeEscalations = Math.max(0, this.state.kpis.activeEscalations - 1);
    }

    if (this.activeSimulation && this.activeSimulation.escalationId === idToResolve) {
      this.activeSimulation.resolved = true;
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
      }
      this.activeSimulation = null;
    }

    ToastSystem.show(
      `Incident Resolved`,
      `Incident ${idToResolve} successfully closed and logged to medical audit history.`,
      'success'
    );
    this.notify();
  }

  // --- Dispenser Hardware Simulation Controls ---
  simulateDeviceSync(dispenserId) {
    const dev = dispenserId 
      ? this.state.dispensers.find(d => d.id === dispenserId)
      : this.state.dispensers[0];
    
    if (dev) {
      dev.status = "Online";
      dev.lastSync = "Just now";
      dev.signal = "99% (WiFi 6)";

      // Add SHA-256 hash-chained event record
      const prev = this.state.deviceEventLogs[0] ? this.state.deviceEventLogs[0].hash : "0x00000";
      const newHash = "0x" + Math.random().toString(16).substring(2, 7) + "..." + Math.random().toString(16).substring(2, 6);
      this.state.deviceEventLogs.unshift({
        id: "EVT-" + Math.floor(9000 + Math.random() * 900),
        dispenserId: dev.id,
        patientId: dev.patientId,
        type: "Telemetry Sync & Health Ping",
        timestamp: new Date().toLocaleString(),
        prevHash: prev,
        hash: newHash,
        status: "Success"
      });

      ToastSystem.show(
        `Dispenser Synchronized`,
        `${dev.id} (${dev.patientName}) synced successfully. Hash record: ${newHash}`,
        'success'
      );
      this.notify();
    }
  }

  simulateDoseRelease(dispenserId) {
    const dev = dispenserId 
      ? this.state.dispensers.find(d => d.id === dispenserId)
      : this.state.dispensers.find(d => d.doseReleased === "Not Released") || this.state.dispensers[0];
    
    if (dev) {
      dev.doseReleased = "Released";
      dev.compartment = "Accessed";
      dev.lastSync = "Just now";

      const prev = this.state.deviceEventLogs[0] ? this.state.deviceEventLogs[0].hash : "0x00000";
      const newHash = "0x" + Math.random().toString(16).substring(2, 7) + "..." + Math.random().toString(16).substring(2, 6);
      this.state.deviceEventLogs.unshift({
        id: "EVT-" + Math.floor(9000 + Math.random() * 900),
        dispenserId: dev.id,
        patientId: dev.patientId,
        type: "Compartment Dispense Motor Cycle",
        timestamp: new Date().toLocaleString(),
        prevHash: prev,
        hash: newHash,
        status: "Dose Released"
      });

      ToastSystem.show(
        `Dose Released from ${dev.id}`,
        `Compartment motor actuated. Note: Dispenser release does not guarantee oral ingestion.`,
        'info'
      );
      this.notify();
    }
  }

  simulateDeviceOffline(dispenserId) {
    const dev = dispenserId 
      ? this.state.dispensers.find(d => d.id === dispenserId)
      : this.state.dispensers.find(d => d.status === "Online") || this.state.dispensers[0];
    
    if (dev) {
      dev.status = "Offline";
      dev.signal = "0% (Disconnected)";
      dev.lastSync = "Heartbeat lost";

      this.state.kpis.connectedDispensers = Math.max(0, this.state.kpis.connectedDispensers - 1);

      this.state.notifications.unshift({
        id: "NOTIF-" + Date.now(),
        type: "Device Offline",
        category: "Device",
        priority: "Medium",
        title: `Dispenser Offline Alert: ${dev.id}`,
        desc: `Dispenser for ${dev.patientName} (${dev.patientId}) dropped offline unexpectedly.`,
        timestamp: "Just now",
        recipient: "Field Support & Caregiver",
        channel: "In-App Telemetry",
        status: "Warning",
        read: false
      });

      ToastSystem.show(
        `Dispenser Offline: ${dev.id}`,
        `Connection dropped. Notification dispatched to care team.`,
        'warning'
      );
      this.notify();
    }
  }

  simulateTamperAlert(dispenserId) {
    const dev = dispenserId 
      ? this.state.dispensers.find(d => d.id === dispenserId)
      : this.state.dispensers[0];
    
    if (dev) {
      dev.tamper = "Tamper Alert";
      dev.compartment = "Accessed";
      
      const prev = this.state.deviceEventLogs[0] ? this.state.deviceEventLogs[0].hash : "0x00000";
      const newHash = "0x" + Math.random().toString(16).substring(2, 7) + "..." + Math.random().toString(16).substring(2, 6);
      this.state.deviceEventLogs.unshift({
        id: "EVT-" + Math.floor(9000 + Math.random() * 900),
        dispenserId: dev.id,
        patientId: dev.patientId,
        type: "Accelerometer Tilt & Lid Force Sensor Alert",
        timestamp: new Date().toLocaleString(),
        prevHash: prev,
        hash: newHash,
        status: "Tamper Alert"
      });

      this.state.notifications.unshift({
        id: "NOTIF-" + Date.now(),
        type: "Tamper Detection",
        category: "Tamper",
        priority: "Critical",
        title: `🚨 TAMPER ALERT: Dispenser ${dev.id}`,
        desc: `Unauthorized compartment force detected for patient ${dev.patientName}. Security lock engaged.`,
        timestamp: "Just now",
        recipient: "Care Team & Security",
        channel: "Priority SMS & Telemetry",
        status: "Active Alert",
        read: false
      });

      AudioAlertSystem.playAlertBeep('clinician');
      ToastSystem.show(
        `🚨 TAMPER SENSOR TRIPPED: ${dev.id}`,
        `Unauthorized opening detected. Dispenser security lock initiated!`,
        'danger'
      );
      this.notify();
    }
  }
}

// Global Store Instance
const store = new DoseGuardStore();

// ==========================================================================
// 3. Audio Notification System (Web Audio API Synthesizer)
// ==========================================================================

const AudioAlertSystem = {
  ctx: null,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  playAlertBeep(type = 'caregiver') {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      const now = this.ctx.currentTime;
      if (type === 'caregiver') {
        // Soft hospital reminder chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else {
        // Urgent 2-tone clinician alert pager
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(440, now + 0.15);
        osc.frequency.setValueAtTime(880, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);
        osc.start(now);
        osc.stop(now + 0.55);
      }
    } catch (e) {
      console.warn("Web Audio alert suppressed:", e);
    }
  }
};

// ==========================================================================
// 4. Toast Notification System
// ==========================================================================

const ToastSystem = {
  container: null,
  init() {
    this.container = document.getElementById('toastContainer');
  },
  show(title, message, type = 'info') {
    if (!this.container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div style="margin-top: 2px;">
        ${type === 'danger' ? SVG_ICONS.alertTriangle : type === 'success' ? SVG_ICONS.checkCircle : SVG_ICONS.bell}
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button onclick="this.parentElement.remove()" style="background:none;border:none;color:#94a3b8;cursor:pointer;padding:2px;">
        ${SVG_ICONS.x}
      </button>
    `;
    this.container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 6000);
  }
};

// ==========================================================================
// 5. Medical SVG Icon Library (Zero External Icon Dependency)
// ==========================================================================

const SVG_ICONS = {
  shield: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  pill: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>`,
  activity: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  users: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  alertTriangle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  cpu: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M9 2v2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 20v2"/><path d="M15 20v2"/><path d="M2 9h2"/><path d="M2 15h2"/></svg>`,
  chart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  bell: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  checkCircle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  x: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  clock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  lock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  unlock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
  wifi: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
  download: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  refresh: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  eye: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  calendar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`
};

// ==========================================================================
// 6. Navigation & View Routing
// ==========================================================================

const NavigationController = {
  activeView: 'overview',
  init() {
    // Read hash or default
    const hash = window.location.hash.replace('#', '');
    if (hash && ['overview', 'patients', 'medications', 'escalation', 'dispensers', 'reports', 'notifications', 'settings'].includes(hash)) {
      this.activeView = hash;
    }
    this.render();

    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash && newHash !== this.activeView) {
        this.activeView = newHash;
        this.render();
      }
    });
  },

  navigate(viewId) {
    this.activeView = viewId;
    window.location.hash = viewId;
    this.render();
  },

  render() {
    // Update active nav links
    document.querySelectorAll('.nav-item').forEach(el => {
      if (el.getAttribute('data-view') === this.activeView) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Hide all view sections, show active
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.style.display = 'none';
    });
    const targetSection = document.getElementById(`view-${this.activeView}`);
    if (targetSection) {
      targetSection.style.display = 'block';
    }

    // Update breadcrumb
    const breadcrumbMap = {
      overview: "Overview Dashboard",
      patients: "Patient Monitoring",
      medications: "Medication Tracking",
      escalation: "Escalation Center",
      dispensers: "Smart Dispenser Telemetry",
      reports: "Reports & Analytics",
      notifications: "Notifications Hub",
      settings: "System & Escalation Settings"
    };
    const breadcrumbEl = document.getElementById('activePageBreadcrumb');
    if (breadcrumbEl) {
      breadcrumbEl.textContent = breadcrumbMap[this.activeView] || "Dashboard";
    }

    // Trigger page-specific re-renders
    if (this.activeView === 'overview') renderOverviewPage();
    if (this.activeView === 'patients') renderPatientsPage();
    if (this.activeView === 'medications') renderMedicationsPage();
    if (this.activeView === 'escalation') renderEscalationPage();
    if (this.activeView === 'dispensers') renderDispensersPage();
    if (this.activeView === 'reports') renderReportsPage();
    if (this.activeView === 'notifications') renderNotificationsPage();
  }
};

// ==========================================================================
// 7. View Renderers
// ==========================================================================

// --- Emergency Simulation Banner ---
function renderEmergencyBanner() {
  const banner = document.getElementById('emergencyBanner');
  if (!banner) return;

  const sim = store.activeSimulation;
  if (!sim || sim.resolved) {
    banner.classList.add('hidden');
    return;
  }

  banner.classList.remove('hidden');
  const esc = store.state.escalations.find(e => e.id === sim.escalationId);

  let bannerHtml = '';
  if (sim.level === 1 && !sim.acknowledged) {
    banner.style.background = 'linear-gradient(90deg, #991B1B 0%, #DC2626 100%)';
    bannerHtml = `
      <div class="emergency-info">
        <div class="emergency-pulse-icon">
          ${SVG_ICONS.alertTriangle}
        </div>
        <div>
          <div class="emergency-title">LEVEL 1 ALERT: ${sim.patientName} Missed Scheduled Dose</div>
          <div class="emergency-subtitle">Medication: ${sim.medication} • Auto-escalating to Clinician if unacknowledged</div>
        </div>
      </div>
      <div class="emergency-actions">
        <div class="countdown-box">
          ${SVG_ICONS.clock} ESCALATING IN: 00:${sim.secondsRemaining < 10 ? '0' : ''}${sim.secondsRemaining}s
        </div>
        <button class="btn btn-sm btn-secondary" onclick="store.acknowledgeActiveAlert('${sim.escalationId}')">
          Acknowledge Alert
        </button>
        <button class="btn btn-sm btn-simulate" onclick="openResolveModal('${sim.escalationId}')">
          Resolve Incident
        </button>
      </div>
    `;
  } else if (sim.level === 2 && !sim.acknowledged) {
    banner.style.background = 'linear-gradient(90deg, #7F1D1D 0%, #B91C1C 100%)';
    bannerHtml = `
      <div class="emergency-info">
        <div class="emergency-pulse-icon" style="background: rgba(255, 255, 255, 0.35);">
          ${SVG_ICONS.alertTriangle}
        </div>
        <div>
          <div class="emergency-title">🚨 LEVEL 2 CLINICIAN DISPATCHED: ${sim.patientName}</div>
          <div class="emergency-subtitle">Caregiver grace window expired. Assigned Clinician Dr. Sarah Jenkins paged.</div>
        </div>
      </div>
      <div class="emergency-actions">
        <span class="badge badge-danger" style="background: white; color: #991B1B; font-weight: 800; font-size: 0.82rem; padding: 6px 12px;">
          CRITICAL CLINICAL ESCALATION
        </span>
        <button class="btn btn-sm btn-secondary" onclick="store.acknowledgeActiveAlert('${sim.escalationId}')">
          Acknowledge
        </button>
        <button class="btn btn-sm btn-simulate" onclick="openResolveModal('${sim.escalationId}')">
          Resolve Incident
        </button>
      </div>
    `;
  } else {
    // Acknowledged state
    banner.style.background = 'linear-gradient(90deg, #0369A1 0%, #0284C7 100%)';
    bannerHtml = `
      <div class="emergency-info">
        <div class="emergency-pulse-icon" style="background: rgba(255, 255, 255, 0.2);">
          ${SVG_ICONS.checkCircle}
        </div>
        <div>
          <div class="emergency-title">Incident Acknowledged: ${sim.patientName}</div>
          <div class="emergency-subtitle">Care team follow-up recorded. Incident pending final clinical resolution.</div>
        </div>
      </div>
      <div class="emergency-actions">
        <button class="btn btn-sm btn-success" onclick="openResolveModal('${sim.escalationId}')">
          Complete & Resolve Incident
        </button>
      </div>
    `;
  }
  banner.innerHTML = bannerHtml;
}

// --- Overview Page Renderer ---
function renderOverviewPage() {
  const kpis = store.state.kpis;

  // KPI elements
  const elTotal = document.getElementById('kpiTotalPatients');
  const elActive = document.getElementById('kpiActivePatients');
  const elAdherence = document.getElementById('kpiAvgAdherence');
  const elMissed = document.getElementById('kpiMissedDoses');
  const elEscalations = document.getElementById('kpiActiveEscalations');
  const elDispensers = document.getElementById('kpiConnectedDispensers');

  if (elTotal) elTotal.textContent = kpis.totalPatients;
  if (elActive) elActive.textContent = kpis.activePatients;
  if (elAdherence) elAdherence.textContent = kpis.avgAdherence.toFixed(1) + '%';
  if (elMissed) elMissed.textContent = kpis.missedDosesToday;
  if (elEscalations) elEscalations.textContent = kpis.activeEscalations;
  if (elDispensers) elDispensers.textContent = kpis.connectedDispensers;

  // Sidebar badge for active escalations
  const escBadge = document.getElementById('sidebarEscalationsBadge');
  if (escBadge) {
    escBadge.textContent = kpis.activeEscalations;
    if (kpis.activeEscalations > 0) {
      escBadge.parentElement.classList.add('has-alert');
    } else {
      escBadge.parentElement.classList.remove('has-alert');
    }
  }

  // Render SVG Adherence Trend Chart
  renderOverviewAdherenceChart();

  // Render Patient Status Overview Breakdown
  renderPatientStatusBreakdown();

  // Render Recent Alerts Table
  renderOverviewRecentAlerts();

  // Render Dispenser Activity Feed
  renderOverviewDispenserFeed();
}

function renderOverviewAdherenceChart() {
  const container = document.getElementById('overviewChartContainer');
  if (!container) return;

  // 7-day adherence curve data (Mon - Sun)
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const values = [84, 86, 82, 89, 91, 85, store.state.kpis.avgAdherence];

  // SVG dimensions
  const width = 640;
  const height = 220;
  const padLeft = 40;
  const padBottom = 30;
  const padTop = 20;
  const padRight = 20;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  // Map data to coordinates
  const minVal = 60;
  const maxVal = 100;
  const points = values.map((v, i) => {
    const x = padLeft + (i / (values.length - 1)) * chartW;
    const y = padTop + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;
    return { x, y, v, day: days[i] };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${padTop + chartH} L ${points[0].x} ${padTop + chartH} Z`;

  let gridLines = '';
  [70, 80, 90, 100].forEach(val => {
    const y = padTop + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
    gridLines += `
      <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="#E2E8F0" stroke-dasharray="3,3" />
      <text x="${padLeft - 8}" y="${y + 4}" fill="#94A3B8" font-size="10" text-anchor="end" font-family="var(--font-mono)">${val}%</text>
    `;
  });

  let xLabels = '';
  points.forEach(p => {
    xLabels += `
      <text x="${p.x}" y="${height - 8}" fill="#64748B" font-size="11" text-anchor="middle" font-weight="500">${p.day}</text>
      <circle cx="${p.x}" cy="${p.y}" r="4.5" fill="#0284C7" stroke="#FFFFFF" stroke-width="2" />
      <text x="${p.x}" y="${p.y - 9}" fill="#0A2540" font-size="10" text-anchor="middle" font-weight="700">${p.v.toFixed(1)}%</text>
    `;
  });

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" class="svg-chart">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0284C7" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#0284C7" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      ${gridLines}
      <path d="${areaD}" fill="url(#chartGrad)" />
      <path d="${pathD}" fill="none" stroke="#0284C7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      ${xLabels}
    </svg>
  `;
}

function renderPatientStatusBreakdown() {
  const container = document.getElementById('patientStatusBreakdown');
  if (!container) return;

  const patients = store.state.patients;
  const onTrack = patients.filter(p => p.status === 'On Track').length;
  const attention = patients.filter(p => p.status === 'Attention Required').length;
  const critical = patients.filter(p => p.status === 'Critical').length;
  const total = patients.length;

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 6px;">
          <span style="display:flex; align-items:center; gap:6px; font-weight:600; color:#065F46;">
            <span style="width:10px; height:10px; background:#10B981; border-radius:50%;"></span> On Track (≥85%)
          </span>
          <span style="font-weight:700;">${onTrack} patients (${Math.round((onTrack/total)*100)}%)</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill success" style="width: ${(onTrack/total)*100}%;"></div>
        </div>
      </div>

      <div>
        <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 6px;">
          <span style="display:flex; align-items:center; gap:6px; font-weight:600; color:#92400E;">
            <span style="width:10px; height:10px; background:#F59E0B; border-radius:50%;"></span> Attention Required (70-84%)
          </span>
          <span style="font-weight:700;">${attention} patients (${Math.round((attention/total)*100)}%)</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill warning" style="width: ${(attention/total)*100}%;"></div>
        </div>
      </div>

      <div>
        <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 6px;">
          <span style="display:flex; align-items:center; gap:6px; font-weight:600; color:#991B1B;">
            <span style="width:10px; height:10px; background:#EF4444; border-radius:50%;"></span> Critical Adherence (<70%)
          </span>
          <span style="font-weight:700;">${critical} patients (${Math.round((critical/total)*100)}%)</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill danger" style="width: ${(critical/total)*100}%;"></div>
        </div>
      </div>
    </div>
  `;
}

function renderOverviewRecentAlerts() {
  const container = document.getElementById('overviewRecentAlertsList');
  if (!container) return;

  const escalations = store.state.escalations.slice(0, 4);
  container.innerHTML = escalations.map(esc => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border-light);">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div class="kpi-icon-wrap ${esc.level === 2 || esc.severity === 'Critical' ? 'danger' : 'warning'}" style="width:34px; height:34px;">
          ${SVG_ICONS.alertTriangle}
        </div>
        <div>
          <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-main);">
            ${esc.patientName} <span style="font-weight: 500; font-size: 0.78rem; color: var(--text-muted);">(${esc.patientId})</span>
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">
            ${esc.medication} • Scheduled: ${esc.scheduledTime}
          </div>
        </div>
      </div>
      <div style="text-align: right;">
        <span class="badge ${esc.level === 2 ? 'badge-danger' : 'badge-warning'}">
          ${esc.level === 2 ? 'Level 2 Clinician' : 'Level 1 Caregiver'}
        </span>
        <div style="font-size: 0.72rem; color: var(--text-light); margin-top: 4px; font-family: var(--font-mono);">
          ${esc.alertTimestamp}
        </div>
      </div>
    </div>
  `).join('');
}

function renderOverviewDispenserFeed() {
  const container = document.getElementById('overviewDispenserActivityList');
  if (!container) return;

  const logs = store.state.deviceEventLogs.slice(0, 4);
  container.innerHTML = logs.map(log => `
    <div style="display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--border-light);">
      <div style="margin-top: 2px; color: ${log.status === 'Tamper Alert' ? 'var(--status-danger)' : log.status === 'Offline' ? 'var(--status-warning)' : 'var(--status-success)'};">
        ${SVG_ICONS.cpu}
      </div>
      <div style="flex: 1;">
        <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-main);">
          ${log.dispenserId} • ${log.type}
        </div>
        <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); margin-top: 2px;">
          Hash: <span style="color: var(--blue-primary);">${log.hash}</span> • ${log.timestamp}
        </div>
      </div>
    </div>
  `).join('');
}

// --- Patient Monitoring Page Renderer ---
let patientFilterStatus = 'all';
let patientSearchQuery = '';

function renderPatientsPage() {
  const tableBody = document.getElementById('patientsTableBody');
  if (!tableBody) return;

  const filtered = store.state.patients.filter(p => {
    const matchesStatus = patientFilterStatus === 'all' || p.status.toLowerCase() === patientFilterStatus.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
                          p.id.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
                          p.condition.toLowerCase().includes(patientSearchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  tableBody.innerHTML = filtered.map(p => {
    const statusBadgeClass = p.status === 'On Track' ? 'badge-success' : p.status === 'Critical' ? 'badge-danger' : 'badge-warning';
    const progressFillClass = p.adherence >= 85 ? 'success' : p.adherence < 70 ? 'danger' : 'warning';

    return `
      <tr class="${p.status === 'Critical' ? 'row-critical' : ''}">
        <td style="font-family: var(--font-mono); font-weight: 700; color: var(--blue-primary);">${p.id}</td>
        <td>
          <div style="font-weight: 700; color: var(--text-main); font-size: 0.92rem;">${p.name}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${p.age} yrs • ${p.condition}</div>
        </td>
        <td>
          <div style="font-weight: 600; font-size: 0.85rem;">${p.caregiver}</div>
          <div style="font-size: 0.75rem; color: var(--text-light);">${p.caregiverPhone}</div>
        </td>
        <td>
          <div style="font-weight: 600; font-size: 0.85rem;">${p.clinician}</div>
          <div style="font-size: 0.75rem; color: var(--text-light);">${p.clinicianPhone}</div>
        </td>
        <td style="min-width: 140px;">
          <div class="progress-container">
            <span style="font-weight: 700; font-size: 0.85rem; width: 36px;">${p.adherence}%</span>
            <div class="progress-bar">
              <div class="progress-fill ${progressFillClass}" style="width: ${p.adherence}%;"></div>
            </div>
          </div>
        </td>
        <td style="font-size: 0.82rem; color: var(--text-muted);">${p.lastActivity}</td>
        <td>
          <span class="badge ${statusBadgeClass}">
            ${p.status}
          </span>
        </td>
        <td style="text-align: right;">
          <button class="btn btn-sm btn-outline-primary" onclick="openPatientDrawer('${p.id}')">
            ${SVG_ICONS.eye} View Profile
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function setPatientFilter(status, pillElement) {
  patientFilterStatus = status;
  document.querySelectorAll('#patientFilterPills .filter-pill').forEach(el => el.classList.remove('active'));
  if (pillElement) pillElement.classList.add('active');
  renderPatientsPage();
}

function handlePatientSearch(input) {
  patientSearchQuery = input.value;
  renderPatientsPage();
}

// --- Patient Profile Slide-Over Drawer ---
function openPatientDrawer(patientId) {
  const patient = store.state.patients.find(p => p.id === patientId);
  if (!patient) return;

  const drawer = document.getElementById('patientSlideDrawer');
  const overlay = document.getElementById('patientDrawerOverlay');
  const body = document.getElementById('patientDrawerContent');
  if (!drawer || !body) return;

  const dev = store.state.dispensers.find(d => d.id === patient.dispenserId) || {};

  body.innerHTML = `
    <!-- Top Bio -->
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="width: 52px; height: 52px; border-radius: 50%; background: #0284C7; color: white; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 800;">
          ${patient.name.split(' ').map(n=>n[0]).join('')}
        </div>
        <div>
          <div style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 800; color: var(--text-main);">
            ${patient.name}
          </div>
          <div style="font-size: 0.82rem; color: var(--text-muted);">
            ID: <span style="font-family: var(--font-mono); font-weight: 600;">${patient.id}</span> • ${patient.age} years • ${patient.gender}
          </div>
        </div>
      </div>
      <div>
        <span class="badge ${patient.status === 'On Track' ? 'badge-success' : patient.status === 'Critical' ? 'badge-danger' : 'badge-warning'}" style="font-size: 0.82rem; padding: 6px 12px;">
          ${patient.status}
        </span>
      </div>
    </div>

    <!-- Adherence Metric Card -->
    <div class="card" style="margin-bottom: 20px; padding: 18px; background: #F8FAFC;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <div style="font-size: 0.78rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted);">30-Day Adherence Score</div>
          <div style="font-size: 1.8rem; font-weight: 800; color: ${patient.adherence >= 85 ? 'var(--status-success)' : patient.adherence < 70 ? 'var(--status-danger)' : 'var(--status-warning)'};">
            ${patient.adherence}%
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.78rem; color: var(--text-muted);">Connected Dispenser</div>
          <div style="font-weight: 700; font-family: var(--font-mono); color: var(--blue-primary);">${patient.dispenserId}</div>
          <div style="font-size: 0.75rem; color: ${dev.status === 'Online' ? 'var(--status-success)' : 'var(--status-danger)'};">
            ● ${dev.status || 'Active'} (${dev.battery || 85}% Battery)
          </div>
        </div>
      </div>
    </div>

    <!-- Care Team Information -->
    <div style="margin-bottom: 24px;">
      <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
        ${SVG_ICONS.users} Assigned Care Team
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div style="background: white; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 12px;">
          <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--text-light);">Primary Caregiver</div>
          <div style="font-weight: 700; font-size: 0.88rem; margin-top: 2px;">${patient.caregiver}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${patient.caregiverPhone}</div>
        </div>
        <div style="background: white; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 12px;">
          <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--text-light);">Lead Clinician</div>
          <div style="font-weight: 700; font-size: 0.88rem; margin-top: 2px;">${patient.clinician}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${patient.clinicianPhone}</div>
        </div>
      </div>
    </div>

    <!-- Active Medication Schedule -->
    <div style="margin-bottom: 24px;">
      <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
        ${SVG_ICONS.pill} Daily Medication Regimen
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${patient.medications.map(med => {
          const badge = med.status === 'Taken' ? 'badge-success' : med.status === 'Missed' ? 'badge-danger' : med.status === 'Pending' ? 'badge-warning' : 'badge-info';
          return `
            <div style="background: white; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 12px 14px; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-weight: 700; font-size: 0.88rem;">${med.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted); display:flex; gap:10px; margin-top:2px;">
                  <span>Scheduled: <strong>${med.schedule}</strong></span>
                  <span>Compartment: ${med.compartment}</span>
                </div>
              </div>
              <div style="text-align: right;">
                <span class="badge ${badge}">${med.status}</span>
                <div style="font-size: 0.72rem; color: var(--text-light); margin-top: 2px;">
                  ${med.confirmedAt !== '-' ? `Confirmed: ${med.confirmedAt}` : 'Awaiting sync'}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- 7-Day Dose History -->
    <div>
      <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
        ${SVG_ICONS.calendar} 7-Day Dose Audit History
      </div>
      <div style="display: flex; gap: 8px; justify-content: space-between;">
        ${patient.history.map(h => `
          <div style="flex: 1; background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 8px 4px; text-align: center;">
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600;">${h.date}</div>
            <div style="font-size: 0.95rem; font-weight: 800; margin: 4px 0; color: ${h.adherence === 100 ? 'var(--status-success)' : h.adherence >= 60 ? 'var(--status-warning)' : 'var(--status-danger)'};">
              ${h.adherence}%
            </div>
            <div style="font-size: 0.65rem; color: var(--text-light);">${h.taken}/${h.scheduled} Doses</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  overlay.classList.add('active');
  drawer.classList.add('active');
}

function closePatientDrawer() {
  const drawer = document.getElementById('patientSlideDrawer');
  const overlay = document.getElementById('patientDrawerOverlay');
  if (drawer) drawer.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
}

// --- Medication Tracking Page Renderer ---
function renderMedicationsPage() {
  const scheduleContainer = document.getElementById('medicationsTimelineList');
  if (!scheduleContainer) return;

  // Aggregate today's doses from all patients
  const allDoses = [];
  store.state.patients.forEach(patient => {
    patient.medications.forEach(m => {
      allDoses.push({
        patientId: patient.id,
        patientName: patient.name,
        medicationName: m.name,
        schedule: m.schedule,
        status: m.status,
        compartment: m.compartment,
        confirmedAt: m.confirmedAt,
        caregiver: patient.caregiver
      });
    });
  });

  // Sort chronologically by schedule
  allDoses.sort((a, b) => a.schedule.localeCompare(b.schedule));

  scheduleContainer.innerHTML = allDoses.map(dose => {
    const statusClass = dose.status === 'Taken' ? 'badge-success' : dose.status === 'Missed' ? 'badge-danger' : dose.status === 'Pending' ? 'badge-warning' : 'badge-info';
    const dotClass = dose.status === 'Taken' ? 'success' : dose.status === 'Missed' ? 'danger' : dose.status === 'Pending' ? 'warning' : '';

    return `
      <div class="timeline-item">
        <div class="timeline-dot ${dotClass}">
          ${dose.status === 'Taken' ? SVG_ICONS.checkCircle : dose.status === 'Missed' ? SVG_ICONS.x : SVG_ICONS.clock}
        </div>
        <div class="timeline-content">
          <div class="timeline-header">
            <div>
              <span style="font-weight: 700; font-size: 0.95rem; color: var(--text-main);">${dose.medicationName}</span>
              <span style="margin-left: 8px; font-size: 0.82rem; color: var(--text-muted);">
                for <strong>${dose.patientName}</strong> (${dose.patientId})
              </span>
            </div>
            <span class="badge ${statusClass}">
              ${dose.status}
            </span>
          </div>
          <div class="timeline-body" style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
            <div>
              <span>Scheduled Time: <strong>${dose.schedule}</strong></span>
              <span style="margin-left: 12px; color: var(--text-light);">Dispenser Compartment: ${dose.compartment}</span>
            </div>
            <div style="font-size: 0.78rem; font-family: var(--font-mono); color: var(--text-muted);">
              ${dose.confirmedAt !== '-' ? `Sync Timestamp: ${dose.confirmedAt}` : 'No dispenser confirmation event'}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --- Escalation Center Page Renderer (CORE FEATURE) ---
let escalationTabFilter = 'all';

function renderEscalationPage() {
  const stepper = document.getElementById('escalationWorkflowStepper');
  const listContainer = document.getElementById('escalationIncidentsList');
  if (!stepper || !listContainer) return;

  const sim = store.activeSimulation;

  // 1. Render 5-Step Visual Pipeline
  stepper.innerHTML = `
    <div class="step-card ${sim ? 'active' : ''}">
      <div class="step-number">
        <span>STEP 1</span>
        ${SVG_ICONS.clock}
      </div>
      <div class="step-title">Scheduled Dose</div>
      <div class="step-desc">Fictional medication regimen scheduled for patient.</div>
    </div>

    <div class="step-card ${sim ? 'active' : ''}">
      <div class="step-number">
        <span>STEP 2</span>
        ${SVG_ICONS.alertTriangle}
      </div>
      <div class="step-title">Missed-Dose Detect</div>
      <div class="step-desc">No dispenser confirmation received inside time window.</div>
    </div>

    <div class="step-card ${sim && sim.level >= 1 ? 'active' : ''}">
      <div class="step-number">
        <span>STEP 3</span>
        <span class="badge badge-warning" style="font-size: 0.65rem;">L1</span>
      </div>
      <div class="step-title">Caregiver Alert</div>
      <div class="step-desc">Automated SMS/Push dispatched with patient details.</div>
    </div>

    <div class="step-card ${sim && sim.level === 2 ? 'active-critical' : ''}">
      <div class="step-number">
        <span>STEP 4</span>
        <span class="badge badge-danger" style="font-size: 0.65rem;">L2</span>
      </div>
      <div class="step-title">Clinician Dispatch</div>
      <div class="step-desc">Escalates to assigned doctor after grace period.</div>
    </div>

    <div class="step-card ${sim && sim.resolved ? 'active' : ''}">
      <div class="step-number">
        <span>STEP 5</span>
        ${SVG_ICONS.checkCircle}
      </div>
      <div class="step-title">Incident Resolution</div>
      <div class="step-desc">Care team records action and completes audit trail.</div>
    </div>
  `;

  // 2. Render Incident Cards
  const escalations = store.state.escalations.filter(e => {
    if (escalationTabFilter === 'level1') return e.level === 1;
    if (escalationTabFilter === 'level2') return e.level === 2;
    if (escalationTabFilter === 'resolved') return e.status === 'Resolved';
    return true;
  });

  listContainer.innerHTML = escalations.map(esc => {
    const isLevel2 = esc.level === 2;
    const isAck = esc.status === 'Acknowledged';
    const isRes = esc.status === 'Resolved';

    return `
      <div class="card" style="margin-bottom: 16px; border-left: 4px solid ${isRes ? 'var(--status-success)' : isLevel2 ? 'var(--status-danger)' : 'var(--status-warning)'};">
        <div class="card-body" style="padding: 20px;">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="kpi-icon-wrap ${isLevel2 ? 'danger' : 'warning'}">
                ${SVG_ICONS.alertTriangle}
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; color: var(--text-main);">
                    ${esc.patientName} (${esc.patientId})
                  </span>
                  <span class="badge ${isLevel2 ? 'badge-danger' : 'badge-warning'}">
                    ${esc.levelName}
                  </span>
                  <span class="badge ${isRes ? 'badge-success' : isAck ? 'badge-info' : 'badge-neutral'}">
                    ${esc.status}
                  </span>
                </div>
                <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">
                  Incident ID: <strong style="font-family: var(--font-mono);">${esc.id}</strong> • Scheduled Dose: <strong>${esc.medication}</strong> at ${esc.scheduledTime}
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              ${!isRes && !isAck ? `
                <button class="btn btn-sm btn-secondary" onclick="store.acknowledgeActiveAlert('${esc.id}')">
                  ${SVG_ICONS.checkCircle} Acknowledge
                </button>
              ` : ''}
              ${!isRes ? `
                <button class="btn btn-sm btn-primary" onclick="openResolveModal('${esc.id}')">
                  Resolve Incident
                </button>
              ` : `
                <span class="badge badge-success" style="padding: 6px 12px;">
                  ${SVG_ICONS.checkCircle} Completed
                </span>
              `}
            </div>
          </div>

          <div style="background: #F8FAFC; border-radius: var(--radius-md); padding: 12px 16px; font-size: 0.85rem; color: var(--text-main); margin-bottom: 12px;">
            <strong>Audit & Escalation Details:</strong> ${esc.notes}
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; color: var(--text-muted); flex-wrap: wrap; gap: 8px;">
            <div>
              Assigned Contact: <strong>${esc.responder}</strong>
            </div>
            <div style="font-family: var(--font-mono);">
              Alert Dispatched: ${esc.alertTimestamp}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function setEscalationFilter(filter, buttonEl) {
  escalationTabFilter = filter;
  document.querySelectorAll('#escalationFilterTabs button').forEach(b => b.classList.remove('active'));
  if (buttonEl) buttonEl.classList.add('active');
  renderEscalationPage();
}

// --- Smart Dispenser Monitoring Page Renderer ---
function renderDispensersPage() {
  const tableBody = document.getElementById('dispensersTableBody');
  const eventLogList = document.getElementById('dispenserEventLogList');
  if (!tableBody || !eventLogList) return;

  // Dispenser Devices Table
  tableBody.innerHTML = store.state.dispensers.map(d => {
    const isOnline = d.status === 'Online';
    const isTamper = d.tamper === 'Tamper Alert';

    return `
      <tr>
        <td style="font-family: var(--font-mono); font-weight: 700; color: var(--blue-primary);">${d.id}</td>
        <td>
          <div style="font-weight: 700;">${d.patientName}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">${d.patientId}</div>
        </td>
        <td>
          <span class="badge ${isOnline ? 'badge-success' : 'badge-danger'}">
            ● ${d.status}
          </span>
        </td>
        <td style="font-size: 0.82rem;">${d.battery}% (${d.signal})</td>
        <td>
          <span class="badge ${d.compartment === 'Locked' ? 'badge-neutral' : 'badge-warning'}">
            ${d.compartment === 'Locked' ? SVG_ICONS.lock : SVG_ICONS.unlock} ${d.compartment}
          </span>
        </td>
        <td>
          <span class="badge ${d.doseReleased === 'Released' ? 'badge-success' : 'badge-neutral'}">
            ${d.doseReleased}
          </span>
        </td>
        <td>
          <span class="badge ${isTamper ? 'badge-danger' : 'badge-success'}">
            ${isTamper ? SVG_ICONS.alertTriangle : SVG_ICONS.shield} ${d.tamper}
          </span>
        </td>
        <td style="font-size: 0.78rem; font-family: var(--font-mono); color: var(--text-light);">${d.lastSync}</td>
        <td style="text-align: right;">
          <button class="btn btn-sm btn-secondary" onclick="store.simulateDeviceSync('${d.id}')" title="Sync Dispenser">
            ${SVG_ICONS.refresh} Sync
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Tamper-Evident SHA-256 Hash Chained Logs
  eventLogList.innerHTML = store.state.deviceEventLogs.map(log => `
    <div style="background: white; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 12px 16px; margin-bottom: 8px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
        <span style="font-family: var(--font-mono); font-weight: 700; color: var(--text-main); font-size: 0.85rem;">
          ${log.id} • ${log.dispenserId} (${log.patientId})
        </span>
        <span class="badge ${log.status === 'Tamper Alert' ? 'badge-danger' : log.status === 'Success' ? 'badge-success' : 'badge-neutral'}">
          ${log.status}
        </span>
      </div>
      <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 6px;">
        Event Action: <strong>${log.type}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.74rem; font-family: var(--font-mono); color: var(--text-light);">
        <span>Prev Hash: ${log.prevHash} ➔ <strong style="color: var(--blue-primary);">Block Hash: ${log.hash}</strong></span>
        <span>${log.timestamp}</span>
      </div>
    </div>
  `).join('');
}

// --- Reports & Analytics Page Renderer ---
function renderReportsPage() {
  const chartAdherence = document.getElementById('analyticsAdherenceChart');
  const chartTime = document.getElementById('analyticsTimeChart');
  if (!chartAdherence || !chartTime) return;

  // Monthly 4-week trend
  chartAdherence.innerHTML = `
    <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 180px; padding: 20px 10px 0;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1;">
        <span style="font-size: 0.75rem; font-weight: 700;">81.2%</span>
        <div style="width: 32px; height: 110px; background: #93C5FD; border-radius: 4px;"></div>
        <span style="font-size: 0.75rem; color: var(--text-muted);">Week 1</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1;">
        <span style="font-size: 0.75rem; font-weight: 700;">83.6%</span>
        <div style="width: 32px; height: 122px; background: #60A5FA; border-radius: 4px;"></div>
        <span style="font-size: 0.75rem; color: var(--text-muted);">Week 2</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1;">
        <span style="font-size: 0.75rem; font-weight: 700;">85.0%</span>
        <div style="width: 32px; height: 130px; background: #3B82F6; border-radius: 4px;"></div>
        <span style="font-size: 0.75rem; color: var(--text-muted);">Week 3</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1;">
        <span style="font-size: 0.75rem; font-weight: 700; color: var(--blue-primary);">${store.state.kpis.avgAdherence.toFixed(1)}%</span>
        <div style="width: 32px; height: 145px; background: var(--blue-primary); border-radius: 4px;"></div>
        <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-main);">Current</span>
      </div>
    </div>
  `;

  // Time of Day distribution
  chartTime.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 14px; padding-top: 10px;">
      <div>
        <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-bottom:4px;">
          <span>Morning Doses (06:00 - 11:00)</span>
          <strong>42% (5 Missed today)</strong>
        </div>
        <div class="progress-bar"><div class="progress-fill warning" style="width: 42%;"></div></div>
      </div>
      <div>
        <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-bottom:4px;">
          <span>Afternoon Doses (11:00 - 16:00)</span>
          <strong>36% (4 Missed today)</strong>
        </div>
        <div class="progress-bar"><div class="progress-fill danger" style="width: 36%;"></div></div>
      </div>
      <div>
        <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-bottom:4px;">
          <span>Evening / Night Doses (16:00 - 23:00)</span>
          <strong>22% (3 Missed today)</strong>
        </div>
        <div class="progress-bar"><div class="progress-fill success" style="width: 22%;"></div></div>
      </div>
    </div>
  `;
}

// Export Simulated Audit Report
function exportAuditReportCSV() {
  const csvRows = [
    ["Patient ID", "Name", "Adherence Rate", "Caregiver", "Clinician", "Dispenser ID", "Status"],
    ...store.state.patients.map(p => [p.id, p.name, p.adherence + "%", p.caregiver, p.clinician, p.dispenserId, p.status])
  ];
  const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `DoseGuard_Synthetic_Audit_Report_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  ToastSystem.show("Report Downloaded", "Synthetic patient adherence audit CSV exported successfully.", "success");
}

// --- Notifications Hub Page Renderer ---
let notifFilterCategory = 'all';

function renderNotificationsPage() {
  const container = document.getElementById('notificationsList');
  if (!container) return;

  const filtered = store.state.notifications.filter(n => {
    if (notifFilterCategory === 'all') return true;
    return n.category.toLowerCase() === notifFilterCategory.toLowerCase();
  });

  container.innerHTML = filtered.map(n => `
    <div style="background: white; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 16px 20px; margin-bottom: 12px; display: flex; align-items: flex-start; justify-content: space-between; gap: 14px;">
      <div style="display: flex; align-items: flex-start; gap: 14px;">
        <div class="kpi-icon-wrap ${n.priority === 'Critical' ? 'danger' : n.priority === 'High' ? 'warning' : 'success'}" style="margin-top: 2px;">
          ${SVG_ICONS.bell}
        </div>
        <div>
          <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main);">
            ${n.title}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin: 4px 0 8px;">
            ${n.desc}
          </div>
          <div style="display: flex; gap: 14px; font-size: 0.75rem; color: var(--text-light);">
            <span>Target: <strong>${n.recipient}</strong></span>
            <span>Channel: ${n.channel}</span>
            <span>Status: <strong>${n.status}</strong></span>
          </div>
        </div>
      </div>
      <div style="text-align: right; white-space: nowrap;">
        <span class="badge ${n.priority === 'Critical' ? 'badge-danger' : n.priority === 'High' ? 'badge-warning' : 'badge-neutral'}">
          ${n.priority}
        </span>
        <div style="font-size: 0.72rem; color: var(--text-light); margin-top: 6px; font-family: var(--font-mono);">
          ${n.timestamp}
        </div>
      </div>
    </div>
  `).join('');
}

function setNotifFilter(cat, btn) {
  notifFilterCategory = cat;
  document.querySelectorAll('#notifFilterTabs button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderNotificationsPage();
}

function markAllNotificationsRead() {
  store.state.notifications.forEach(n => n.read = true);
  ToastSystem.show("Notifications Cleared", "All notifications marked as read.", "info");
  renderNotificationsPage();
}

// --- Incident Resolution Modal Manager ---
let activeResolvingIncidentId = null;

function openResolveModal(incidentId) {
  activeResolvingIncidentId = incidentId;
  const modal = document.getElementById('resolveIncidentModal');
  const overlay = document.getElementById('resolveModalOverlay');
  const title = document.getElementById('resolveModalTitle');
  
  if (title) {
    title.textContent = `Resolve Incident ${incidentId}`;
  }
  if (modal && overlay) {
    overlay.classList.add('active');
  }
}

function closeResolveModal() {
  const overlay = document.getElementById('resolveModalOverlay');
  if (overlay) overlay.classList.remove('active');
  activeResolvingIncidentId = null;
}

function submitIncidentResolution() {
  const reasonSelect = document.getElementById('resolveReasonSelect');
  const noteInput = document.getElementById('resolveNoteInput');
  const reason = reasonSelect ? reasonSelect.value : "Patient took dose manually with caregiver";
  const note = noteInput ? noteInput.value : "Follow-up completed. Vital signs stable.";

  if (activeResolvingIncidentId) {
    store.resolveIncident(activeResolvingIncidentId, reason, note);
  }
  closeResolveModal();
}

// ==========================================================================
// 8. Initialization Lifecycle
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  ToastSystem.init();
  NavigationController.init();

  // Subscribe UI renderers to reactive store changes
  store.subscribe((state) => {
    renderEmergencyBanner();
    NavigationController.render();
  });

  // Attach global keyboard shortcuts / simulation handlers
  const simulateBtn = document.getElementById('globalSimulateBtn');
  if (simulateBtn) {
    simulateBtn.addEventListener('click', () => {
      store.startMissedDoseSimulation();
    });
  }

  const resetBtn = document.getElementById('globalResetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      store.reset();
      ToastSystem.show("Simulation Reset", "DoseGuard prototype restored to initial baseline state.", "info");
    });
  }

  // Initial render
  renderEmergencyBanner();
  NavigationController.render();
});
