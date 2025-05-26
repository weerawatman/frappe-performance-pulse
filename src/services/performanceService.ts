import { 
  AppraisalTemplate, 
  AppraisalCycle, 
  Appraisal, 
  EmployeePerformanceFeedback,
  Employee,
  PerformanceStats 
} from '@/types/performance';
import { calculateAllScores } from '@/utils/performanceScoring';

// Mock data for employees
const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'สมชาย ใจดี',
    email: 'somchai@company.com',
    department: 'IT',
    position: 'Senior Developer',
    employee_id: 'EMP001',
    join_date: new Date('2022-01-15')
  },
  {
    id: '2',
    name: 'สมหญิง รักษ์ดี',
    email: 'somying@company.com',
    department: 'Sales',
    position: 'Sales Manager',
    employee_id: 'EMP002',
    join_date: new Date('2021-06-10')
  },
  {
    id: '3',
    name: 'วิชัย เก่งมาก',
    email: 'vichai@company.com',
    department: 'Marketing',
    position: 'Marketing Specialist',
    employee_id: 'EMP003',
    join_date: new Date('2023-03-20')
  },
  {
    id: '4',
    name: 'อำนาจ กล้าหาญ',
    email: 'amnaj@company.com',
    department: 'HR',
    position: 'HR Officer',
    employee_id: 'EMP004',
    join_date: new Date('2022-08-05')
  },
  {
    id: '5',
    name: 'สุดา เฉียบแหลม',
    email: 'suda@company.com',
    department: 'Finance',
    position: 'Financial Analyst',
    employee_id: 'EMP005',
    join_date: new Date('2021-11-30')
  }
];

export class PerformanceService {
  private static instance: PerformanceService;
  private templates: AppraisalTemplate[] = [];
  private cycles: AppraisalCycle[] = [];
  private appraisals: Appraisal[] = [];
  private feedbacks: EmployeePerformanceFeedback[] = [];
  private employees: Employee[] = mockEmployees;

  private constructor() {
    this.initializeMockData();
  }

  static getInstance(): PerformanceService {
    if (!PerformanceService.instance) {
      PerformanceService.instance = new PerformanceService();
    }
    return PerformanceService.instance;
  }

