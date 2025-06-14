// Configuration สำหรับเว็บไซต์ ITA
const CONFIG = {
    // ข้อมูลองค์กร
    ORGANIZATION: {
        NAME: 'วิทยาลัยอาชีวศึกษาอุดรธานี', // แก้ไข typo
        NAME_EN: 'Udon Thani Vocational College',
        TYPE: 'สถาบันการศึกษา',
        MINISTRY: 'สำนักงานคณะกรรมการการอาชีวศึกษา'
    },

    // ข้อมูลการติดต่อ
    CONTACT: {
        ADDRESS: 'เลขที่ 8 ถ.โพศรี ต.หมากแข้ง อ.เมืองฯ จ.อุดรธานี 41000',
        LOCATION: 'CQ5H+XPQ ตำบล บ้านเลื่อม อำเภอเมืองอุดรธานี อุดรธานี 41000',
        PHONE: '042-246-690',
        FAX: '042-243-236',
        EMAIL: 'udvc@udvc.ac.th',
        EMAIL_LIBRARY: 'Sarabun@gsuite.udvc.ac.th',
        WEBSITE: 'https://www.udvc.ac.th',
        FACEBOOK: 'https://www.facebook.com/UDVCrcheewaudon/',
        GOOGLE_MAP: 'https://maps.google.com/?q=CQ5H+XPQ+ตำบล+บ้านเลื่อม+อำเภอเมืองอุดรธานี+อุดรธานี+41000'
    },

    // ข้อมูลการประเมิน ITA
    ASSESSMENT: {
        CURRENT_YEAR: '2567',
        CURRENT_YEAR_BE: '2567',
        LAST_ASSESSED_YEAR: '2566', // ปีที่ถูกประเมินล่าสุด
        HAS_BEEN_ASSESSED: false, // เปลี่ยนเป็น true เมื่อมีการประเมินแล้ว
        
        // คะแนนการประเมิน (จะแสดงเมื่อ HAS_BEEN_ASSESSED = true)
        SCORES: {
            TOTAL_SCORE: 86.73,
            GRADE: 'A',
            GRADE_TEXT: 'ระดับดี',
            
            // คะแนนรายตัวชี้วัด
            INDICATORS: {
                1: { name: 'การปฏิบัติหน้าที่', score: 85.21 },
                2: { name: 'การใช้งบประมาณ', score: 70.59 },
                3: { name: 'การใช้อำนาจ', score: 75.10 },
                4: { name: 'การใช้ทรัพย์สินของราชการ', score: 72.88 },
                5: { name: 'การแก้ไขปัญหาการทุจริต', score: 73.24 },
                6: { name: 'คุณภาพการดำเนินงาน', score: 81.14 },
                7: { name: 'ประสิทธิภาพการสื่อสาร', score: 83.12 },
                8: { name: 'การปรับปรุงการทำงาน', score: 76.79 },
                9: { name: 'การเปิดเผยข้อมูล', score: 100.00 },
                10: { name: 'การป้องกันการทุจริต', score: 100.00 }
            }
        }
    },

    // ข้อมูลระบบ ITAS
    ITAS_INFO: {
        FULL_NAME: 'Integrity and Transparency Assessment System',
        DESCRIPTION: 'ระบบเทคโนโลยีสารสนเทศที่ใช้ในการประเมินคุณธรรมและความโปร่งใสในการดำเนินงานของหน่วยงานภาครัฐ',
        URL: 'https://itas.nacc.go.th'
    },

    // การตั้งค่าเว็บไซต์
    WEBSITE: {
        TITLE: 'ITA - การประเมินคุณธรรมและความโปร่งใส',
        DESCRIPTION: 'เว็บไซต์การประเมินคุณธรรมและความโปร่งใสในการดำเนินงาน',
        KEYWORDS: 'ITA, คุณธรรม, ความโปร่งใส, ป้องกันทุจริต',
        THEME_COLOR: '#dc143c'
    },

    // ลิงก์ที่เกี่ยวข้อง
    RELATED_LINKS: {
        NACC: 'https://www.nacc.go.th',
        ITAS: 'https://itas.nacc.go.th',
        MINISTRY: 'https://www.vec.go.th',
        TRANSPARENCY: 'https://www.transparency.org'
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}