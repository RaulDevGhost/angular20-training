import { Injectable, signal, computed } from '@angular/core';

// Types (these could be in a separate types file)
export interface Project {
  id?: string;
  title: string;
  description: string;
  client: 'Siemens' | 'Bayern' | '3M' | 'Bosch';
}

export interface User {
  id: string;
  name: string;
  title: string;
  avatar: string;
  description: string;
  technologies: string[];
  projects: Project[];
  current_project: Project;
  specialist:
    | 'frontend'
    | 'backend'
    | 'devops'
    | 'fullstack'
    | 'mobile'
    | 'qa'
    | 'architect';
  level: 'junior' | 'mid' | 'senior' | 'lead' | 'principal';
  years_in_company: number;
  client_satisfaction: number;
  job_happiness: number;
  languages: ('english' | 'german')[];
}

export interface ProjectFormData {
  id: string;
  title: string;
  description: string;
  client: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: { [key: string]: string };
}

@Injectable({
  providedIn: 'root',
})
export class UserFormService {
  // ====================================================================
  // 1. FORM DATA STATE MANAGEMENT
  // ====================================================================

  private _formData = signal<Partial<User>>({
    id: '',
    name: '',
    title: '',
    avatar: '',
    description: '',
    technologies: [],
    projects: [],
    current_project: {} as Project,
    specialist: 'frontend',
    level: 'junior',
    years_in_company: 0,
    client_satisfaction: 0,
    job_happiness: 0,
    languages: [],
  });

  private _projectInputs = signal<ProjectFormData[]>([]);
  private _currentProject = signal<ProjectFormData>({
    id: '',
    title: '',
    description: '',
    client: '',
  });

  // Public readonly signals
  readonly formData = computed(() => this._formData());
  readonly projectInputs = computed(() => this._projectInputs());
  readonly currentProject = computed(() => this._currentProject());
  readonly actualPreviousProjects = computed(
    () => this.formData().projects || []
  );

  // ====================================================================
  // 2. FORM VALIDATION LOGIC
  // ====================================================================