  private initializeMockData() {
    // Initialize with some mock templates
    this.templates = [
      {
        id: '1',
        name: 'เทมเพลตมาตรฐาน - พนักงานทั่วไป',
        description: 'เทมเพลตสำหรับการประเมินพนักงานทั่วไป',
        goals: [
          {
            id: '1',
            kra: 'ความสำเร็จในงาน',
            description: 'การบรรลุเป้าหมายงานที่ได้รับมอบหมาย',
            weightage: 40,
            target: 'บรรลุเป้าหมาย 100%',
            measurement_criteria: 'วัดจากผลงานที่ส่งมอบ'
          },
          {
            id: '2',
            kra: 'คุณภาพงาน',
            description: 'ความถูกต้องและคุณภาพของงาน',
            weightage: 30,
            target: 'ความถูกต้อง 95%',
            measurement_criteria: 'วัดจากข้อผิดพลาดและการแก้ไข'
          },
          {
            id: '3',
            kra: 'การทำงานเป็นทีม',
            description: 'ความสามารถในการทำงานร่วมกับผู้อื่น',
            weightage: 20,
            target: 'รีวิวจากทีมงาน',
            measurement_criteria: 'ประเมินจากเพื่อนร่วมงาน'
          },
          {
            id: '4',
            kra: 'การพัฒนาตนเอง',
            description: 'การเรียนรู้และพัฒนาทักษะใหม่',
            weightage: 10,
            target: 'อบรม 2 คอร์สต่อปี',
            measurement_criteria: 'จำนวนคอร์สและการนำไปใช้'
          }
        ],
        rating_criteria: [
          {
            id: '1',
            criteria: 'ความรับผิดชอบ',
            description: 'ความรับผิดชอบต่องานและหน้าที่',
            weightage: 25,
            max_rating: 5
          },
          {
            id: '2',
            criteria: 'การสื่อสาร',
            description: 'ทักษะการสื่อสารและการนำเสนอ',
            weightage: 25,
            max_rating: 5
          },
          {
            id: '3',
            criteria: 'ความคิดสร้างสรรค์',
            description: 'ความสามารถในการคิดและแก้ปัญหา',
            weightage: 25,
            max_rating: 5
          },
          {
            id: '4',
            criteria: 'การบริหารเวลา',
            description: 'ความสามารถในการจัดการเวลา',
            weightage: 25,
            max_rating: 5
          }
        ],
        is_active: true,
        created_by: 'admin',
        created_at: new Date('2024-01-01'),
        modified_at: new Date('2024-01-15')
      }
    ];

    // Add sample cycles
    this.cycles = [
      {
        id: '1',
        name: 'การประเมินผลงานประจำปี 2024 Q1',
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-03-31'),
        appraisal_template_id: '1',
        kra_evaluation_method: 'Manual',
        appraisees: [
          {
            id: '1',
            employee_id: '1',
            employee_name: 'สมชาย ใจดี',
            department: 'IT'
          },
          {
            id: '2',
            employee_id: '2',
            employee_name: 'สมหญิง รักษ์ดี',
            department: 'Sales'
          },
          {
            id: '3',
            employee_id: '3',
            employee_name: 'วิชัย เก่งมาก',
            department: 'Marketing'
          }
        ],
        calculate_final_score_based_on_formula: true,
        status: 'Completed',
        created_by: 'admin',
        created_at: new Date('2024-01-01'),
        modified_at: new Date('2024-03-31')
      },
      {
        id: '2',
        name: 'การประเมินผลงานประจำปี 2024 Q2',
        start_date: new Date('2024-04-01'),
        end_date: new Date('2024-06-30'),
        appraisal_template_id: '1',
        kra_evaluation_method: 'Manual',
        appraisees: [
          {
            id: '4',
            employee_id: '1',
            employee_name: 'สมชาย ใจดี',
            department: 'IT'
          },
          {
            id: '5',
            employee_id: '2',
            employee_name: 'สมหญิง รักษ์ดี',
            department: 'Sales'
          },
          {
            id: '6',
            employee_id: '4',
            employee_name: 'อำนาจ กล้าหาญ',
            department: 'HR'
          }
        ],
        calculate_final_score_based_on_formula: true,
        status: 'Active',
        created_by: 'admin',
        created_at: new Date('2024-04-01'),
        modified_at: new Date('2024-06-30')
      }
    ];

    // Add sample appraisals
    this.appraisals = [
      {
        id: '1',
        employee_id: '1',
        employee_name: 'สมชาย ใจดี',
        department: 'IT',
        appraisal_cycle_id: '1',
        appraisal_template_id: '1',
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-03-31'),
        status: 'Completed',
        rate_goals_manually: false,
        appraisal_kra: [
          {
            id: '1',
            kra: 'ความสำเร็จในงาน',
            description: 'การบรรลุเป้าหมายงานที่ได้รับมอบหมาย',
            weightage: 40,
            target: 'บรรลุเป้าหมาย 100%',
            achievement: 'บรรลุเป้าหมาย 120%',
            score: 4.5
          },
          {
            id: '2',
            kra: 'คุณภาพงาน',
            description: 'ความถูกต้องและคุณภาพของงาน',
            weightage: 30,
            target: 'ความถูกต้อง 95%',
            achievement: 'ความถูกต้อง 98%',
            score: 4.2
          },
          {
            id: '3',
            kra: 'การทำงานเป็นทีม',
            description: 'ความสามารถในการทำงานร่วมกับผู้อื่น',
            weightage: 20,
            target: 'รีวิวจากทีมงาน',
            achievement: 'ได้คะแนนดีจากทีม',
            score: 4.0
          },
          {
            id: '4',
            kra: 'การพัฒนาตนเอง',
            description: 'การเรียนรู้และพัฒนาทักษะใหม่',
            weightage: 10,
            target: 'อบรม 2 คอร์สต่อปี',
            achievement: 'อบรม 3 คอร์ส',
            score: 4.8
          }
        ],
        goals: [],
        self_ratings: [
          {
            id: '1',
            criteria: 'ความรับผิดชอบ',
            description: 'ความรับผิดชอบต่องานและหน้าที่',
            weightage: 25,
            max_rating: 5,
            rating: 4,
            comments: 'รับผิดชอบงานได้ดี'
          },
          {
            id: '2',
            criteria: 'การสื่อสาร',
            description: 'ทักษะการสื่อสารและการนำเสนอ',
            weightage: 25,
            max_rating: 5,
            rating: 4,
            comments: 'สื่อสารได้ชัดเจน'
          },
          {
            id: '3',
            criteria: 'ความคิดสร้างสรรค์',
            description: 'ความสามารถในการคิดและแก้ปัญหา',
            weightage: 25,
            max_rating: 5,
            rating: 4,
            comments: 'มีไอเดียดี'
          },
          {
            id: '4',
            criteria: 'การบริหารเวลา',
            description: 'ความสามารถในการจัดการเวลา',
            weightage: 25,
            max_rating: 5,
            rating: 4,
            comments: 'จัดการเวลาได้ดี'
          }
        ],
        total_score: 4.26,
        self_score: 4.0,
        avg_feedback_score: 4.1,
        final_score: 4.12,
        submitted_by_employee: true,
        reviewed_by_manager: true,
        created_at: new Date('2024-01-01'),
        modified_at: new Date('2024-03-31')
      },
      {
        id: '2',
        employee_id: '2',
        employee_name: 'สมหญิง รักษ์ดี',
        department: 'Sales',
        appraisal_cycle_id: '1',
        appraisal_template_id: '1',
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-03-31'),
        status: 'Completed',
        rate_goals_manually: false,
        appraisal_kra: [
          {
            id: '5',
            kra: 'ยอดขาย',
            description: 'การบรรลุเป้าหมายยอดขาย',
            weightage: 50,
            target: 'ยอดขาย 1 ล้าน',
            achievement: 'ยอดขาย 1.2 ล้าน',
            score: 4.8
          },
          {
            id: '6',
            kra: 'ความสัมพันธ์กับลูกค้า',
            description: 'การดูแลและรักษาความสัมพันธ์กับลูกค้า',
            weightage: 30,
            target: 'รักษาลูกค้า 90%',
            achievement: 'รักษาลูกค้า 95%',
            score: 4.5
          },
          {
            id: '7',
            kra: 'การพัฒนาตลาด',
            description: 'การขยายตลาดและหาลูกค้าใหม่',
            weightage: 20,
            target: 'ลูกค้าใหม่ 10 ราย',
            achievement: 'ลูกค้าใหม่ 12 ราย',
            score: 4.2
          }
        ],
        goals: [],
        self_ratings: [
          {
            id: '5',
            criteria: 'ความรับผิดชอบ',
            description: 'ความรับผิดชอบต่องานและหน้าที่',
            weightage: 25,
            max_rating: 5,
            rating: 5,
            comments: 'รับผิดชอบสูงมาก'
          },
          {
            id: '6',
            criteria: 'การสื่อสาร',
            description: 'ทักษะการสื่อสารและการนำเสนอ',
            weightage: 25,
            max_rating: 5,
            rating: 5,
            comments: 'สื่อสารเยอะมาก'
          },
          {
            id: '7',
            criteria: 'ความคิดสร้างสรรค์',
            description: 'ความสามารถในการคิดและแก้ปัญหา',
            weightage: 25,
            max_rating: 5,
            rating: 4,
            comments: 'คิดเก่งมาก'
          },
          {
            id: '8',
            criteria: 'การบริหารเวลา',
            description: 'ความสามารถในการจัดการเวลา',
            weightage: 25,
            max_rating: 5,
            rating: 4,
            comments: 'จัดการเวลาดี'
          }
        ],
        total_score: 4.56,
        self_score: 4.5,
        avg_feedback_score: 4.3,
        final_score: 4.45,
        submitted_by_employee: true,
        reviewed_by_manager: true,
        created_at: new Date('2024-01-01'),
        modified_at: new Date('2024-03-31')
      },
      {
        id: '3',
        employee_id: '3',
        employee_name: 'วิชัย เก่งมาก',
        department: 'Marketing',
        appraisal_cycle_id: '1',
        appraisal_template_id: '1',
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-03-31'),
        status: 'Completed',
        rate_goals_manually: false,
        appraisal_kra: [
          {
            id: '8',
            kra: 'แคมเปญการตลาด',
            description: 'การสร้างและดำเนินแคมเปญการตลาด',
            weightage: 40,
            target: 'แคมเปญ 5 โครงการ',
            achievement: 'แคมเปญ 6 โครงการ',
            score: 4.2
          },
          {
            id: '9',
            kra: 'การวิเคราะห์ตลาด',
            description: 'การวิเคราะห์และรายงานสถานการณ์ตลาด',
            weightage: 30,
            target: 'รายงาน 12 ฉบับ',
            achievement: 'รายงาน 13 ฉบับ',
            score: 4.1
          },
          {
            id: '10',
            kra: 'การสร้างเนื้อหา',
            description: 'การสร้างเนื้อหาการตลาด',
            weightage: 30,
            target: 'เนื้อหา 50 ชิ้น',
            achievement: 'เนื้อหา 48 ชิ้น',
            score: 3.8
          }
        ],
        goals: [],
        self_ratings: [
          {
            id: '9',
            criteria: 'ความรับผิดชอบ',
            description: 'ความรับผิดชอบต่องานและหน้าที่',
            weightage: 25,
            max_rating: 5,
            rating: 4,
            comments: 'รับผิดชอบดี'
          },
          {
            id: '10',
            criteria: 'การสื่อสาร',
            description: 'ทักษะการสื่อสารและการนำเสนอ',
            weightage: 25,
            max_rating: 5,
            rating: 4,
            comments: 'สื่อสารได้ดี'
          },
          {
            id: '11',
            criteria: 'ความคิดสร้างสรรค์',
            description: 'ความสามารถในการคิดและแก้ปัญหา',
            weightage: 25,
            max_rating: 5,
            rating: 5,
            comments: 'มีความคิดสร้างสรรค์สูง'
          },
          {
            id: '12',
            criteria: 'การบริหารเวลา',
            description: 'ความสามารถในการจัดการเวลา',
            weightage: 25,
            max_rating: 5,
            rating: 3,
            comments: 'ควรปรับปรุงการจัดการเวลา'
          }
        ],
        total_score: 4.04,
        self_score: 4.0,
        avg_feedback_score: 3.9,
        final_score: 3.98,
        submitted_by_employee: true,
        reviewed_by_manager: true,
        created_at: new Date('2024-01-01'),
        modified_at: new Date('2024-03-31')
      },
      // Q2 appraisals
      {
        id: '4',
        employee_id: '1',
        employee_name: 'สมชาย ใจดี',
        department: 'IT',
        appraisal_cycle_id: '2',
        appraisal_template_id: '1',
        start_date: new Date('2024-04-01'),
        end_date: new Date('2024-06-30'),
        status: 'Completed',
        rate_goals_manually: false,
        appraisal_kra: [
          {
            id: '11',
            kra: 'ความสำเร็จในงาน',
            description: 'การบรรลุเป้าหมายงานที่ได้รับมอบหมาย',
            weightage: 40,
            target: 'บรรลุเป้าหมาย 100%',
            achievement: 'บรรลุเป้าหมาย 130%',
            score: 4.7
          },
          {
            id: '12',
            kra: 'คุณภาพงาน',
            description: 'ความถูกต้องและคุณภาพของงาน',
            weightage: 30,
            target: 'ความถูกต้อง 95%',
            achievement: 'ความถูกต้อง 99%',
            score: 4.5
          },
          {
            id: '13',
            kra: 'การทำงานเป็นทีม',
            description: 'ความสามารถในการทำงานร่วมกับผู้อื่น',
            weightage: 20,
            target: 'รีวิวจากทีมงาน',
            achievement: 'ได้คะแนนยอดเยี่ยมจากทีม',
            score: 4.3
          },
          {
            id: '14',
            kra: 'การพัฒนาตนเอง',
            description: 'การเรียนรู้และพัฒนาทักษะใหม่',
            weightage: 10,
            target: 'อบรม 2 คอร์สต่อปี',
            achievement: 'อบรม 4 คอร์ส',
            score: 5.0
          }
        ],
        goals: [],
        self_ratings: [
          {
            id: '13',
            criteria: 'ความรับผิดชอบ',
            description: 'ความรับผิดชอบต่องานและหน้าที่',
            weightage: 25,
            max_rating: 5,
            rating: 5,
            comments: 'รับผิดชอบงานได้ยอดเยี่ยม'
          },
          {
            id: '14',
            criteria: 'การสื่อสาร',
            description: 'ทักษะการสื่อสารและการนำเสนอ',
            weightage: 25,
            max_rating: 5,
            rating: 4,
            comments: 'สื่อสารได้ดีขึ้น'
          },
          {
            id: '15',
            criteria: 'ความคิดสร้างสรรค์',
            description: 'ความสามารถในการคิดและแก้ปัญหา',
            weightage: 25,
            max_rating: 5,
            rating: 5,
            comments: 'มีไอเดียใหม่ๆ มากมาย'
          },
          {
            id: '16',
            criteria: 'การบริหารเวลา',
            description: 'ความสามารถในการจัดการเวลา',
            weightage: 25,
            max_rating: 5,
            rating: 4,
            comments: 'จัดการเวลาได้ดีขึ้น'
          }
        ],
        total_score: 4.58,
        self_score: 4.5,
        avg_feedback_score: 4.4,
        final_score: 4.49,
        submitted_by_employee: true,
        reviewed_by_manager: true,
        created_at: new Date('2024-04-01'),
        modified_at: new Date('2024-06-30')
      }
    ];
  }

