
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
    name: 'Leadership',
    description: 'ความสามารถในการนำทีมและสร้างแรงบันดาลใจ',
    weight: 20,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'แสดงความรับผิดชอบต่องานของตนเอง',
        behavioral_examples: ['ทำงานที่ได้รับมอบหมายครบถ้วน', 'รายงานผลงานตรงเวลา']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'เริ่มแสดงบทบาทการเป็นผู้นำในงานเล็กๆ',
        behavioral_examples: ['ช่วยเหลือเพื่อนร่วมงาน', 'เสนอแนะแนวทางการทำงาน']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'สามารถนำทีมเล็กในโครงการง่าย',
        behavioral_examples: ['ประสานงานในทีม', 'กระตุ้นให้ทีมทำงานร่วมกัน']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'เป็นผู้นำที่มีประสิทธิภาพในโครงการสำคัญ',
        behavioral_examples: ['วางแผนและดำเนินโครงการใหญ่', 'สร้างแรงบันดาลใจให้ทีม']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'เป็นแบบอย่างด้านการเป็นผู้นำในองค์กร',
        behavioral_examples: ['เป็นที่ปรึกษาผู้นำคนอื่น', 'สร้างวิสัยทัศน์ระยะยาว']
      }
    ]
  },
  {
    id: '2',
    name: 'Communication',
    description: 'ความสามารถในการสื่อสารและถ่ายทอดข้อมูล',
    weight: 25,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'สื่อสารได้ชัดเจนในงานประจำ',
        behavioral_examples: ['พูดและเขียนได้เข้าใจง่าย', 'ตอบคำถามได้ตรงประเด็น']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'สื่อสารได้ดีในสถานการณ์ต่างๆ',
        behavioral_examples: ['นำเสนองานได้ชัดเจน', 'ฟังความคิดเห็นผู้อื่น']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'สื่อสารได้มีประสิทธิภาพกับทุกระดับ',
        behavioral_examples: ['อธิบายเรื่องซับซ้อนได้เข้าใจง่าย', 'เจรจาต่อรองได้']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'เป็นผู้สื่อสารที่มีอิทธิพลและน่าเชื่อถือ',
        behavioral_examples: ['เป็นโฆษกของทีม', 'สร้างความเข้าใจระหว่างฝ่าย']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'เป็นแบบอย่างด้านการสื่อสารในองค์กร',
        behavioral_examples: ['เป็นวิทยากรภายใน', 'สร้างเครือข่ายการสื่อสาร']
      }
    ]
  },
  {
    id: '3',
    name: 'Problem Solving',
    description: 'ความสามารถในการแก้ไขปัญหาและคิดวิเคราะห์',
    weight: 25,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'แก้ปัญหาเบื้องต้นในงานประจำได้',
        behavioral_examples: ['ระบุปัญหาได้ชัดเจน', 'ขอความช่วยเหลือเมื่อจำเป็น']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'วิเคราะห์และแก้ปัญหาระดับกลางได้',
        behavioral_examples: ['หาสาเหตุของปัญหา', 'เสนอทางเลือกในการแก้ไข']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'แก้ปัญหาซับซ้อนได้อย่างมีระบบ',
        behavioral_examples: ['ใช้ข้อมูลในการตัดสินใจ', 'ป้องกันปัญหาล่วงหน้า']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'สร้างนวัตกรรมในการแก้ปัญหา',
        behavioral_examples: ['คิดค้นวิธีการใหม่', 'แก้ปัญหาระดับองค์กร']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'เป็นที่ปรึกษาการแก้ปัญหาระดับสูง',
        behavioral_examples: ['สอนคนอื่นแก้ปัญหา', 'พัฒนาระบบป้องกันปัญหา']
      }
    ]
  },
  {
    id: '4',
    name: 'Teamwork',
    description: 'ความสามารถในการทำงานเป็นทีม',
    weight: 30,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'ทำงานร่วมกับผู้อื่นได้',
        behavioral_examples: ['เข้าร่วมประชุมทีม', 'แบ่งปันข้อมูลกับเพื่อนร่วมงาน']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'มีส่วนร่วมในการทำงานทีม',
        behavioral_examples: ['สนับสนุนเป้าหมายทีม', 'ให้ความช่วยเหลือเพื่อนร่วมงาน']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'เป็นสมาชิกทีมที่มีประสิทธิภาพ',
        behavioral_examples: ['ประสานงานได้ดี', 'สร้างบรรยากาศทำงานที่ดี']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'สร้างความเข้มแข็งให้กับทีม',
        behavioral_examples: ['สร้างความสัมพันธ์ข้ามแผนก', 'พัฒนาทีมให้เก่ง']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'เป็นแบบอย่างการทำงานทีมในองค์กร',
        behavioral_examples: ['สร้างวัฒนธรรมการทำงานทีม', 'เป็นที่ปรึกษาทีมอื่น']
      }
    ]
  }
];

export const DEFAULT_CULTURE_ITEMS: CultureItem[] = [
  {
    id: '1',
    name: 'สัญญา โปร่งใส',
    description: 'การปฏิบัติหน้าที่ด้วยความซื่อสัตย์และส่งมอบงานตามข้อตกลงหรือสัญญาที่ได้ตกลงกันไว้ ด้วยความโปร่งใส',
    weight: 20,
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
    weight: 20,
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
    weight: 20,
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
    weight: 20,
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
    weight: 20,
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
