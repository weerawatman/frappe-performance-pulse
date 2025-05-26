
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
    name: 'Integrity',
    description: 'ความซื่อสัตย์ สุจริต และโปร่งใส',
    weight: 25,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'ปฏิบัติตามกระบวนการและระเบียบขององค์กร',
        behavioral_examples: ['ปฏิบัติตามกฎระเบียบ', 'รายงานข้อมูลตรงความเป็นจริง']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'แสดงความซื่อสัตย์ในการทำงาน',
        behavioral_examples: ['ยอมรับข้อผิดพลาด', 'ไม่นำเอาผลประโยชน์ส่วนตัวมาเกี่ยวข้อง']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'เป็นแบบอย่างด้านความซื่อสัตย์',
        behavioral_examples: ['ตัดสินใจด้วยความยุติธรรม', 'โปร่งใสในการทำงาน']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'สร้างวัฒนธรรมความซื่อสัตย์ในทีม',
        behavioral_examples: ['เป็นที่เชื่อถือของทีม', 'ส่งเสริมความโปร่งใส']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'เป็นผู้นำด้านคุณธรรมในองค์กร',
        behavioral_examples: ['เป็นแบบอย่างความซื่อสัตย์', 'สร้างมาตรฐานจริยธรรม']
      }
    ]
  },
  {
    id: '2',
    name: 'Customer Focus',
    description: 'การให้ความสำคัญกับลูกค้าเป็นอันดับแรก',
    weight: 25,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'ให้บริการลูกค้าตามมาตรฐาน',
        behavioral_examples: ['ตอบสนองความต้องการพื้นฐาน', 'มีมารยาทในการบริการ']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'เข้าใจและตอบสนองความต้องการลูกค้า',
        behavioral_examples: ['สอบถามความต้องการเพิ่มเติม', 'แก้ไขปัญหาของลูกค้า']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'คาดการณ์และตอบสนองความต้องการล่วงหน้า',
        behavioral_examples: ['เสนอแนะโซลูชันเพิ่มเติม', 'สร้างความพึงพอใจเหนือความคาดหวัง']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'สร้างประสบการณ์ที่ยอดเยี่ยมให้ลูกค้า',
        behavioral_examples: ['พัฒนาบริการใหม่สำหรับลูกค้า', 'สร้างความสัมพันธ์ระยะยาว']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'เป็นผู้นำด้านการบริการลูกค้าในองค์กร',
        behavioral_examples: ['พัฒนาวัฒนธรรมการบริการ', 'เป็นแบบอย่างการให้บริการ']
      }
    ]
  },
  {
    id: '3',
    name: 'Innovation',
    description: 'ความคิดสร้างสรรค์และการปรับปรุงอย่างต่อเนื่อง',
    weight: 25,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'เปิดรับความคิดใหม่และการเปลี่ยนแปลง',
        behavioral_examples: ['เรียนรู้วิธีการใหม่', 'ทดลองใช้เครื่องมือใหม่']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'เสนอแนะการปรับปรุงงาน',
        behavioral_examples: ['เสนอไอเดียปรับปรุง', 'ปรับวิธีการทำงานให้ดีขึ้น']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'นำนวัตกรรมมาใช้ในการทำงาน',
        behavioral_examples: ['ใช้เทคโนโลยีใหม่', 'พัฒนาวิธีการทำงานใหม่']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'สร้างนวัตกรรมที่มีผลกระทบต่อองค์กร',
        behavioral_examples: ['พัฒนาผลิตภัณฑ์ใหม่', 'ปรับปรุงระบบงาน']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'เป็นผู้นำด้านนวัตกรรมในองค์กร',
        behavioral_examples: ['สร้างวัฒนธรรมนวัตกรรม', 'เป็นแบบอย่างการคิดสร้างสรรค์']
      }
    ]
  },
  {
    id: '4',
    name: 'Learning Agility',
    description: 'ความสามารถในการเรียนรู้และปรับตัวอย่างรวดเร็ว',
    weight: 25,
    evaluation_levels: [
      {
        level: 1,
        title: 'พื้นฐาน',
        description: 'เรียนรู้ทักษะใหม่ตามที่งานต้องการ',
        behavioral_examples: ['เข้าอบรมตามที่มอบหมาย', 'ศึกษาข้อมูลที่เกี่ยวข้องกับงาน']
      },
      {
        level: 2,
        title: 'พัฒนา',
        description: 'แสวงหาโอกาสในการเรียนรู้',
        behavioral_examples: ['ขอเข้าอบรมเพิ่มเติม', 'ศึกษาจากประสบการณ์ผู้อื่น']
      },
      {
        level: 3,
        title: 'เชี่ยวชาญ',
        description: 'เรียนรู้และนำความรู้มาปรับใช้ได้รวดเร็ว',
        behavioral_examples: ['ประยุกต์ความรู้ในสถานการณ์ใหม่', 'เรียนรู้จากความผิดพลาด']
      },
      {
        level: 4,
        title: 'ขั้นสูง',
        description: 'เป็นผู้เรียนรู้ที่มีประสิทธิภาพและแบ่งปันความรู้',
        behavioral_examples: ['สอนและถ่ายทอดความรู้', 'เป็นผู้นำการเรียนรู้ในทีม']
      },
      {
        level: 5,
        title: 'ผู้เชี่ยวชาญ',
        description: 'เป็นผู้นำด้านการเรียนรู้ในองค์กร',
        behavioral_examples: ['สร้างวัฒนธรรมการเรียนรู้', 'พัฒนาระบบการเรียนรู้']
      }
    ]
  }
];