  // Template methods
  getTemplates(): AppraisalTemplate[] {
    return this.templates;
  }

  getTemplate(id: string): AppraisalTemplate | undefined {
    return this.templates.find(t => t.id === id);
  }

  createTemplate(template: Omit<AppraisalTemplate, 'id' | 'created_at' | 'modified_at'>): AppraisalTemplate {
    const newTemplate: AppraisalTemplate = {
      ...template,
      id: Date.now().toString(),
      created_at: new Date(),
      modified_at: new Date()
    };
    this.templates.push(newTemplate);
    return newTemplate;
  }

  updateTemplate(id: string, updates: Partial<AppraisalTemplate>): AppraisalTemplate | null {
    const index = this.templates.findIndex(t => t.id === id);
    if (index !== -1) {
      this.templates[index] = {
        ...this.templates[index],
        ...updates,
        modified_at: new Date()
      };
      return this.templates[index];
    }
    return null;
  }

  deleteTemplate(id: string): boolean {
    const index = this.templates.findIndex(t => t.id === id);
    if (index !== -1) {
      this.templates.splice(index, 1);
      return true;
    }
    return false;
  }

  // Cycle methods
  getCycles(): AppraisalCycle[] {
    return this.cycles;
  }

  getCycle(id: string): AppraisalCycle | undefined {
    return this.cycles.find(c => c.id === id);
  }

