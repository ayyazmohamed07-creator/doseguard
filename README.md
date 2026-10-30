# DoseGuard – Smart Medication Adherence & Care Team Portal

> **"Never Miss a Dose. Never Miss a Warning."**

A smart medication adherence monitoring and multi-tier care team coordination platform designed for healthcare teams, caregivers, and clinicians. DoseGuard synchronizes simulated smart medication dispensers, tracks real-time patient compliance, and automatically escalates missed doses from Level 1 Caregiver notifications to Level 2 Clinician dispatches.

---

## 🌟 Key Features

### 1. Healthcare SaaS Dashboard Overview
- **6 Real-time KPI Counters**:
  - Total Patients: 125
  - Active Patients: 118 (94.4% monitoring compliance)
  - Average Adherence Rate: 87.5% (above 80% CMS standard)
  - Missed Doses Today: 12
  - Active Escalations: 4
  - Connected Dispensers: 96 (98.9% uptime)
- **Interactive Adherence Trend Chart**: Mon–Sun adherence curve with tooltips and target thresholds.
- **Patient Status Breakdown**: Visual distribution of On Track (≥85%), Attention Required (70–84%), and Critical (<70%).
- **Recent Missed-Dose Alerts & Dispenser Telemetry Feeds**: Live chronological audit list.

### 2. Patient Monitoring & Cohort Care
- Complete table of fictional synthetic patients:
  - **DG001** – Arjun Kumar (95% – On Track)
  - **DG002** – Meera Sharma (72% – Attention Required)
  - **DG003** – Rahul Verma (88% – On Track)
  - **DG004** – Priya Nair (54% – Critical)
  - **DG005** – Kavin Raj (100% – On Track)
  - **DG006** – Sunita Rao (91% – On Track)
  - **DG007** – David Chen (68% – Attention Required)
- **Filter Pills**: All, On Track, Attention Required, Critical.
- **Search Bar**: Live search by name, patient ID, or medical diagnosis.
- **Patient Profile Slide-Over Drawer**:
  - Detailed demographics & emergency care team contacts
  - 30-day adherence percentage & connected dispenser telemetry
  - Daily medication schedule with compartment numbers
  - 7-day dose audit history bar
  - Direct action: Trigger test missed dose for this specific patient

### 3. Medication Regimen & Daily Timeline
- 24-hour chronological timeline of all daily doses.
- Clear color-coded status badges:
  - **Taken** – Green
  - **Upcoming** – Blue
  - **Missed** – Red
  - **Pending** – Orange
- Dispenser compartment mapping and confirmation timestamps.
- Explicit medical safety notice: *"DoseGuard displays scheduling telemetry only. Does not provide medical diagnosis or alter physician prescriptions."*

### 4. Automated Missed-Dose Escalation Center (Core Feature)
Visual 5-Step Automated Workflow:
1. **STEP 1: Scheduled Dose** – Regimen scheduled for fictional patient.
2. **STEP 2: Missed-Dose Detection** – Dispenser confirmation not received within time window.
3. **STEP 3: Caregiver Notification (Level 1)** – Automated SMS & mobile push notification sent to caregiver.
4. **STEP 4: Clinician Alert Dispatch (Level 2)** – If unacknowledged after grace window, dispatches urgent alert to assigned Doctor.
5. **STEP 5: Incident Resolution** – Care team acknowledges, inputs follow-up clinical note, and resolves incident.

- **Dynamic Visual Differences**: Level 1 (Amber/Warning) vs Level 2 (Red/Critical).
- **Incident Actions**: Direct "Acknowledge" (pauses escalation) and "Resolve Incident" (modal to capture clinical notes).

### 5. Smart Dispenser Telemetry & Hardware Simulation
- Hardware monitoring table: Device ID, Patient ID, Online/Offline, Battery %, Signal Strength, Compartment Lock/Accessed, Dose Released/Not Released, Tamper Status.
- **Interactive Hardware Demo Toolbar**:
  - `⚡ Simulate Device Sync` – Updates last sync to "Just now" and generates new hash block.
  - `💊 Simulate Dose Release` – Simulates solenoid compartment actuation.
  - `📡 Simulate Device Offline` – Simulates connection timeout and alerts field support.
  - `🚨 Simulate Tamper Alert` – Simulates accelerometer tilt / lid force sensor breach.
