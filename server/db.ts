import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User';
import { StudentRegistration } from './models/StudentRegistration';
import { DepartmentSetting } from './models/DepartmentSetting';
import { Announcement } from './models/Announcement';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/finote_teguhan';

export let isConnectedToMongoDB = false;

export async function connectDB(): Promise<boolean> {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnectedToMongoDB = true;
    console.log(`[MongoDB] Connected successfully to: ${MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@')}`);
    await seedInitialData();
    return true;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn(`[MongoDB Notice] Could not connect to MongoDB server: ${errorMsg}`);
    console.log(`[MongoDB Tip] You can connect to MongoDB Atlas by adding your MONGODB_URI in the .env file.`);
    console.log(`[Storage] Falling back to high-performance local document persistence.`);
    isConnectedToMongoDB = false;
    return false;
  }
}

async function seedInitialData() {
  try {
    // 1. Seed Users if empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create([
        {
          name: "ሥራ አመራር ክፍል (ዋና አስተዳደር)",
          email: "leadership@finoteteguhan.org",
          role: "leadership",
          departmentId: "leadership",
          departmentNameAm: "ሥራ አመራር ክፍል",
          departmentNameEn: "Executive Leadership",
          phone: "+251 91 123 4567"
        },
        {
          name: "መምህር ተስፋዬ (የትምህርት ክፍል ኃላፊ)",
          email: "education@finoteteguhan.org",
          role: "dept_admin",
          departmentId: "education",
          departmentNameAm: "ትምህርትና ስልጠና ክፍል",
          departmentNameEn: "Education & Training",
          phone: "+251 91 234 5678"
        },
        {
          name: "እህት ጽዮን (የሕፃናት ክፍል አስተባባሪ)",
          email: "children@finoteteguhan.org",
          role: "dept_admin",
          departmentId: "children",
          departmentNameAm: "ሕጻናት ክፍል",
          departmentNameEn: "Children Sunday School",
          phone: "+251 91 345 6789"
        },
        {
          name: "ዘማሪ አማኑኤል (የመዝሙር ክፍል መሪ)",
          email: "choir@finoteteguhan.org",
          role: "dept_admin",
          departmentId: "choir",
          departmentNameAm: "መዝሙር ክፍል",
          departmentNameEn: "Sacred Choir & Hymnody",
          phone: "+251 91 456 7890"
        },
        {
          name: "ዮሐንስ ተስፋዬ",
          email: "student@finoteteguhan.org",
          role: "student",
          studentId: "FT-849201",
          christianName: "ገብረ ሚካኤል",
          departmentId: "children",
          phone: "0911223344"
        }
      ]);
      console.log("[MongoDB] Seeded default users (Leadership, Education, Children, Choir, Student).");
    }

    // 2. Seed Announcement if empty
    const annCount = await Announcement.countDocuments();
    if (annCount === 0) {
      await Announcement.create({
        enabled: true,
        badgeAm: "አስቸኳይ ማስታወቂያ",
        badgeEn: "PARISH NOTICE",
        textAm: "የ2026/2027 ዓ.ም አዲስ የሰንበት ት/ቤት ተማሪዎች ምዝገባ በይፋ ተጀምሯል! በድረ-ገጻችን አሁኑኑ ይመዝገቡ።",
        textEn: "Enrollment for the 2026/2027 Sunday School Academic Year is now open! Register online today.",
        updatedBy: "ሥራ አመራር ክፍል"
      });
      console.log("[MongoDB] Seeded initial parish announcement.");
    }

    // 3. Seed Registrations if empty
    const regCount = await StudentRegistration.countDocuments();
    if (regCount === 0) {
      await StudentRegistration.create([
        {
          regCode: "FT-849201",
          fullName: "ዮሐንስ ተስፋዬ ገብሬ",
          christianName: "ገብረ ሚካኤል",
          age: 6,
          gender: "male",
          phone: "0911223344",
          address: "ላፍቶ፣ ወረዳ 01",
          category: "children",
          departmentId: "children",
          status: "enrolled",
          notes: "ለማቴዎስ ምድብ ተመድቧል"
        },
        {
          regCode: "FT-731920",
          fullName: "ሜሮን አለሙ በቀለ",
          christianName: "ወለተ ማርያም",
          age: 10,
          gender: "female",
          phone: "0922334455",
          address: "ጀሞ 1፣ ንፋስ ስልክ",
          category: "children",
          departmentId: "children",
          status: "approved",
          notes: "ለማርቆስ ምድብ ተመድባለች"
        },
        {
          regCode: "FT-612984",
          fullName: "ዳዊት ኃይሉ ተመስገን",
          christianName: "ኃይለ ጊዮርጊስ",
          age: 21,
          gender: "male",
          phone: "0933445566",
          address: "ለቡ መብራት ኃይል",
          category: "choir",
          departmentId: "choir",
          status: "pending",
          notes: "የበገናና የከበሮ ተሰጥኦ ፈተና ይጠብቃል"
        }
      ]);
      console.log("[MongoDB] Seeded sample student registrations.");
    }
  } catch (err) {
    console.error("[MongoDB] Seeding error:", err);
  }
}
