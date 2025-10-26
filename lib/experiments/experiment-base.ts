/**
 * A/B 테스트 기초 인프라
 *
 * 추후 A/B 테스트를 시작할 때 활성화할 수 있는 기본 틀입니다.
 * 현재는 항상 'control' 그룹을 반환하며, 실제 실험 시작 시 로직을 활성화합니다.
 */

export interface ExperimentConfig {
  id: string;
  name: string;
  description: string;
  variants: string[];
  weights?: number[]; // 변형별 트래픽 분배 비율 (기본: 균등 분배)
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface UserAssignment {
  experimentId: string;
  variant: string;
  assignedAt: number;
}

/**
 * Experiment Manager
 *
 * A/B 테스트 실험을 관리하고 사용자에게 변형을 할당합니다.
 */
export class ExperimentManager {
  private static instance: ExperimentManager;
  private experiments: Map<string, ExperimentConfig> = new Map();
  private userAssignments: Map<string, UserAssignment> = new Map();
  private readonly STORAGE_KEY = 'ga_experiments';

  private constructor() {
    this.loadAssignments();
    this.initializeExperiments();
  }

  static getInstance(): ExperimentManager {
    if (!this.instance) {
      this.instance = new ExperimentManager();
    }
    return this.instance;
  }

  /**
   * 실험 초기 설정
   * 추후 실험 시작 시 여기에 실험을 추가합니다.
   */
  private initializeExperiments() {
    // 예시 실험 (비활성화 상태)
    this.addExperiment({
      id: 'hero_headline_test',
      name: 'Hero 헤드라인 테스트',
      description: 'Hero 섹션의 헤드라인 문구 A/B 테스트',
      variants: ['control', 'variant_a', 'variant_b'],
      weights: [0.34, 0.33, 0.33], // 균등 분배
      isActive: false // ⚠️ 실험 시작 시 true로 변경
    });

    this.addExperiment({
      id: 'cta_button_test',
      name: 'CTA 버튼 문구 테스트',
      description: 'CTA 버튼 텍스트 변형 테스트',
      variants: ['control', 'variant_a'],
      weights: [0.5, 0.5],
      isActive: false // ⚠️ 실험 시작 시 true로 변경
    });

    this.addExperiment({
      id: 'pricing_display_test',
      name: '가격 표시 방식 테스트',
      description: '월 가격 vs 일 가격 표시',
      variants: ['monthly', 'daily'],
      weights: [0.5, 0.5],
      isActive: false // ⚠️ 실험 시작 시 true로 변경
    });
  }

  /**
   * 실험 추가
   */
  addExperiment(config: ExperimentConfig) {
    this.experiments.set(config.id, config);
  }

  /**
   * 사용자에게 변형 할당
   *
   * @param experimentId 실험 ID
   * @returns 할당된 변형 (현재는 항상 'control')
   */
  getVariant(experimentId: string): string {
    const experiment = this.experiments.get(experimentId);

    // 실험이 없거나 비활성화된 경우 control 반환
    if (!experiment || !experiment.isActive) {
      return 'control';
    }

    // 이미 할당된 변형이 있으면 반환
    const existing = this.userAssignments.get(experimentId);
    if (existing) {
      return existing.variant;
    }

    // 새로운 변형 할당
    const variant = this.assignVariant(experiment);
    const assignment: UserAssignment = {
      experimentId,
      variant,
      assignedAt: Date.now()
    };

    this.userAssignments.set(experimentId, assignment);
    this.saveAssignments();

    // GA4에 사용자 속성으로 전송
    this.sendToGA(experimentId, variant);

    return variant;
  }

  /**
   * 변형 할당 알고리즘 (가중치 기반)
   */
  private assignVariant(experiment: ExperimentConfig): string {
    const weights = experiment.weights ||
                    experiment.variants.map(() => 1 / experiment.variants.length);

    const random = Math.random();
    let cumulative = 0;

    for (let i = 0; i < experiment.variants.length; i++) {
      cumulative += weights[i];
      if (random < cumulative) {
        return experiment.variants[i];
      }
    }

    return experiment.variants[0]; // fallback
  }

  /**
   * GA4에 실험 그룹 전송
   */
  private sendToGA(experimentId: string, variant: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      // 사용자 속성으로 설정
      window.gtag('set', 'user_properties', {
        [`exp_${experimentId}`]: variant
      });

      // 실험 할당 이벤트 발생
      window.gtag('event', 'experiment_assigned', {
        experiment_id: experimentId,
        variant: variant,
        timestamp: Date.now()
      });

      if (process.env.NODE_ENV === 'development') {
        console.log(`🧪 Experiment Assigned: ${experimentId} = ${variant}`);
      }
    }
  }

  /**
   * localStorage에서 할당 정보 로드
   */
  private loadAssignments() {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.userAssignments = new Map(Object.entries(data));
      }
    } catch (e) {
      console.error('Failed to load experiment assignments:', e);
    }
  }

  /**
   * localStorage에 할당 정보 저장
   */
  private saveAssignments() {
    if (typeof window === 'undefined') return;

    try {
      const data = Object.fromEntries(this.userAssignments);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save experiment assignments:', e);
    }
  }

  /**
   * 실험 활성화/비활성화
   */
  setExperimentActive(experimentId: string, isActive: boolean) {
    const experiment = this.experiments.get(experimentId);
    if (experiment) {
      experiment.isActive = isActive;
      this.experiments.set(experimentId, experiment);
    }
  }

  /**
   * 모든 실험 정보 조회
   */
  getAllExperiments(): ExperimentConfig[] {
    return Array.from(this.experiments.values());
  }

  /**
   * 사용자의 모든 할당 정보 조회
   */
  getUserAssignments(): UserAssignment[] {
    return Array.from(this.userAssignments.values());
  }

  /**
   * 전환 추적 (실험별)
   */
  trackConversion(experimentId: string, value?: number) {
    const assignment = this.userAssignments.get(experimentId);
    if (!assignment) return;

    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'experiment_conversion', {
        experiment_id: experimentId,
        variant: assignment.variant,
        conversion_value: value
      });
    }
  }
}

// 싱글톤 인스턴스 export
export const experimentManager = ExperimentManager.getInstance();

// 헬퍼 함수들
export function useExperiment(experimentId: string): string {
  return experimentManager.getVariant(experimentId);
}

export function trackExperimentConversion(experimentId: string, value?: number) {
  experimentManager.trackConversion(experimentId, value);
}

export default experimentManager;