- **Cryptographic SHA-256 Hash-Chained Event Ledger**: Immutable tamper-evident audit records.
- **Clinical Clarification**: Prominent notice stating that mechanical compartment opening does not constitute legal or clinical proof of oral ingestion.

### 6. Reports & Analytics
- Monthly adherence trends (Week-by-week analysis).
- Missed dose frequency by time of day (Morning 42%, Afternoon 36%, Evening 22%).
- Caregiver response statistics (Average 8.4 mins response time).
- One-click **"Export Audit CSV Report"** download.

### 7. Centralized Notifications Hub
- Filter by categories: All, Caregiver, Clinician, Tamper, Device.
- Read/Unread management.

### 8. System & Escalation Settings
- Configurable caregiver grace period and clinician auto-dispatch windows (Demo 15s speed vs Clinical 15m).
- Notification channel toggles (SMS, Push, In-App, EHR Webhook).
- Care Team Directory & Physician roles.

---

## 🎬 How to Run & Demo for Presentations

### Option 1: Direct Browser Launch (Zero Installation)
Simply double-click `index.html` in Windows Explorer or open it in Google Chrome, Microsoft Edge, or any modern web browser:
```
file:///C:/Users/HP/.gemini/antigravity/scratch/doseguard/index.html
```

### Option 2: Local HTTP Server (PowerShell)
Open PowerShell in this directory and run:
```powershell
.\server.ps1 -Port 8080
```
Then navigate to: `http://localhost:8080/`

---

## 🏆 Presentation Demonstration Script (2-Minute Hackathon Pitch)

1. **Introduce the Problem & Tagline**:
   - Point out the tagline: *"Never Miss a Dose. Never Miss a Warning."*
   - Highlight the 6 summary cards on the Overview Dashboard.
2. **Click `🚨 SIMULATE MISSED DOSE`**:
   - A Web Audio clinical chime plays.
   - An alert toast pops up indicating patient Priya Nair (DG004) missed her 08:00 AM dose.
   - The global counters update (Missed Doses: 12 ➔ 13; Escalations: 4 ➔ 5).
   - An emergency banner appears with an interactive 15-second countdown timer.
3. **Show Automated Multi-Tier Escalation**:
   - Navigate to the **Escalation Center** tab.
   - Watch the 5-step stepper light up: Step 1 ➔ Step 2 ➔ Step 3 (Level 1 Caregiver Notification).
   - Wait for the 15-second countdown to expire without clicking acknowledge.
   - Watch the system automatically trigger **Level 2 Clinician Escalation** with a double-tone siren, flashing red banner, and dispatch to Dr. Sarah Jenkins!
4. **Demonstrate Care Team Resolution**:
   - Click **"Resolve Incident"**.
   - Select reason *"Caregiver administered backup dose in person"* and type follow-up note.
   - Click *"Confirm & Close Incident"*. The step advances to Step 5, counters decrement, and the incident is archived in the audit history.
5. **Show Smart Dispenser Hardware Telemetry**:
   - Navigate to **Smart Dispensers**.
   - Click `🚨 Simulate Tamper Alert` or `⚡ Simulate Device Sync` to demonstrate the cryptographic SHA-256 hash-chained hardware log.
   - Point out the medical safety disclaimer.
6. **Reset State**:
   - Click `🔄 RESET SIMULATION` to return the system to pristine initial demonstration state.

---

## 🔒 Privacy & Medical Compliance Notice
- All patient names, medical IDs, records, and telemetry values are strictly synthetic demonstration data.
- Does not connect to real patient EHRs or external SMS gateways.
- Dispenser access telemetries indicate mechanical compartment opening, but do not represent legal or clinical confirmation of medication ingestion.
