
import { 
  SystemIntegration, 
  SyncLog, 
  HRMSEmployee, 
  PayrollData, 
  TrainingRecommendation,
  TrainingRecord,
  SuccessionCandidate,
  SuccessionPlan
} from '@/types/integrations';
import { Appraisal } from '@/types/performance';

export class IntegrationService {
  private static instance: IntegrationService;
  private integrations: SystemIntegration[] = [];
  private syncLogs: SyncLog[] = [];

  private constructor() {
    this.initializeMockData();
  }

  static getInstance(): IntegrationService {
    if (!IntegrationService.instance) {
      IntegrationService.instance = new IntegrationService();
    }
    return IntegrationService.instance;
  }

  private initializeMockData() {
    this.integrations = [
      {
        id: '1',
        name: 'SAP SuccessFactors HRMS',
        type: 'hrms',
        status: 'Connected',
        apiEndpoint: 'https://api.successfactors.com/v1',
        lastSync: new Date('2024-01-15T10:30:00'),
        syncInterval: 60,
        autoSync: true,
        config: {
          dataMapping: {
            'employee_id': 'userId',
            'name': 'displayName',
            'email': 'email',
            'department': 'department',
            'position': 'jobTitle'
          },
          syncFields: ['employee_id', 'name', 'email', 'department', 'position', 'manager_id']
        }
      },
      {
        id: '2',
        name: 'ADP Payroll System',
        type: 'payroll',
        status: 'Connected',
        apiEndpoint: 'https://api.adp.com/hr/v2',
        lastSync: new Date('2024-01-14T15:45:00'),
        syncInterval: 1440, // daily
        autoSync: true,
        config: {
          dataMapping: {
            'employee_id': 'associateOID',
            'salary': 'basePayRate',
            'bonus': 'additionalPayments'
          },
          syncFields: ['employee_id', 'performance_score', 'salary_adjustment']
        }
      },
      {
        id: '3',
        name: 'Cornerstone OnDemand Learning',
        type: 'training',
        status: 'Connected',
        apiEndpoint: 'https://api.cornerstoneondemand.com/v1',
        lastSync: new Date('2024-01-15T08:00:00'),
        syncInterval: 720, // twice daily
        autoSync: true,
        config: {
          dataMapping: {
            'employee_id': 'userId',
            'course_id': 'trainingId',
            'completion_date': 'completedDate'
          },
          syncFields: ['employee_id', 'development_areas', 'recommended_courses']
        }
      },
      {
        id: '4',
        name: 'Workday Succession Planning',
        type: 'succession-planning',
        status: 'Connected',
        apiEndpoint: 'https://api.workday.com/v1',
        lastSync: new Date('2024-01-13T12:00:00'),
        syncInterval: 2880, // every 2 days
        autoSync: false,
        config: {
          dataMapping: {
            'employee_id': 'workerID',
            'position_id': 'positionID',
            'readiness_level': 'readinessRating'
          },
          syncFields: ['employee_id', 'performance_score', 'potential_rating']
        }
      }
    ];

    this.syncLogs = [
      {
        id: '1',
        integrationId: '1',
        integrationName: 'SAP SuccessFactors HRMS',
        timestamp: new Date('2024-01-15T10:30:00'),
        status: 'Success',
        recordsProcessed: 150,
        recordsSuccessful: 150,
        recordsFailed: 0,
        details: []
      },
      {
        id: '2',
        integrationId: '2',
        integrationName: 'ADP Payroll System',
        timestamp: new Date('2024-01-14T15:45:00'),
        status: 'Partial',
        recordsProcessed: 75,
        recordsSuccessful: 72,
        recordsFailed: 3,
        errorMessage: '3 records failed due to missing performance scores',
        details: []
      }
    ];
  }

  // Integration Management
  getIntegrations(): SystemIntegration[] {
    return this.integrations;
  }

  getIntegration(id: string): SystemIntegration | undefined {
    return this.integrations.find(i => i.id === id);
  }

