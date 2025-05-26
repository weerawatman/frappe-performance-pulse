
export interface CorporateKPI {
  id: string;
  category: string;
  name: string;
  description: string;
  target: string;
  weight: number;
  measurement_method: string;
  frequency: string;
  data_source: string;
  formula?: string;
  threshold_green?: number;
  threshold_yellow?: number;
  threshold_red?: number;
  achievement_percentage?: number;
  actual_result?: string;
  variance?: number;
  trend?: 'up' | 'down' | 'stable';
  last_updated?: Date;
  responsible_person?: string;
  status?: 'on_track' | 'at_risk' | 'off_track';
  current_value?: string;
}

export const mockCorporateKPIData: CorporateKPI[] = [
  {
    id: '1',
    category: 'Financial Performance',
    name: 'เพิ่มรายได้องค์กร',
    description: 'เติบโตรายได้รวมขององค์กรเทียบกับปีที่แล้ว',
    target: '7,108 MB Net Sales',
    weight: 15,
    measurement_method: 'การคำนวณจากข้อมูลการขาย',
    frequency: 'Monthly',
    data_source: 'ระบบ SAP',
    achievement_percentage: 87.2,
    actual_result: '6,195 MB',
    variance: -12.8,
    trend: 'up',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP Sales & Marketing',
    status: 'at_risk'
  },
  {
    id: '2',
    category: 'Financial Performance',
    name: 'อัตรากำไรขั้นต้น',
    description: 'รักษาระดับอัตรากำไรขั้นต้นให้อยู่ในเป้าหมาย',
    target: '18.70% Gross Margin',
    weight: 10,
    measurement_method: 'การคำนวณจากต้นทุนและรายได้',
    frequency: 'Monthly',
    data_source: 'ระบบ SAP',
    achievement_percentage: 93.6,
    actual_result: '17.51%',
    variance: -6.4,
    trend: 'stable',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP Finance',
    status: 'on_track'
  },
  {
    id: '3',
    category: 'Financial Performance',
    name: 'อัตรากำไรสุทธิ',
    description: 'บรรลุเป้าหมายอัตรากำไรสุทธิ',
    target: '8.90% Net Profit Margin',
    weight: 10,
    measurement_method: 'การคำนวณกำไรสุทธิต่อรายได้',
    frequency: 'Monthly',
    data_source: 'ระบบ SAP',
    achievement_percentage: 91.0,
    actual_result: '8.10%',
    variance: -9.0,
    trend: 'down',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP Finance',
    status: 'at_risk'
  },
  {
    id: '4',
    category: 'Customer Excellence',
    name: 'การขยายฐานลูกค้า',
    description: 'เพิ่มจำนวนลูกค้าใหม่และ LOI',
    target: 'New LOI 316 MB',
    weight: 8,
    measurement_method: 'การนับจำนวน LOI และมูลค่า',
    frequency: 'Monthly',
    data_source: 'CRM System',
    achievement_percentage: 75.5,
    actual_result: '238 MB',
    variance: -24.5,
    trend: 'up',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP Sales & Marketing',
    status: 'at_risk'
  },
  {
    id: '5',
    category: 'Operational Excellence',
    name: 'ประสิทธิภาพการผลิต',
    description: 'รักษาประสิทธิภาพการผลิตให้อยู่ในระดับสูง',
    target: 'ICR >98%',
    weight: 8,
    measurement_method: 'การคำนวณจากข้อมูลการผลิต',
    frequency: 'Daily',
    data_source: 'Production System',
    achievement_percentage: 96.5,
    actual_result: '94.67%',
    variance: -3.5,
    trend: 'stable',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP Operations',
    status: 'on_track'
  },
  {
    id: '6',
    category: 'Operational Excellence',
    name: 'คุณภาพผลิตภัณฑ์',
    description: 'รักษาคุณภาพผลิตภัณฑ์ให้อยู่ในมาตรฐาน',
    target: 'QD Score 100%',
    weight: 7,
    measurement_method: 'การตรวจสอบคุณภาพผลิตภัณฑ์',
    frequency: 'Daily',
    data_source: 'Quality System',
    achievement_percentage: 98.0,
    actual_result: '98%',
    variance: -2.0,
    trend: 'up',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP Operations',
    status: 'on_track'
  },
  {
    id: '7',
    category: 'Customer Excellence',
    name: 'ความพึงพอใจลูกค้า',
    description: 'รักษาระดับความพึงพอใจของลูกค้า',
    target: '>95% Customer Satisfaction',
    weight: 7,
    measurement_method: 'การสำรวจความพึงพอใจลูกค้า',
    frequency: 'Quarterly',
    data_source: 'Survey System',
    achievement_percentage: 94.2,
    actual_result: '89.5%',
    variance: -5.8,
    trend: 'down',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP Sales & Marketing',
    status: 'at_risk'
  },
  {
    id: '8',
    category: 'Sustainability',
    name: 'การจัดการด้านสิ่งแวดล้อม',
    description: 'ลดผลกระทบต่อสิ่งแวดล้อม',
    target: 'Carbon Footprint -10%',
    weight: 6,
    measurement_method: 'การวัดปริมาณก๊าซเรือนกระจก',
    frequency: 'Monthly',
    data_source: 'Environmental System',
    achievement_percentage: 82.0,
    actual_result: '-8.2%',
    variance: -18.0,
    trend: 'up',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP Operations',
    status: 'at_risk'
  },
  {
    id: '9',
    category: 'Sustainability',
    name: 'การจัดการด้านสังคม',
    description: 'ส่งเสริมความรับผิดชอบต่อสังคม',
    target: 'CSR Projects 5 Projects',
    weight: 5,
    measurement_method: 'การนับจำนวนโครงการ CSR',
    frequency: 'Quarterly',
    data_source: 'CSR System',
    achievement_percentage: 80.0,
    actual_result: '4 Projects',
    variance: -20.0,
    trend: 'stable',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP HR',
    status: 'at_risk'
  },
  {
    id: '10',
    category: 'Sustainability',
    name: 'การกำกับดูแลกิจการ',
    description: 'เสริมสร้างธรรมาภิบาลในองค์กร',
    target: 'Governance Score >85',
    weight: 5,
    measurement_method: 'การประเมินธรรมาภิบาล',
    frequency: 'Annually',
    data_source: 'Governance System',
    achievement_percentage: 88.0,
    actual_result: '74.8',
    variance: -12.0,
    trend: 'up',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'CEO',
    status: 'on_track'
  },
  {
    id: '11',
    category: 'Innovation & Growth',
    name: 'การพัฒนาผลิตภัณฑ์ใหม่',
    description: 'เพิ่มรายได้จากผลิตภัณฑ์ใหม่',
    target: 'New Product Revenue 5%',
    weight: 4,
    measurement_method: 'การคำนวณรายได้จากผลิตภัณฑ์ใหม่',
    frequency: 'Quarterly',
    data_source: 'Product System',
    achievement_percentage: 60.0,
    actual_result: '3%',
    variance: -40.0,
    trend: 'down',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP Technology',
    status: 'off_track'
  },
  {
    id: '12',
    category: 'Innovation & Growth',
    name: 'การลงทุนในเทคโนโลยี',
    description: 'เพิ่มการลงทุนในเทคโนโลยีใหม่',
    target: 'Tech Investment 50MB',
    weight: 4,
    measurement_method: 'การรวมงบลงทุนเทคโนโลยี',
    frequency: 'Quarterly',
    data_source: 'Finance System',
    achievement_percentage: 85.0,
    actual_result: '42.5 MB',
    variance: -15.0,
    trend: 'up',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP Technology',
    status: 'on_track'
  },
  {
    id: '13',
    category: 'Innovation & Growth',
    name: 'การขยายตลาดใหม่',
    description: 'เข้าสู่ตลาดใหม่และขยายธุรกิจ',
    target: 'New Market Entry 2 Markets',
    weight: 3,
    measurement_method: 'การนับจำนวนตลาดใหม่',
    frequency: 'Annually',
    data_source: 'Business Development',
    achievement_percentage: 50.0,
    actual_result: '1 Market',
    variance: -50.0,
    trend: 'stable',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP Sales & Marketing',
    status: 'off_track'
  },
  {
    id: '14',
    category: 'Innovation & Growth',
    name: 'การพันธมิตรทางธุรกิจ',
    description: 'สร้างพันธมิตรเชิงกลยุทธ์',
    target: 'Strategic Partnership 3 Partners',
    weight: 3,
    measurement_method: 'การนับจำนวนพันธมิตร',
    frequency: 'Annually',
    data_source: 'Business Development',
    achievement_percentage: 66.7,
    actual_result: '2 Partners',
    variance: -33.3,
    trend: 'up',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'CEO',
    status: 'at_risk'
  },
  {
    id: '15',
    category: 'Innovation & Growth',
    name: 'การวิจัยและพัฒนา',
    description: 'เพิ่มการลงทุนในการวิจัยและพัฒนา',
    target: 'R&D Investment 2% of Revenue',
    weight: 3,
    measurement_method: 'การคำนวณสัดส่วน R&D ต่อรายได้',
    frequency: 'Quarterly',
    data_source: 'Finance System',
    achievement_percentage: 75.0,
    actual_result: '1.5%',
    variance: -25.0,
    trend: 'up',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP Technology',
    status: 'at_risk'
  },
  {
    id: '16',
    category: 'People & Culture',
    name: 'ประสิทธิภาพของบุคลากร',
    description: 'เพิ่มประสิทธิภาพการทำงานของพนักงาน',
    target: '0.33 MB Net Profit/Employee',
    weight: 3,
    measurement_method: 'การคำนวณกำไรต่อพนักงาน',
    frequency: 'Quarterly',
    data_source: 'HR System',
    achievement_percentage: 90.9,
    actual_result: '0.30 MB',
    variance: -9.1,
    trend: 'up',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP HR',
    status: 'on_track'
  },
  {
    id: '17',
    category: 'People & Culture',
    name: 'การพัฒนาพนักงาน',
    description: 'เพิ่มศักยภาพของพนักงาน',
    target: 'Level C >80%',
    weight: 3,
    measurement_method: 'การประเมินระดับความสามารถ',
    frequency: 'Annually',
    data_source: 'HR System',
    achievement_percentage: 92.0,
    actual_result: '73.6%',
    variance: -8.0,
    trend: 'up',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP HR',
    status: 'on_track'
  },
  {
    id: '18',
    category: 'People & Culture',
    name: 'วัฒนธรรมองค์กร',
    description: 'ส่งเสริมวัฒนธรรม SMART',
    target: 'SMART ≥4.0, Satisfaction >80%',
    weight: 2,
    measurement_method: 'การสำรวจวัฒนธรรมองค์กร',
    frequency: 'Annually',
    data_source: 'HR System',
    achievement_percentage: 92.0,
    actual_result: 'SMART 3.68, Satisfaction 73.6%',
    variance: -8.0,
    trend: 'stable',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP HR',
    status: 'at_risk'
  },
  {
    id: '19',
    category: 'People & Culture',
    name: 'การวางแผนสืบทอดตำแหน่ง',
    description: 'จัดเตรียมผู้สืบทอดตำแหน่งสำคัญ',
    target: '100% Successor Plan',
    weight: 2,
    measurement_method: 'การนับจำนวนแผนสืบทอด',
    frequency: 'Annually',
    data_source: 'HR System',
    achievement_percentage: 90.0,
    actual_result: '90%',
    variance: -10.0,
    trend: 'up',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP HR',
    status: 'on_track'
  },
  {
    id: '20',
    category: 'Operational Excellence',
    name: 'การปรับปรุงกระบวนการ',
    description: 'ลดต้นทุนและเพิ่มประสิทธิภาพ',
    target: 'Cost Saving 8MB',
    weight: 2,
    measurement_method: 'การคำนวณการประหยัดต้นทุน',
    frequency: 'Quarterly',
    data_source: 'Operations System',
    achievement_percentage: 87.5,
    actual_result: '7 MB',
    variance: -12.5,
    trend: 'up',
    last_updated: new Date('2024-12-15'),
    responsible_person: 'VP Operations',
    status: 'on_track'
  }
];

export const calculateOverallAchievement = (): number => {
  const totalWeightedScore = mockCorporateKPIData.reduce((sum, kpi) => {
    return sum + ((kpi.achievement_percentage || 0) * kpi.weight / 100);
  }, 0);
  
  const totalWeight = mockCorporateKPIData.reduce((sum, kpi) => sum + kpi.weight, 0);
  
  return totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0;
};

export const getKPICategories = (): string[] => {
  const categories = new Set(mockCorporateKPIData.map(kpi => kpi.category));
  return Array.from(categories);
};

export const getCorporateKPIByCategory = (category: string): CorporateKPI[] => {
  return mockCorporateKPIData.filter(kpi => kpi.category === category);
};
