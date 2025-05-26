export interface CompetencyItem {
  id: string;
  name: string;
  description: string;
  weight: number;
  evaluation_levels: EvaluationLevel[];
}

export interface CultureItem {
  id: string;
  name: string;
  description: string;
  weight: number;
  evaluation_levels: EvaluationLevel[];
}

export interface EvaluationLevel {
  level: number;
  title: string;
  description: string;
  behavioral_examples: string[];
}

export interface KPIMerit {
  id: string;
  employee_id: string;
  employee_name: string;
  department: string;
  kpi_achievement_score: number;
  kpi_achievement_weight: number;
  competency_items: CompetencyItem[];
  competency_weight: number;
  culture_items: CultureItem[];
  culture_weight: number;
  total_score: number;
  status: 'Draft' | 'Pending_Approval' | 'Approved' | 'Rejected';
  workflow_step: 'Self' | 'Checker' | 'Approver';
  submitted_date?: Date;
  approved_date?: Date;
  comments?: string;
  history: KPIMeritHistory[];
  created_at: Date;
  modified_at: Date;
}

export interface KPIMeritHistory {
  id: string;
  action: 'Created' | 'Submitted' | 'Approved' | 'Rejected' | 'Modified';
  actor_name: string;
  actor_role: string;
  comments?: string;
  timestamp: Date;
}

