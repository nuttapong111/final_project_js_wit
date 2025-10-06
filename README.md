# 🌟 Dream App - แอปพลิเคชันจัดการงานและคำคม

Dream App เป็น Web Application ที่สร้างด้วย React และ JavaScript สำหรับการจัดการงานส่วนตัวและดูคำคมแรงบันดาลใจ พร้อมฟีเจอร์การโต้ตอบแบบครบวงจร

## ✨ ฟีเจอร์หลัก

### 🎯 การจัดการงาน (Task Management)
- ✅ เพิ่ม/แก้ไข/ลบงาน
- 🔍 ค้นหางานตามชื่อหรือรายละเอียด
- 📊 แสดงสถิติงาน (ทั้งหมด, เสร็จแล้ว, รอดำเนินการ)
- 🏷️ จัดหมวดหมู่และระดับความสำคัญ
- 💾 บันทึกข้อมูลใน Local Storage

### 💭 คำคมแรงบันดาลใจ (Inspirational Quotes)
- 🎲 สุ่มคำคมใหม่
- ❤️ บันทึกคำคมที่ชอบ
- 🔍 ค้นหาคำคมตามคำสำคัญ
- 📚 ดูคำคมทั้งหมด
- 🌐 เชื่อมต่อกับ Quotable API

### 👤 การจัดการโปรไฟล์
- ✏️ แก้ไขข้อมูลส่วนตัว
- 🖼️ เปลี่ยนรูปโปรไฟล์
- 📈 ดูสถิติการใช้งาน
- ℹ️ ข้อมูลเกี่ยวกับแอป

### 🎨 การออกแบบ
- 🎨 UI สวยงามด้วย NextUI และ Tailwind CSS
- 📱 Responsive Design รองรับทุกขนาดหน้าจอ
- 🌈 โทนสีขาว-เทา สะอาดตา
- ⚡ การทำงานที่รวดเร็วและลื่นไหล

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend Framework**: React 18
- **UI Library**: NextUI
- **Styling**: Tailwind CSS
- **State Management**: React Context API + useReducer
- **API Integration**: Fetch API, Async/Await
- **Data Persistence**: Local Storage
- **External APIs**: 
  - Quotable API (คำคม)
  - JSONPlaceholder API (ข้อมูลตัวอย่าง)

## 🚀 การติดตั้งและรัน

### ข้อกำหนดระบบ
- Node.js 14.0 หรือใหม่กว่า
- npm หรือ yarn

### ขั้นตอนการติดตั้ง

1. **Clone repository**
   ```bash
git clone https://github.com/nuttapong111/final_project_js_wit.git
cd final_project_js_wit/dream-web-app
   ```

2. **ติดตั้ง dependencies**
   ```bash
   npm install
   ```

3. **รันแอปพลิเคชัน**
   ```bash
   npm start
   ```

4. **เปิดเบราว์เซอร์**
   ```
   http://localhost:3000
   ```

### การ Build สำหรับ Production
```bash
npm run build
```

## 📁 โครงสร้างโปรเจกต์

```
dream-web-app/
├── public/
├── src/
│   ├── components/          # React Components
│   │   ├── Header.js       # ส่วนหัวของแอป
│   │   ├── Navigation.js   # เมนูนำทาง
│   │   ├── Dashboard.js    # หน้าหลัก
│   │   ├── TaskList.js     # รายการงาน
│   │   ├── TaskItem.js     # รายการงานแต่ละรายการ
│   │   ├── AddTask.js      # เพิ่มงานใหม่
│   │   ├── Search.js       # ค้นหางาน
│   │   ├── Quotes.js       # คำคม
│   │   └── Profile.js      # โปรไฟล์
│   ├── context/
│   │   └── AppContext.js   # Context สำหรับจัดการ State
│   ├── services/
│   │   └── api.js          # API Service
│   ├── App.js              # Component หลัก
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json
├── tailwind.config.js      # Tailwind CSS config
└── README.md
```

## 🎯 ฟีเจอร์ที่แสดงถึงการใช้ JavaScript และ React

### 1. การจัดการ Event และการโต้ตอบ
- การคลิกปุ่ม, การกรอกฟอร์ม
- การจัดการ Mouse Events
- Form Validation และ Error Handling

### 2. การทำงานแบบ Asynchronous
- ใช้ Async/Await สำหรับการเรียก API
- Promise-based operations
- Loading states และ Error handling

### 3. การเชื่อมต่อ API
- Fetch API สำหรับดึงข้อมูลจากภายนอก
- การจัดการ JSON data
- Error handling และ Retry mechanism

### 4. React Components และ State Management
- Reusable Components
- Props และ State management
- React Hooks (useState, useEffect, useContext, useReducer)
- Context API สำหรับการแบ่งปันข้อมูล

### 5. การจัดการข้อมูล
- Local Storage สำหรับการบันทึกข้อมูล
- Form handling และ validation
- Data filtering และ searching

## 🌐 การใช้งาน

### หน้าหลัก (Dashboard)
- ดูภาพรวมงานทั้งหมด
- สถิติการทำงาน
- คำคมแรงบันดาลใจ
- Quick actions

### หน้าจัดการงาน (Tasks)
- เพิ่มงานใหม่
- ค้นหางาน
- ดูรายการงานทั้งหมด
- แก้ไข/ลบงาน

### หน้าคำคม (Quotes)
- ดูคำคมสุ่ม
- บันทึกคำคมที่ชอบ
- ค้นหาคำคม
- ดูคำคมทั้งหมด

### หน้าโปรไฟล์ (Profile)
- แก้ไขข้อมูลส่วนตัว
- ดูสถิติการใช้งาน
- ข้อมูลเกี่ยวกับแอป

## 🔧 การพัฒนาต่อ

### การเพิ่มฟีเจอร์ใหม่
1. สร้าง Component ใหม่ใน `src/components/`
2. เพิ่ม Action ใหม่ใน `AppContext.js`
3. อัปเดต `App.js` เพื่อเพิ่ม Route ใหม่

### การเชื่อมต่อ API ใหม่
1. เพิ่ม method ใหม่ใน `src/services/api.js`
2. เรียกใช้ใน Component ที่ต้องการ
3. จัดการ Loading และ Error states

## 📝 หมายเหตุ

- แอปพลิเคชันนี้ใช้ Local Storage ในการบันทึกข้อมูล
- ข้อมูลจะหายไปเมื่อลบข้อมูลในเบราว์เซอร์
- สำหรับ Production ควรใช้ Database จริง

## 👨‍💻 ผู้พัฒนา

**Nuttapong** - นักเรียนวิชา JavaScript และ React

## 📄 License

MIT License - ดูรายละเอียดในไฟล์ LICENSE

---

🌟 **Dream App** - ทำให้การจัดการงานเป็นเรื่องง่ายและสนุก! 🌟