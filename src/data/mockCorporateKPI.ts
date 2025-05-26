
export interface CorporateKPIItem {
  id: string;
  category: string;
  name: string;
  description: string;
  target: string;
  weight: number;
  unit: string;
  frequency: 'Monthly' | 'Quarterly' | 'Annually';
  responsible_department: string;
  current_value?: string;
  achievement_percentage?: number;
}

export const mockCorporateKPIData: CorporateKPIItem[] = [
  // Finance Category
  {
    id: '1',
    category: 'Finance',
    name: 'Net Sales SAT console (MB) S+B1+SAA',
    description: 'ยอดขายสุทธิ SAT console รวม S+B1+SAA',
    target: '7,108 MB',
    weight: 15,
    unit: 'MB',
    frequency: 'Monthly',
    responsible_department: 'Finance',
    current_value: '6,200 MB',
    achievement_percentage: 87.2
  },
  {
    id: '2',
    category: 'Finance',
    name: 'Gross Margin (%) S+B1+SAA',
    description: 'อัตรากำไรขั้นต้น S+B1+SAA',
    target: '18.70%',
    weight: 12,
    unit: '%',
    frequency: 'Monthly',
    responsible_department: 'Finance',
    current_value: '17.5%',
    achievement_percentage: 93.6
  },
  {
    id: '3',
    category: 'Finance',
    name: 'Net Profit Margin (%) S+B1+SAA (Inc. share JV)',
    description: 'อัตรากำไรสุทธิ S+B1+SAA รวม share JV',
    target: '8.90%',
    weight: 10,
    unit: '%',
    frequency: 'Monthly',
    responsible_department: 'Finance',
    current_value: '8.1%',
    achievement_percentage: 91.0
  },
  {
    id: '4',
    category: 'Finance',
    name: 'Maintain & New LOI (MB)',
    description: 'การรักษาและสร้าง LOI ใหม่',
    target: 'Maintain LOI 597MB (Isuzu), New LOI 316 MB (Isuzu 66+ Direct Export 250)',
    weight: 8,
    unit: 'MB',
    frequency: 'Quarterly',
    responsible_department: 'Sales',
    current_value: 'Maintain: 580MB, New: 280MB',
    achievement_percentage: 85.0
  },

  // Customer Category
  {
    id: '5',
    category: 'Customer',
    name: 'ICR Customer request (%) S+B1',
    description: 'อัตราการตอบสนองคำขอลูกค้า S+B1',
    target: 'ICR on plan (2 >98%)',
    weight: 12,
    unit: '%',
    frequency: 'Monthly',
    responsible_department: 'Customer Service',
    current_value: '96.5%',
    achievement_percentage: 98.5
  },
  {
    id: '6',
    category: 'Customer',
    name: 'QD score (key customer)',
    description: 'คะแนน QD จากลูกค้าสำคัญ',
    target: 'Q = 100%',
    weight: 10,
    unit: '%',
    frequency: 'Quarterly',
    responsible_department: 'Quality',
    current_value: '98%',
    achievement_percentage: 98.0
  },
  {
    id: '7',
    category: 'Customer',
    name: 'CR activity (MB)',
    description: 'กิจกรรม CR',
    target: '191 MB (2.7% of Net Sales)',
    weight: 8,
    unit: 'MB',
    frequency: 'Monthly',
    responsible_department: 'Sales',
    current_value: '175 MB',
    achievement_percentage: 91.6
  },

  // Strategic Execution & Internal Process Improvement
  {
    id: '8',
    category: 'Strategic Execution & Internal Process Improvement',
    name: 'ESG Performance: % Reduction of Environment S+B1',
    description: 'ผลการดำเนินการ ESG: การลดผลกระทบต่อสิ่งแวดล้อม',
    target: 'GHG -17%, Energy -5%, Water -26%, Waste Haz. -3.5%, Non Haz -13%, Landfill -60%',
    weight: 10,
    unit: '%',
    frequency: 'Quarterly',
    responsible_department: 'ESG',
    current_value: 'GHG -15%, Energy -4%, Water -20%, Waste Haz. -3%, Non Haz -10%, Landfill -50%',
    achievement_percentage: 82.0
  },
  {
    id: '9',
    category: 'Strategic Execution & Internal Process Improvement',
    name: 'Social contribution',
    description: 'การมีส่วนร่วมทางสังคม',
    target: '0.5% of net profit',
    weight: 5,
    unit: '%',
    frequency: 'Quarterly',
    responsible_department: 'ESG',
    current_value: '0.48%',
    achievement_percentage: 96.0
  },
  {
    id: '10',
    category: 'Strategic Execution & Internal Process Improvement',
    name: 'Compliance with Laws and Regulation',
    description: 'การปฏิบัติตามกฎหมายและข้อบังคับ',
    target: 'ไม่เกิดกฎหมายที่เกี่ยวข้องกับด้านงานขององค์กร การเกิด Case ข้อ = 0',
    weight: 8,
    unit: 'cases',
    frequency: 'Quarterly',
    responsible_department: 'Legal',
    current_value: '0',
    achievement_percentage: 100.0
  },
  {
    id: '11',
    category: 'Strategic Execution & Internal Process Improvement',
    name: 'New Product agreement (JV or MOU approval by BOD)',
    description: 'ข้อตกลงผลิตภัณฑ์ใหม่ (JV หรือ MOU ที่ได้รับการอนุมัติจาก BOD)',
    target: 'B2 - JV chinese AL or MOU 1 project',
    weight: 10,
    unit: 'projects',
    frequency: 'Annually',
    responsible_department: 'Business Development',
    current_value: 'In progress',
    achievement_percentage: 60.0
  },
  {
    id: '12',
    category: 'Strategic Execution & Internal Process Improvement',
    name: 'New Product agreement B3(Stron)',
    description: 'ข้อตกลงผลิตภัณฑ์ใหม่ B3(Stron)',
    target: 'Sales 42 MB, NP (5) MB, นำผลิตภัณฑ์มาผลิตจริงใน 1 โครงการ',
    weight: 8,
    unit: 'MB',
    frequency: 'Annually',
    responsible_department: 'Business Development',
    current_value: 'Sales 35 MB, NP 4 MB',
    achievement_percentage: 80.0
  },
  {
    id: '13',
    category: 'Strategic Execution & Internal Process Improvement',
    name: 'New Product agreement G1(SST)',
    description: 'ข้อตกลงผลิตภัณฑ์ใหม่ G1(SST)',
    target: 'G1(SST)',
    weight: 6,
    unit: 'projects',
    frequency: 'Annually',
    responsible_department: 'Business Development',
    current_value: 'In progress',
    achievement_percentage: 65.0
  },
  {
    id: '14',
    category: 'Strategic Execution & Internal Process Improvement',
    name: 'New Product agreement G2(SAA)',
    description: 'ข้อตกลงผลิตภัณฑ์ใหม่ G2(SAA)',
    target: 'Sale 71 MB, NP (12)MB, ได้รับคำสั่งซื้อใหม่อย่างน้อย 20 MB (New) New product/ project 1 project BOD approved',
    weight: 6,
    unit: 'MB',
    frequency: 'Annually',
    responsible_department: 'Business Development',
    current_value: 'Sale 65 MB, NP 10MB, คำสั่งซื้อใหม่ 15 MB',
    achievement_percentage: 85.0
  },
  {
    id: '15',
    category: 'Strategic Execution & Internal Process Improvement',
    name: 'New Product agreement G3(Land)',
    description: 'ข้อตกลงผลิตภัณฑ์ใหม่ G3(Land)',
    target: 'MOU/การสรุปสัญญา การพัฒนาที่ดินระยองอย่างน้อย 1 โครงการ และรักษาสิทธิที่ดินมาบตาพุด',
    weight: 6,
    unit: 'projects',
    frequency: 'Annually',
    responsible_department: 'Business Development',
    current_value: 'อยู่ระหว่างทำ MOU',
    achievement_percentage: 50.0
  },

  // Organization & People Management
  {
    id: '16',
    category: 'Organization & People Mgmt',
    name: 'People Efficiency: Manpower Planning and Control',
    description: 'ประสิทธิภาพด้านบุคลากร: การวางแผนและควบคุมอัตรากำลัง',
    target: 'Net Profit/Employee = 0.33 MB',
    weight: 10,
    unit: 'MB',
    frequency: 'Annually',
    responsible_department: 'HR',
    current_value: '0.30 MB',
    achievement_percentage: 90.9
  },
  {
    id: '17',
    category: 'Organization & People Mgmt',
    name: 'People Capability: Employee Development Level C >80%',
    description: 'ศักยภาพด้านบุคลากร: ระดับการพัฒนาพนักงานระดับ C มากกว่า 80%',
    target: 'Employee Development Level C >80%, (New) Implement /SPS/Lean Manufacturing = 7 Function / 18 line and 438(BU)+162(holding) learner',
    weight: 8,
    unit: '%',
    frequency: 'Annually',
    responsible_department: 'HR',
    current_value: '78%, Implementation in 6 functions, 15 lines',
    achievement_percentage: 92.0
  },
  {
    id: '18',
    category: 'Organization & People Mgmt',
    name: 'People Transformation: Behavior Change to SMART',
    description: 'การเปลี่ยนแปลงบุคลากร: การเปลี่ยนพฤติกรรมเป็น SMART',
    target: 'SMART ≥ 4.0 คะแนนเฉลี่ยของการประเมิน SMART culture (เต็ม 5), Employee Satisfaction >80%',
    weight: 8,
    unit: 'score',
    frequency: 'Annually',
    responsible_department: 'HR',
    current_value: 'SMART = 3.8, Satisfaction = 76%',
    achievement_percentage: 92.0
  },
  {
    id: '19',
    category: 'Organization & People Mgmt',
    name: 'People Continuity (Successor Management with Sustainability career planning)',
    description: 'ความต่อเนื่องด้านบุคลากร: การจัดการผู้สืบทอดตำแหน่งและการวางแผนอาชีพอย่างยั่งยืน',
    target: 'Successor and Development Plan 100%',
    weight: 8,
    unit: '%',
    frequency: 'Annually',
    responsible_department: 'HR',
    current_value: '90%',
    achievement_percentage: 90.0
  },
  {
    id: '20',
    category: 'Organization & People Mgmt',
    name: 'ERP Hana: Go live on plan, Achievement 7 themes from BPI improvements',
    description: 'ERP Hana: การใช้งานตามแผน, ความสำเร็จ 7 ธีมจากการปรับปรุง BPI',
    target: '1. ERP S4/Hana Go live (1 May 2025), 2. Target cost saving 8 MB',
    weight: 8,
    unit: 'MB',
    frequency: 'Annually',
    responsible_department: 'IT',
    current_value: 'On track for May 2025, Cost saving projection 7 MB',
    achievement_percentage: 85.0
  }
];

// Helper function to get data by category
export const getCorporateKPIByCategory = (category: string): CorporateKPIItem[] => {
  return mockCorporateKPIData.filter(item => item.category === category);
};

// Get unique categories
export const getKPICategories = (): string[] => {
  return [...new Set(mockCorporateKPIData.map(item => item.category))];
};

// Calculate overall achievement
export const calculateOverallAchievement = (): number => {
  const totalWeight = mockCorporateKPIData.reduce((sum, item) => sum + item.weight, 0);
  const weightedAchievement = mockCorporateKPIData.reduce(
    (sum, item) => sum + (item.weight * (item.achievement_percentage || 0)), 
    0
  );
  
  return weightedAchievement / totalWeight;
};
