# Sociofy — "From Human Intent to the Right Action"

> **Universal AI-Powered Public Service & Intent Bridge**  
> *One simple interface for complex public services.*

---

## 🌟 Overview

**Sociofy** is an AI-powered universal bridge between citizens and complex public-service systems. Ordinary people facing everyday problems (traffic hazards, flooding, suspicious crimes, civic certificate procedures, or healthcare concerns) often do not know:
- Which government department they should contact
- How to describe the problem in formal/professional terms
- Which official government website or portal to use
- What key facts to include
- How urgent the situation is

Sociofy solves this by enabling anyone to describe their problem naturally via **TEXT**, **VOICE**, or **IMAGE**.

Using **Google Gemini AI**, Sociofy analyzes human intent, identifies the target department, extracts key facts, reformats messy input into a formal structured report, assigns an urgency level, provides immediate safety advice, and directs the citizen to the authorized official government portal.

---

## 🚀 Key Features

1. **Multimodal Input Methods**:
   - **Text Input**: Type in plain, everyday words.
   - **Voice Input**: Integrated browser Web Speech API with real-time feedback (*Listening... Transcribing... Analyzing...*).
   - **Image Input**: Upload or capture photos for Gemini Vision analysis (potholes, flooding, road damage, public infrastructure).
2. **Strict Department Classification**:
   - 🚦 **TRAFFIC & ROAD SAFETY**: Accidents, potholes, traffic signal failures, illegal parking.
   - 🌧️ **WEATHER & DISASTER**: Urban flooding, storm damage, landslides, waterlogging.
   - 🚔 **CRIME & PUBLIC SAFETY**: Theft, suspicious activity, break-ins, property damage.
   - 📜 **GOVERNMENT SERVICES**: Certificates, welfare schemes, civic grievances, municipal complaints.
   - 🏥 **HEALTHCARE**: Health symptoms, medical guidance, tele-consultation navigation.
3. **Professional Report Rewriter**:
   - Converts informal, messy human input into an objective, formal report.
   - Includes **[Edit Report]** and 1-click **[Copy Report]** for pasting directly into official government application forms.
4. **Urgency & Emergency System**:
   - Categorizes issues into `LOW`, `MEDIUM`, `HIGH`, or `EMERGENCY`.
   - `EMERGENCY` triggers a high-prominence red alert with direct single-tap hotlines for **112 (Emergency)**, **100 (Police)**, and **108 (Ambulance)**.
5. **Verified Official Portal Routing**:
   - Directs users to verified official government portals (e.g. Parivahan, CPGRAMS, NDMA, CyberCrime, eSanjeevani).
6. **Transparent AI Reasoning**:
   - Shows a plain-language explanation of why a specific department was selected (*"Why Traffic? Your description mentions a road hazard..."*).
7. **Accessibility & Privacy First**:
   - High-Contrast Mode & Text Size Toggle (`A+`).
   - Privacy notices & explicit healthcare disclaimers (*"AI assessment - Does not replace emergency services or medical diagnosis"*).
8. **1-Click Hackathon Demo Scenarios**:
   - 5 pre-configured real-world examples for instant testing.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite 6
- **Styling**: Tailwind CSS + Lucide Icons
- **Backend**: Node.js + Express.js
- **AI Engine**: Google Gemini API (`gemini-2.0-flash`) with Multimodal Vision & System Instructions
- **Voice Recognition**: Web Speech API (`webkitSpeechRecognition` / `SpeechRecognition`)

---

## 🔒 Security & Environment Setup

The Gemini API key is kept strictly on the Node.js Express backend server and is **never exposed client-side**.

### 1. Create Environment File

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3001
```

> **Note**: If `GEMINI_API_KEY` is omitted or empty, Sociofy automatically uses its built-in intelligent fallback classifier so the application remains 100% testable out of the box!

---

## 💻 How to Run Locally

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Application (Concurrent Frontend + Backend)
```bash
npm run dev
```

This starts:
- **Express Backend Server**: `http://localhost:3001`
- **Vite React Frontend**: `http://localhost:5173`

Open `http://localhost:5173` in your browser.

---

## 🧪 Example Test Inputs

Try typing or speaking any of these examples in Sociofy:

1. **Traffic**:
   > *"There is a huge pothole near my college road and two-wheelers are struggling to pass safely."*
2. **Weather / Disaster**:
   > *"My residential street is flooded after heavy rain today and water is entering low lying areas."*
3. **Crime / Safety**:
   > *"I saw an unknown individual trying to break into a parked vehicle on 4th Main Street."*
4. **Government Services**:
   > *"I want to apply for a birth certificate and pension scheme for my elderly relative."*
5. **Healthcare**:
   > *"I have been feeling sick for 2 days with high fever and severe throat pain."*

---

## 📂 Project Architecture

```
d:\Sociofy\
├── backend/ & server.js          # Express backend API (/api/analyze)
├── services/geminiService.js     # Gemini API integration & Fallback Classifier
├── src/
│   ├── components/
│   │   ├── Header.jsx            # Top Bar & Emergency Hotlines & Accessibility
│   │   ├── Hero.jsx              # Hero banner & Intent tagline
│   │   ├── InputPanel.jsx        # Text, Voice, Image Upload panel
│   │   ├── VoiceInput.jsx        # Web Speech API speech-to-text
│   │   ├── ImageUpload.jsx       # Image file dropzone & Gemini Vision preview
│   │   ├── DemoExamples.jsx      # 5 ready-to-test hackathon scenarios
│   │   ├── DepartmentCards.jsx   # Supported public service departments
│   │   ├── AnalysisResult.jsx    # Results dashboard & AI reasoning
│   │   ├── ProfessionalReport.jsx# Editable structured report with 1-click copy
│   │   ├── UrgencyBadge.jsx      # LOW / MEDIUM / HIGH / EMERGENCY badge
│   │   ├── OfficialPortalButton.jsx # Verified portal CTA
│   │   └── Footer.jsx            # Privacy notices & Emergency helplines
│   ├── config/
│   │   └── departmentLinks.js    # Official government portal configuration
│   ├── App.jsx                   # Main application controller
│   ├── index.css                 # Tailwind CSS & custom animations
│   └── main.jsx                  # React DOM entry point
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ⚖️ Disclaimer

Sociofy is an AI-powered public-service intent routing assistant. It does not replace official emergency services (112 / 911) or professional medical care.