  readonly formValidation = computed((): FormValidation => {
    const data = this.formData();
    const errors: { [key: string]: string } = {};

    // Basic validation rules
    if (!data.name?.trim()) {
      errors['name'] = 'Name is required';
    }

    if (!data.title?.trim()) {
      errors['title'] = 'Title is required';
    }

    if (!data.description?.trim()) {
      errors['description'] = 'Description is required';
    }

    if (!data.specialist) {
      errors['specialist'] = 'Specialist role is required';
    }

    if (!data.level) {
      errors['level'] = 'Level is required';
    }

    if (data.years_in_company === undefined || data.years_in_company < 0) {
      errors['years_in_company'] = 'Years in company must be a positive number';
    }

    if (
      data.client_satisfaction === undefined ||
      data.client_satisfaction < 0 ||
      data.client_satisfaction > 100
    ) {
      errors['client_satisfaction'] =
        'Client satisfaction must be between 0 and 100';
    }

    if (
      data.job_happiness === undefined ||
      data.job_happiness < 0 ||
      data.job_happiness > 100
    ) {
      errors['job_happiness'] = 'Job happiness must be between 0 and 100';
    }

    if (!data.languages?.length) {
      errors['languages'] = 'At least one language is required';
    }

    // Validate current project
    const currentProj = this.currentProject();
    if (currentProj.title || currentProj.description || currentProj.client) {
      if (!currentProj.title?.trim()) {
        errors['current_project_title'] = 'Current project title is required';
      }
      if (!currentProj.description?.trim()) {
        errors['current_project_description'] =
          'Current project description is required';
      }
      if (!currentProj.client?.trim()) {
        errors['current_project_client'] = 'Current project client is required';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  });

  // ====================================================================
  // 3. BUSINESS LOGIC & DATA TRANSFORMATION
  // ====================================================================

  // Type guard functions
  isValidSpecialist(value: string): value is User['specialist'] {
    return [
      'frontend',
      'backend',
      'devops',
      'fullstack',
      'mobile',
      'qa',
      'architect',
    ].includes(value);
  }

  isValidLevel(value: string): value is User['level'] {
    return ['junior', 'mid', 'senior', 'lead', 'principal'].includes(value);
  }

  isValidLanguage(value: string): value is 'english' | 'german' {
    return ['english', 'german'].includes(value);
  }

  // Data transformation utilities
  transformProjectInputsToProjects(inputs: ProjectFormData[]): Project[] {
    return inputs.map((input) => ({
      title: input.title,
      description: input.description,
      client: input.client as Project['client'],
    }));
  }

  clampNumericValue(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  // ====================================================================
  // 4. FORM FIELD UPDATE METHODS
  // ====================================================================

  updateField<K extends keyof User>(field: K, value: User[K]): void {
    this._formData.update((current) => ({
      ...current,
      [field]: value,
    }));
  }

  updateSpecialist(value: string | string[]): void {
    const specialist = Array.isArray(value) ? value[0] : value;
    if (this.isValidSpecialist(specialist)) {
      this.updateField('specialist', specialist);
    }
  }

  updateLevel(value: string | string[]): void {
    const level = Array.isArray(value) ? value[0] : value;
    if (this.isValidLevel(level)) {
      this.updateField('level', level);
    }
  }

  updateLanguages(value: string | string[]): void {
    const languages = Array.isArray(value) ? value : [value];
    const validLanguages = languages.filter(this.isValidLanguage) as (
      | 'english'
      | 'german'
    )[];
    this.updateField('languages', validLanguages);
  }

  updateNumericField(
    field: 'years_in_company' | 'client_satisfaction' | 'job_happiness',
    value: string
  ): void {
    const numericValue = parseFloat(value) || 0;

    if (field === 'client_satisfaction' || field === 'job_happiness') {
      const clampedValue = this.clampNumericValue(numericValue, 0, 100);
      this.updateField(field, clampedValue);
    } else {
      const positiveValue = Math.max(0, numericValue);
      this.updateField(field, positiveValue);
    }
  }

  // ====================================================================
  // 5. CURRENT PROJECT MANAGEMENT
  // ====================================================================

  updateCurrentProject<K extends keyof ProjectFormData>(
    field: K,
    value: ProjectFormData[K]
  ): void {
    this._currentProject.update((current) => ({
      ...current,
      [field]: value,
    }));
  }

  updateCurrentProjectClient(value: string | string[]): void {
    const client = Array.isArray(value) ? value[0] : value;
    this.updateCurrentProject('client', client);
  }

  // ====================================================================
  // 6. TECHNOLOGY MANAGEMENT
  // ====================================================================

  addTechnology(technology: string): boolean {
    const tech = technology.trim();
    if (!tech) return false;

    const currentTech = this.formData().technologies || [];
    if (currentTech.includes(tech)) {
      return false; // Already exists
    }

    this._formData.update((current) => ({
      ...current,
      technologies: [...(current.technologies || []), tech],
    }));

    return true;
  }

  removeTechnology(index: number): void {
    this._formData.update((current) => ({
      ...current,
      technologies: current.technologies?.filter((_, i) => i !== index) || [],
    }));
  }

  // ====================================================================
  // 7. PROJECT INPUTS MANAGEMENT
  // ====================================================================

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  addProject(): string {
    const project: ProjectFormData = {
      id: this.generateId(),
      title: '',
      description: '',
      client: '',
    };

    this._projectInputs.update((current) => [...current, project]);
    return project.id;
  }

  removeProject(projectId: string): void {
    this._projectInputs.update((current) =>
      current.filter((project) => project.id !== projectId)
    );
  }

  updateProject(
    projectId: string,
    field: keyof ProjectFormData,
    value: string
  ): void {
    this._projectInputs.update((current) =>
      current.map((project) =>
        project.id === projectId ? { ...project, [field]: value } : project
      )
    );
  }

  updateProjectClient(projectId: string, value: string | string[]): void {
    const client = Array.isArray(value) ? value[0] : value;
    this.updateProject(projectId, 'client', client);
  }

  // ====================================================================
  // 8. FORM LIFECYCLE METHODS
  // ====================================================================

  prepareFormDataForSubmission(): User {
    const formData = this.formData();
    const currentProject = this.currentProject();

    // Sync project inputs to actual projects data
    const actualProjects = this.transformProjectInputsToProjects(
      this.projectInputs()
    );

    const convertedCurrentProject: Project = {
      title: currentProject.title,
      description: currentProject.description,
      client: currentProject.client as Project['client'],
    };

    return {
      ...formData,
      projects: actualProjects,
      current_project: convertedCurrentProject,
    } as User;
  }

  resetForm(): void {
    this._formData.set({
      id: '',
      name: '',
      title: '',
      avatar: '',
      description: '',
      technologies: [],
      projects: [],
      current_project: {} as Project,
      specialist: 'frontend',
      level: 'junior',
      years_in_company: 0,
      client_satisfaction: 0,
      job_happiness: 0,
      languages: [],
    });

    this._projectInputs.set([]);
    this._currentProject.set({
      id: '',
      title: '',
      description: '',
      client: '',
    });
  }

  loadUserData(user: User): void {
    // Load main form data
    this._formData.set(user);

    // Load current project
    if (user.current_project) {
      this._currentProject.set({
        id: this.generateId(),
        title: user.current_project.title,
        description: user.current_project.description,
        client: user.current_project.client,
      });
    }

    // Load projects as form inputs
    if (user.projects) {
      const projectInputs: ProjectFormData[] = user.projects.map((project) => ({
        id: this.generateId(),
        title: project.title,
        description: project.description,
        client: project.client,
      }));
      this._projectInputs.set(projectInputs);
    }
  }

  getFieldError(field: string): string {
    return this.formValidation().errors[field] || '';
  }
}