  createCycle(cycle: Omit<AppraisalCycle, 'id' | 'created_at' | 'modified_at'>): AppraisalCycle {
    const newCycle: AppraisalCycle = {
      ...cycle,
      id: Date.now().toString(),
      created_at: new Date(),
      modified_at: new Date()
    };
    this.cycles.push(newCycle);
    return newCycle;
  }

  updateCycle(id: string, updates: Partial<AppraisalCycle>): AppraisalCycle | null {
    const index = this.cycles.findIndex(c => c.id === id);
    if (index !== -1) {
      this.cycles[index] = {
        ...this.cycles[index],
        ...updates,
        modified_at: new Date()
      };
      return this.cycles[index];
    }
    return null;
  }

  deleteCycle(id: string): boolean {
    const index = this.cycles.findIndex(c => c.id === id);
    if (index !== -1) {
      this.cycles.splice(index, 1);
      return true;
    }
    return false;
  }

  // Appraisal methods
  getAppraisals(): Appraisal[] {
    return this.appraisals;
  }

  getAppraisal(id: string): Appraisal | undefined {
    return this.appraisals.find(a => a.id === id);
  }

  getAppraisalsByCycle(cycleId: string): Appraisal[] {
    return this.appraisals.filter(a => a.appraisal_cycle_id === cycleId);
  }