export const DEFAULT_COMPETENCY_ITEMS: CompetencyItem[] = [
  {
    id: '1',
    name: 'Strategic Driven Functional Competency',
    description: 'FC49 : การเป็น HR ที่เป็นพันธมิตรที่ดีทางธุรกิจ (HRBP (HR Business Partnership)) นำองค์ความรู้ประกอบการตัดสินใจของผู้บริหาร วิเคราะห์และแก้ปัญหาในการทำงาน บริหารจัดการข้อมูล ให้คำปรึกษางานด้านทรัพยากรบุคคล ค้นหาแนวความคิด องค์ความรู้ ระบบและวิธีการรวมทั้งเครื่องมือในการทำงาน พร้อมส่งต่อความรู้ในงานทรัพยากรบุคคลได้',
    weight: 7.5,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือเริ่มต้น',
        behavioral_examples: ['ผลงาน 60%']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือพื้นฐาน',
        behavioral_examples: ['ผลงาน 60% - 69%']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือพอใช้',
        behavioral_examples: ['ผลงาน 70% - 79%']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือดี',
        behavioral_examples: ['ผลงาน 80% - 89%']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือดีเยี่ยม',
        behavioral_examples: ['ผลงาน 90% ขึ้นไป']
      }
    ]
  },
  {
    id: '2',
    name: 'Strategic Driven Functional Competency',
    description: 'FC50 : การเป็นศูนย์กลางความเป็นเลิศในงาน HR – ด้านการจัดการองค์กร (OD) (COE – Organization (Center of Excellence)) มีความเชี่ยวชาญในสายงานที่ตนรับผิดชอบเพื่อตอบโจทย์ด้านกลยุทธ์ในระดับหน่วยงาน เน้นการคิดแบบ Think Organizationally คาดการณ์และวางแผนรับมือกับการเปลี่ยนแปลง แปลงกลยุทธ์เป็นแผนการปฏิบัติงานในการพัฒนาองค์กรอย่างเป็นรูปธรรม และ ร่วมออกแบบกระบวนการทำงานของฝ่ายต่างๆ',
    weight: 7.5,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือเริ่มต้น',
        behavioral_examples: ['ผลงาน 60%']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือพื้นฐาน',
        behavioral_examples: ['ผลงาน 60% - 69%']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือพอใช้',
        behavioral_examples: ['ผลงาน 70% - 79%']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือดี',
        behavioral_examples: ['ผลงาน 80% - 89%']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือดีเยี่ยม',
        behavioral_examples: ['ผลงาน 90% ขึ้นไป']
      }
    ]
  },
  {
    id: '3',
    name: 'Managerial Competency',
    description: 'MC6 : การวางแผนเชิงกลยุทธ์และผลักดันให้เกิดผลสำเร็จ - กำหนดแนวทางในการจัดการกับปัญหาหรือสถานการณ์ รวมทั้งปรับกลยุทธ์มาใช้ในการทำงานของหน่วยงาน - สนับสนุนการพัฒนากระบวนการจัดทำแผนกลยุทธ์และแผนปฏิบัติการของหน่วยงาน - มอบหมายงานท้าทายที่เหมาะสมให้กับสมาชิกในทีม และกระตุ้นทีมให้มุ่งมั่นเอาชนะอุปสรรคและมีแรงบันดาลใจ - รับฟังและมีสร้างการมีส่วนร่วมของทุกคนในฝ่ายงานให้ผลักดันงานให้สำเร็จ',
    weight: 7.5,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือเริ่มต้น',
        behavioral_examples: ['ผลงาน 60%']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือพื้นฐาน',
        behavioral_examples: ['ผลงาน 60% - 69%']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือพอใช้',
        behavioral_examples: ['ผลงาน 70% - 79%']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือดี',
        behavioral_examples: ['ผลงาน 80% - 89%']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือดีเยี่ยม',
        behavioral_examples: ['ผลงาน 90% ขึ้นไป']
      }
    ]
  },
  {
    id: '4',
    name: 'Managerial Competency',
    description: 'MC4 : การสื่อสารและนำเสนออย่างมีประสิทธิภาพ (Effective Communication & Presentation) สื่อสารและนำเสนองานในระดับหน่วยงาน หรือเป็นตัวแทนในการนำเสนอผลงาน/โครงการของหน่วยงานและเจรจาต่อรองกับผู้เกี่ยวข้องในระดับหน่วยงานให้สามารถบรรลุเป้าหมายที่ตั้งไว้ มีความเข้าใจความเหมาะสมของสถานการณ์และสามารถสื่อสารประเด็นที่มีความซับซ้อนในระดับหน่วยงานได้ โดยสามารถสื่อสารภาษาต่างประเทศได้ในหน่วยงานที่ต้องติดต่อสื่อสารกับลูกค้าต่างประเทศ',
    weight: 7.5,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือเริ่มต้น',
        behavioral_examples: ['ผลงาน 60%']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือพื้นฐาน',
        behavioral_examples: ['ผลงาน 60% - 69%']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือพอใช้',
        behavioral_examples: ['ผลงาน 70% - 79%']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือดี',
        behavioral_examples: ['ผลงาน 80% - 89%']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'ความรู้/ความเข้าใจ/ใช้เครื่องมือดีเยี่ยม',
        behavioral_examples: ['ผลงาน 90% ขึ้นไป']
      }
    ]
  }
];

