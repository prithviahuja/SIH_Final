export interface GroundwaterData {
  state: string;
  district: string;
  assessmentUnitName: string;
  categorization: string;
  totalGeographicalArea: number;
  totalAnnualGroundWaterRecharge: number;
  annualExtractableGroundWaterResource: number;
  totalExtraction: number;
  stageOfGroundWaterExtraction: number;
}

export interface SelectedRegion {
  name: string;
  isDistrict: boolean;
  status: string;
  assessmentUnitName?: string;
  categorization?: string;
  totalGeographicalArea?: number;
  totalAnnualGroundWaterRecharge?: number;
  annualExtractableGroundWaterResource?: number;
  totalExtraction?: number;
  stageOfGroundWaterExtraction?: number;
  totalBlocks?: number;
  safe?: number;
  semiCritical?: number;
  critical?: number;
  overExploited?: number;
}