  getAppraisalsByEmployee(employeeId: string): Appraisal[] {
    return this.appraisals.filter(a => a.employee_id === employeeId);
  }

  createAppraisal(appraisal: Omit<Appraisal, 'id' | 'created_at' | 'modified_at'>): Appraisal {
    const newAppraisal: Appraisal = {
      ...appraisal,
      id: Date.now().toString(),
      created_at: new Date(),
      modified_at: new Date()
    };
    this.appraisals.push(newAppraisal);
    return newAppraisal;
  }

  updateAppraisal(id: string, updates: Partial<Appraisal>): Appraisal | null {
    const index = this.appraisals.findIndex(a => a.id === id);
    if (index !== -1) {
      this.appraisals[index] = {
        ...this.appraisals[index],
        ...updates,
        modified_at: new Date()
      };
      return this.appraisals[index];
    }
    return null;
  }

  deleteAppraisal(id: string): boolean {
    const index = this.appraisals.findIndex(a => a.id === id);
    if (index !== -1) {
      this.appraisals.splice(index, 1);
      return true;
    }
    return false;
  }

  // Feedback methods
  getFeedbacks(): EmployeePerformanceFeedback[] {
    return this.feedbacks;
  }

  getFeedback(id: string): EmployeePerformanceFeedback | undefined {
    return this.feedbacks.find(f => f.id === id);
  }

