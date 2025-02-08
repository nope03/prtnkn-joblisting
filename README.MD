```md
# Job Listing for FiveM (ESX + ox_lib)

## ✨ Features
- 🔥 **Uses ox_lib** (`lib.locale`, `lib.callback`, `lib.array`, `lib.notify`, `lib.zones`)
- 🌍 **Multi-language support** (`en.json`, `id.json`)
- 🔄 **Sorting & Filtering** (Only non-whitelisted jobs)
- 📍 **Zone Interaction** with `[E] Open Job Center`
- 🎭 **Animation & Prop Tablet** when opening the UI
- 📜 **Modern UI with Job Images**
- 🚀 **Optimized for Performance**

---

## 📥 Installation
### 1️⃣ **Download & Install**
1. Clone or download this repository and place it inside `resources/`
   ```sh
   git clone https://github.com/yourusername/joblisting-fivem.git
   ```
2. Ensure `ox_lib` is installed:  
   ```
   ensure ox_lib
   ```
3. Add `start joblisting-fivem` to your `server.cfg`.

---

### 2️⃣ **Configure `fxmanifest.lua`**
Ensure **ox_lib** is properly loaded:
```lua
fx_version 'cerulean'
game 'gta5'

author 'Your Name'
description 'Job Listing Script using ox_lib'
version '1.0.0'

shared_scripts {
    '@ox_lib/init.lua', -- ✅ Load ox_lib
    'config.lua',
    'locales.lua'
}

server_scripts {
    'server/main.lua'
}

client_scripts {
    'client/main.lua'
}

dependencies {
    'ox_lib',
    'es_extended'
}
```

---

### 3️⃣ **Setup Multi-Language Support**
- Default language is **English (`en`)**.
- You can switch language in **`server.cfg`**:
  ```
  set ox_locale en  # Change to 'id' for Indonesian
  ```
- You can add **new languages** inside the `locales/` folder.

📜 **Example:**  
```json
// locales/en.json
{
    "job_center_title": "Job Center",
    "job_center_description": "Choose your job from the list.",
    "job_updated": "Your job is now: {job}",
    "job_invalid": "Invalid job!",
    "press_e": "[E] Open Job Center"
}
```

---

## 📌 How It Works
### 🏢 **Job Center System**
1. **Approach a Job Center Zone** (`lib.zones`).
2. **Press `[E]` to open the UI**.
3. **Select a job** from the job list.
4. **Your job is updated** in ESX.
5. **UI closes automatically** after job selection.

### 📜 **Job Listing System**
- Uses **`Config.Jobs`** (instead of database).
- **Non-whitelisted jobs only**.
- **Sorted alphabetically (A-Z)**.
- **Supports job images**.

---

## 🛠️ **Configuration**
### **📍 Configure Job Centers (`config.lua`)**
You can define **job center locations**:
```lua
Config.JobCenters = {
    { coords = vec3(-267.99, -957.08, 31.22), size = vec3(2, 2, 2), rotation = 0, debug = false },
    { coords = vec3(451.22, -973.21, 30.69), size = vec3(2, 2, 2), rotation = 0, debug = false }
}
```

### **💼 Configure Jobs (`config.lua`)**
Jobs are stored in `Config.Jobs`:
```lua
Config.Jobs = {
    taxi = { label = "Taxi Driver", image = "images/taxi.png", whitelisted = false },
    police = { label = "Police Officer", image = "images/police.png", whitelisted = true },
    miner = { label = "Miner", image = "images/miner.png", whitelisted = false }
}
```
✅ **Only non-whitelisted jobs appear in the UI.**  
✅ **Jobs are sorted alphabetically.**  
✅ **Each job can have a custom image.**

---

## ⚡ **Commands & Hotkeys**
| Command / Key | Action |
|--------------|--------|
| `[E]`        | Open Job Center |
| `ESC`        | Close UI |
| `F8` Console | Debug Errors |

---

## 🎭 **Animations & Tablet Prop**
- When UI opens: **Player holds a tablet** (`prop_cs_tablet`).
- When UI closes: **Tablet disappears** automatically.

---

## 🎯 **To-Do & Future Updates**
- ✅ Add job descriptions to UI
- ✅ Show player’s current job before selection
- 🔄 Add more job images & icons
- ⚡ Performance optimization
- 📌 Add admin panel for job customization

---

## ❓ **Need Help?**
- 📌 **Check F8 Console** for Errors
- 📖 **Read ox_lib Docs:** https://overextended.dev/
- 🗨️ **Ask in Discord** (If available)

---

## 🎉 **Credits**
- **ESX Framework** (https://github.com/esx-framework/esx_core)
- **ox_lib by overextended** (https://github.com/overextended/ox_lib)
- **Inspired by other job scripts**
```