export const DEFAULT_CULTURE_ITEMS: CultureItem[] = [
  {
    id: '1',
    name: 'สัญญา โปร่งใส',
    description: 'การปฏิบัติหน้าที่ด้วยความซื่อสัตย์และส่งมอบงานตามข้อตกลงหรือสัญญาที่ได้ตกลงกันไว้ ด้วยความโปร่งใส',
    weight: 6,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'ปฏิบัติตามข้อตกลงพื้นฐานในการทำงาน',
        behavioral_examples: ['ทำงานตามเวลาที่กำหนด', 'ส่งงานตามกำหนดเวลา', 'รายงานความจริงเบื้องต้น']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'แสดงความซื่อสัตย์และปฏิบัติตามข้อตกลงอย่างสม่ำเสมอ',
        behavioral_examples: ['ยอมรับข้อผิดพลาดและแก้ไข', 'รักษาคำมั่นสัญญาที่ให้ไว้', 'โปร่งใสในการสื่อสาร']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'เป็นแบบอย่างด้านความซื่อสัตย์และความโปร่งใส',
        behavioral_examples: ['ตัดสินใจด้วยความยุติธรรม', 'แบ่งปันข้อมูลอย่างโปร่งใส', 'รักษามาตรฐานจริยธรรม']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'สร้างวัฒนธรรมความซื่อสัตย์และโปร่งใสในทีม',
        behavioral_examples: ['ส่งเสริมความโปร่งใสในทีม', 'เป็นที่เชื่อถือของเพื่อนร่วมงาน', 'สร้างข้อตกลงที่ชัดเจน']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'เป็นผู้นำด้านจริยธรรมและความโปร่งใสในองค์กร',
        behavioral_examples: ['สร้างมาตรฐานจริยธรรมสูง', 'เป็นแบบอย่างความซื่อสัตย์', 'พัฒนาระบบโปร่งใส']
      }
    ]
  },
  {
    id: '2',
    name: 'ใส่ใจเรียนรู้',
    description: 'การตั้งใจเรียนรู้สิ่งใหม่ๆ รวมถึงเทคโนโลยี และนำมาใช้ปรับปรุง พัฒนา การทำงาน บริการ หรือผลิตภัณฑ์ ให้ดีขึ้นอย่างต่อเนื่อง',
    weight: 6,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'เปิดรับการเรียนรู้ทักษะและเทคโนโลยีใหม่',
        behavioral_examples: ['เข้าร่วมการอบรมที่จัดให้', 'ศึกษาเทคโนโลยีใหม่เบื้องต้น', 'ติดตามข่าวสารในสายงาน']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'แสวงหาความรู้ใหม่และนำมาประยุกต์ใช้ในงาน',
        behavioral_examples: ['หาแหล่งเรียนรู้เพิ่มเติม', 'ทดลองใช้เครื่องมือใหม่', 'ปรับปรุงวิธีการทำงาน']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'เรียนรู้อย่างต่อเนื่องและนำเทคโนโลยีมาใช้อย่างมีประสิทธิภาพ',
        behavioral_examples: ['ใช้เทคโนโลยีเพิ่มประสิทธิภาพ', 'แบ่งปันความรู้ให้ทีม', 'สร้างนวัตกรรมเล็กๆ']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'เป็นผู้นำการเรียนรู้และการใช้เทคโนโลยีในทีม',
        behavioral_examples: ['สอนและพัฒนาทีม', 'นำเทคโนโลยีใหม่มาใช้', 'สร้างการเปลี่ยนแปลงเชิงบวก']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'สร้างวัฒนธรรมการเรียนรู้และการใช้เทคโนโลยีในองค์กร',
        behavioral_examples: ['พัฒนาระบบการเรียนรู้', 'เป็นผู้เชี่ยวชาญด้านเทคโนโลยี', 'ขับเคลื่อนการเปลี่ยนแปลงองค์กร']
      }
    ]
  },
  {
    id: '3',
    name: 'สู่การเปลี่ยนแปลง',
    description: 'การเปิดรับสิ่งใหม่ วางแผนปรับตัว เตรียมความพร้อมสำหรับการเปลี่ยนแปลงอย่างรวดเร็ว',
    weight: 6,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'เปิดรับและปรับตัวกับการเปลี่ยนแปลงเบื้องต้น',
        behavioral_examples: ['ยอมรับการเปลี่ยนแปลงในงาน', 'เรียนรู้วิธีการใหม่', 'ปรับตัวตามสถานการณ์']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'แสวงหาและวางแผนสำหรับการเปลี่ยนแปลง',
        behavioral_examples: ['ติดตามแนวโน้มการเปลี่ยนแปลง', 'เตรียมแผนรองรับ', 'ปรับวิธีการทำงาน']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'ปรับตัวได้รวดเร็วและช่วยทีมรับมือการเปลี่ยนแปลง',
        behavioral_examples: ['ปรับตัวได้เร็วและดี', 'ช่วยเหลือทีมในการปรับตัว', 'คาดการณ์การเปลี่ยนแปลง']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'เป็นผู้นำการเปลี่ยนแปลงและสร้างความพร้อมให้ทีม',
        behavioral_examples: ['นำการเปลี่ยนแปลงในทีม', 'สร้างแผนรองรับที่ดี', 'พัฒนาความยืดหยุ่นของทีม']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'ขับเคลื่อนการเปลี่ยนแปลงและสร้างวัฒนธรรมความยืดหยุ่น',
        behavioral_examples: ['สร้างวิสัยทัศน์การเปลี่ยนแปลง', 'พัฒนาองค์กรให้ยืดหยุ่น', 'เป็นแบบอย่างการปรับตัว']
      }
    ]
  },
  {
    id: '4',
    name: 'แสดงการยอมรับ',
    description: 'การยอมรับความแตกต่าง และเปิดใจรับฟังความคิดเห็นของทุกคนในทีมเพื่อหาแนวทางที่ดีที่สุดในการแก้ไขปัญหา',
    weight: 6,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'แสดงความเคารพและยอมรับความแตกต่างพื้นฐาน',
        behavioral_examples: ['เคารพความคิดเห็นผู้อื่น', 'ไม่แสดงอคติ', 'ทำงานกับคนที่แตกต่างได้']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'เปิดใจรับฟังและแสวงหาความหลากหลายในมุมมอง',
        behavioral_examples: ['ขอความคิดเห็นจากผู้อื่น', 'รับฟังอย่างตั้งใจ', 'ชื่นชมความแตกต่าง']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'ใช้ความหลากหลายในการแก้ปัญหาและสร้างผลงาน',
        behavioral_examples: ['รวบรวมความคิดเห็นหลากหลาย', 'สร้างทีมที่หลากหลาย', 'แก้ปัญหาด้วยมุมมองต่างๆ']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'สร้างสภาพแวดล้อมที่เอื้อต่อความหลากหลายและการมีส่วนร่วม',
        behavioral_examples: ['ส่งเสริมการมีส่วนร่วม', 'สร้างบรรยากาศยอมรับ', 'ใช้ประโยชน์จากความแตกต่าง']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'เป็นผู้นำในการสร้างวัฒนธรรมการยอมรับและความหลากหลาย',
        behavioral_examples: ['สร้างนโยบายความหลากหลาย', 'เป็นแบบอย่างการยอมรับ', 'พัฒนาองค์กรให้ครอบคลุม']
      }
    ]
  },
  {
    id: '5',
    name: 'สนับสนุนลูกค้า',
    description: 'การทำความเข้าใจความคาดหวังของลูกค้า (ทั้งภายในและภายนอก) อย่างถ่องแท้ และใส่ใจในคุณค่าของงานและบริการที่ส่งมอบให้ลูกค้า',
    weight: 6,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'เข้าใจและตอบสนองความต้องการพื้นฐานของลูกค้า',
        behavioral_examples: ['ให้บริการด้วยมารยาท', 'ตอบสนองความต้องการตามมาตรฐาน', 'รับฟังปัญหาลูกค้า']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'แสวงหาความเข้าใจลูกค้าและสร้างคุณค่าเพิ่ม',
        behavioral_examples: ['สอบถามความต้องการเพิ่มเติม', 'เสนอแนะทางเลือก', 'ติดตามความพึงพอใจ']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'คาดการณ์และสร้างประสบการณ์ที่ดีให้ลูกค้า',
        behavioral_examples: ['คาดการณ์ความต้องการ', 'สร้างประสบการณ์เหนือความคาดหวัง', 'แก้ปัญหาเชิงรุก']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'พัฒนาระบบและกระบวนการที่เน้นลูกค้าเป็นศูนย์กลาง',
        behavioral_examples: ['พัฒนากระบวนการใหม่', 'สร้างความสัมพันธ์ระยะยาว', 'นำเสนอนวัตกรรมสำหรับลูกค้า']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'สร้างวัฒนธรรมการให้ความสำคัญลูกค้าในองค์กร',
        behavioral_examples: ['สร้างวิสัยทัศน์เน้นลูกค้า', 'พัฒนาวัฒนธรรมบริการ', 'เป็นแบบอย่างการใส่ใจลูกค้า']
      }
    ]
  }
];