  createIntegration(integration: Omit<SystemIntegration, 'id'>): SystemIntegration {
    const newIntegration: SystemIntegration = {
      ...integration,
      id: Date.now().toString()
    };
    this.integrations.push(newIntegration);
    return newIntegration;
  }

  updateIntegration(id: string, updates: Partial<SystemIntegration>): SystemIntegration | null {
    const index = this.integrations.findIndex(i => i.id === id);
    if (index !== -1) {
      this.integrations[index] = { ...this.integrations[index], ...updates };
      return this.integrations[index];
    }
    return null;
  }

  deleteIntegration(id: string): boolean {
    const index = this.integrations.findIndex(i => i.id === id);
    if (index !== -1) {
      this.integrations.splice(index, 1);
      return true;
    }
    return false;
  }

  // Sync Operations
  async syncIntegration(integrationId: string): Promise<SyncLog> {
    const integration = this.getIntegration(integrationId);
    if (!integration) {
      throw new Error('Integration not found');
    }

    console.log(`Starting sync for integration: ${integration.name}`);

    const syncLog: SyncLog = {
      id: Date.now().toString(),
      integrationId,
      integrationName: integration.name,
      timestamp: new Date(),
      status: 'Success',
      recordsProcessed: 0,
      recordsSuccessful: 0,
      recordsFailed: 0,
      details: []
    };

    try {
      switch (integration.type) {
        case 'hrms':
          syncLog.recordsProcessed = 50;
          syncLog.recordsSuccessful = 50;
          break;
        case 'payroll':
          syncLog.recordsProcessed = 25;
          syncLog.recordsSuccessful = 23;
          syncLog.recordsFailed = 2;
          syncLog.status = 'Partial';
          break;
        case 'training':
          syncLog.recordsProcessed = 75;
          syncLog.recordsSuccessful = 75;
          break;
        case 'succession-planning':
          syncLog.recordsProcessed = 30;
          syncLog.recordsSuccessful = 30;
          break;
      }

      // Update last sync time
      this.updateIntegration(integrationId, { lastSync: new Date() });
      
      this.syncLogs.unshift(syncLog);
      return syncLog;
    } catch (error) {
      syncLog.status = 'Failed';
      syncLog.errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.syncLogs.unshift(syncLog);
      throw error;
    }
  }

  getSyncLogs(integrationId?: string): SyncLog[] {
    if (integrationId) {
      return this.syncLogs.filter(log => log.integrationId === integrationId);
    }
    return this.syncLogs;
  }

  // HRMS Integration Methods
  async syncEmployeesFromHRMS(): Promise<HRMSEmployee[]> {
    console.log('Syncing employees from HRMS...');
    
    // Mock HRMS data
    const hrmsEmployees: HRMSEmployee[] = [
      {
        employee_id: 'EMP001',
        name: 'สมชาย ใจดี',
        email: 'somchai@company.com',
        department: 'IT',
        position: 'Senior Developer',
        manager_id: 'MGR001',
        join_date: new Date('2022-01-15'),
        status: 'Active',
        org_structure: {
          department_id: 'DEPT001',
          department_name: 'Information Technology',
          cost_center: 'CC001',
          hierarchy_level: 3,
          parent_department_id: 'DEPT000'
        }
      }
    ];

    return hrmsEmployees;
  }

  async sendPerformanceDataToHRMS(appraisals: Appraisal[]): Promise<void> {
    console.log(`Sending ${appraisals.length} performance records to HRMS...`);
    
    // Mock API call to HRMS
    const hrmsData = appraisals.map(appraisal => ({
      employee_id: appraisal.employee_id,
      performance_period: `${appraisal.start_date.getFullYear()}-Q${Math.ceil((appraisal.start_date.getMonth() + 1) / 3)}`,
      overall_score: appraisal.final_score,
      status: appraisal.status,
      completion_date: appraisal.reviewed_date
    }));

    console.log('Performance data sent to HRMS:', hrmsData);
  }