  getFeedbacksByAppraisal(appraisalId: string): EmployeePerformanceFeedback[] {
    return this.feedbacks.filter(f => f.appraisal_id === appraisalId);
  }

  createFeedback(feedback: Omit<EmployeePerformanceFeedback, 'id' | 'created_at' | 'modified_at'>): EmployeePerformanceFeedback {
    const newFeedback: EmployeePerformanceFeedback = {
      ...feedback,
      id: Date.now().toString(),
      created_at: new Date(),
      modified_at: new Date()
    };
    this.feedbacks.push(newFeedback);
    return newFeedback;
  }

  updateFeedback(id: string, updates: Partial<EmployeePerformanceFeedback>): EmployeePerformanceFeedback | null {
    const index = this.feedbacks.findIndex(f => f.id === id);
    if (index !== -1) {
      this.feedbacks[index] = {
        ...this.feedbacks[index],
        ...updates,
        modified_at: new Date()
      };
      return this.feedbacks[index];
    }
    return null;
  }

  deleteFeedback(id: string): boolean {
    const index = this.feedbacks.findIndex(f => f.id === id);
    if (index !== -1) {
      this.feedbacks.splice(index, 1);
      return true;
    }
    return false;
  }

  // Employee methods
  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployee(id: string): Employee | undefined {
    return this.employees.find(e => e.id === id);
  }

  getEmployeesByDepartment(department: string): Employee[] {
    return this.employees.filter(e => e.department === department);
  }