  // Payroll Integration Methods
  async sendPayrollRecommendations(appraisals: Appraisal[]): Promise<PayrollData[]> {
    console.log('Calculating payroll recommendations...');
    
    const payrollData: PayrollData[] = appraisals
      .filter(appraisal => appraisal.status === 'Completed')
      .map(appraisal => {
        const baseIncrease = appraisal.final_score >= 4.5 ? 0.08 : 
                           appraisal.final_score >= 4.0 ? 0.05 : 
                           appraisal.final_score >= 3.5 ? 0.03 : 0;

        return {
          employee_id: appraisal.employee_id,
          performance_score: appraisal.final_score,
          salary_adjustment: {
            current_salary: 50000, // Mock current salary
            recommended_increase: baseIncrease,
            effective_date: new Date()
          },
          bonus_calculation: {
            base_bonus: 10000,
            performance_multiplier: appraisal.final_score / 5,
            total_bonus: 10000 * (appraisal.final_score / 5)
          }
        };
      });

    return payrollData;
  }

  // Training Integration Methods
  async generateTrainingRecommendations(appraisals: Appraisal[]): Promise<TrainingRecommendation[]> {
    console.log('Generating training recommendations...');
    
    const recommendations: TrainingRecommendation[] = appraisals
      .filter(appraisal => appraisal.final_score < 4.0)
      .map(appraisal => {
        const developmentAreas = appraisal.appraisal_kra
          .filter(kra => kra.score < 4.0)
          .map(kra => kra.kra);

        return {
          employee_id: appraisal.employee_id,
          development_areas: developmentAreas,
          recommended_courses: [
            {
              course_id: 'TRN001',
              course_name: 'Leadership Development Program',
              provider: 'Corporate University',
              duration_hours: 40,
              cost: 15000,
              skills_covered: ['Leadership', 'Communication', 'Team Management']
            }
          ],
          priority: appraisal.final_score < 3.0 ? 'High' : 'Medium'
        };
      });

    return recommendations;
  }

  async getTrainingRecords(employeeId: string): Promise<TrainingRecord[]> {
    // Mock training records
    return [
      {
        employee_id: employeeId,
        course_id: 'TRN001',
        completion_date: new Date('2023-12-15'),
        score: 85,
        certification: 'Leadership Certificate',
        feedback: 'Excellent participation and improvement'
      }
    ];
  }

  // Succession Planning Integration Methods
  async generateSuccessionCandidates(appraisals: Appraisal[]): Promise<SuccessionCandidate[]> {
    console.log('Identifying succession planning candidates...');
    
    const candidates: SuccessionCandidate[] = appraisals
      .filter(appraisal => appraisal.final_score >= 4.0)
      .map(appraisal => ({
        employee_id: appraisal.employee_id,
        employee_name: appraisal.employee_name,
        current_position: 'Current Position', // Would come from HRMS
        target_position: 'Senior Position', // Would be determined by business rules
        readiness_level: appraisal.final_score >= 4.5 ? 'Ready Now' : 'Ready in 1-2 years',
        performance_score: appraisal.final_score,
        potential_rating: appraisal.final_score >= 4.5 ? 'High' : 'Medium',
        development_plan: ['Advanced Leadership Training', 'Strategic Planning Workshop'],
        risk_of_loss: 'Medium'
      }));

    return candidates;
  }

  async getSuccessionPlans(): Promise<SuccessionPlan[]> {
    // Mock succession plans
    return [
      {
        position_id: 'POS001',
        position_name: 'IT Manager',
        department: 'Information Technology',
        critical_role: true,
        candidates: [],
        development_timeline: '18-24 months',
        backup_plans: ['External recruitment', 'Interim management']
      }
    ];
  }

  // Test Connection
  async testConnection(integrationId: string): Promise<boolean> {
    const integration = this.getIntegration(integrationId);
    if (!integration) {
      throw new Error('Integration not found');
    }

    console.log(`Testing connection for: ${integration.name}`);
    
    // Mock connection test
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = Math.random() > 0.1; // 90% success rate
    
    if (success) {
      this.updateIntegration(integrationId, { status: 'Connected' });
    } else {
      this.updateIntegration(integrationId, { status: 'Error' });
    }
    
    return success;
  }
}

export const integrationService = IntegrationService.getInstance();