  // Statistics
  getPerformanceStats(): PerformanceStats {
    const total = this.appraisals.length;
    const completed = this.appraisals.filter(a => a.status === 'Completed').length;
    const pending = this.appraisals.filter(a => a.status !== 'Completed' && a.status !== 'Cancelled').length;
    
    const completedAppraisals = this.appraisals.filter(a => a.status === 'Completed');
    const avgScore = completedAppraisals.length > 0 
      ? completedAppraisals.reduce((sum, a) => sum + a.final_score, 0) / completedAppraisals.length 
      : 0;

    return {
      total_appraisals: total,
      completed_appraisals: completed,
      pending_appraisals: pending,
      average_score: avgScore,
      excellent_performers: this.appraisals.filter(a => a.final_score >= 90).length,
      good_performers: this.appraisals.filter(a => a.final_score >= 80 && a.final_score < 90).length,
      average_performers: this.appraisals.filter(a => a.final_score >= 70 && a.final_score < 80).length,
      poor_performers: this.appraisals.filter(a => a.final_score < 70 && a.final_score > 0).length
    };
  }

  // Bulk operations
  createAppraisalsForCycle(cycleId: string): Appraisal[] {
    const cycle = this.getCycle(cycleId);
    if (!cycle) return [];

    const template = this.getTemplate(cycle.appraisal_template_id);
    if (!template) return [];

    const newAppraisals: Appraisal[] = [];

    cycle.appraisees.forEach(appraisee => {
      const employee = this.getEmployee(appraisee.employee_id);
      const appraisal: Appraisal = {
        id: `${Date.now()}-${appraisee.employee_id}`,
        employee_id: appraisee.employee_id,
        employee_name: appraisee.employee_name,
        department: appraisee.department,
        appraisal_cycle_id: cycleId,
        appraisal_template_id: appraisee.appraisal_template_id || cycle.appraisal_template_id,
        start_date: cycle.start_date,
        end_date: cycle.end_date,
        status: 'Draft',
        rate_goals_manually: false,
        appraisal_kra: template.goals.map(goal => ({
          id: `${goal.id}-${appraisee.employee_id}`,
          kra: goal.kra,
          description: goal.description,
          weightage: goal.weightage,
          target: goal.target,
          achievement: '',
          score: 0,
          comments: ''
        })),
        goals: [],
        self_ratings: template.rating_criteria.map(criteria => ({
          id: `${criteria.id}-${appraisee.employee_id}`,
          criteria: criteria.criteria,
          description: criteria.description,
          weightage: criteria.weightage,
          max_rating: criteria.max_rating,
          rating: 0,
          comments: ''
        })),
        total_score: 0,
        self_score: 0,
        avg_feedback_score: 0,
        final_score: 0,
        submitted_by_employee: false,
        reviewed_by_manager: false,
        created_at: new Date(),
        modified_at: new Date()
      };
      
      newAppraisals.push(appraisal);
      this.appraisals.push(appraisal);
    });

    return newAppraisals;
  }

  // Add new scoring calculation method
  calculateScoresForAppraisal(appraisalId: string) {
    const appraisal = this.getAppraisal(appraisalId);
    if (!appraisal) return null;

    const cycle = this.getCycle(appraisal.appraisal_cycle_id);
    if (!cycle) return null;

    const feedbacks = this.getFeedbacksByAppraisal(appraisalId);
    
    return calculateAllScores(appraisal, cycle, feedbacks);
  }

  // Update appraisal with calculated scores
  async updateAppraisalScores(appraisalId: string): Promise<Appraisal | null> {
    const scoreResult = this.calculateScoresForAppraisal(appraisalId);
    if (!scoreResult) return null;

    return this.updateAppraisal(appraisalId, {
      total_score: scoreResult.goalScore,
      self_score: scoreResult.selfScore,
      avg_feedback_score: scoreResult.feedbackScore,
      final_score: scoreResult.finalScore
    });
  }
}

export const performanceService = PerformanceService.getInstance();
